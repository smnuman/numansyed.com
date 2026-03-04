# How I Decontaminated a Poisoned Git-Crypt Repo and Rebuilt My Entire Dotfiles Hierarchy

*Originally published on [numansyed.com](https://numansyed.com/blog/git-crypt-decontamination-submodule-restructure)*

---

> **TL;DR:** My dotfiles repo had git-crypt encrypting its own infrastructure files (.gitattributes, .gitmodules, .gitignore), a phantom submodule pointing at itself, and corrupted .gitignore files across the tree. Every `grepo` command re-poisoned the repo. I fixed it in three phases: encryption decontamination, submodule restructure, and branch/remote cleanup. Here are the war stories and the lessons.

---

![Hero banner — from broken encryption to clean hierarchy](https://numansyed.com/images/blog/git-crypt-fix/hero-banner.svg)

## The Discovery

It started with a simple `grepo` command failing. I was trying to initialize a new repository from my dotfiles setup, and git-crypt was throwing errors that made no sense. Encryption problems. Files that should be plaintext were being run through encryption filters. `git-crypt status` was screaming warnings on every single git infrastructure file.

Then I looked at the submodule status. My `zsh/` directory was registered as a submodule in root `~/.config`, pointing to `smnuman/config-zsh.git`. Sounds reasonable, right? Except the *root repo itself* was also `smnuman/config-zsh.git`. A submodule pointing at its own parent. A snake eating its own tail.

And when I dug into the `brew/` directory? No remote. No commits. An empty git repo with a `.gitignore` that blocked everything. Three submodules sitting in detached HEAD states. The whole hierarchy was a mess.

For context: my dotfiles live in `~/.config` and are managed as a tree of git repositories connected via submodules. I use a set of custom Zsh utilities (`grepo`, `gsub`, `gsync`) to create, register, and synchronize them. The system is supposed to make dotfiles management effortless. It had done the opposite.

## Root Cause Analysis: The Self-Reinforcing Poison Loop

If you're not familiar with `git-crypt`: it's a tool that transparently encrypts files in a git repository. You specify which files to encrypt via patterns in `.gitattributes` (using `filter=git-crypt diff=git-crypt`), and git-crypt handles the rest. The key insight is that `.gitattributes` tells git how to process files during staging and checkout.

Now, here's what happened. Someone (possibly me, in a hurry) added these patterns to the `.gitcrypt` manifest:

```
.git*
.gitignore
.gitconfig
.gitattributes
.gitcrypt
.gitmodules
.gsubignore
```

The intent was probably to "protect everything." The result was catastrophic. The `gencrypt_setup` function reads `.gitcrypt` and writes corresponding rules to `.gitattributes`. So now `.gitattributes` contained:

```
.git* filter=git-crypt diff=git-crypt
.gitignore filter=git-crypt diff=git-crypt
.gitattributes filter=git-crypt diff=git-crypt
.gitmodules filter=git-crypt diff=git-crypt
```

Stop and think about that for a second. `.gitattributes` is the file that *tells git how to handle files*. We just told git to encrypt `.gitattributes` itself. Git needs to read `.gitattributes` to know what to encrypt, but it can't read it because it's encrypted. A perfect circular dependency.

![The self-reinforcing poison loop](https://numansyed.com/images/blog/git-crypt-fix/poison-loop.svg)

But here's the truly insidious part: **it was self-reinforcing**. My `grepo` utility calls `gencrypt_setup` unconditionally at line 731. Every time I ran `grepo` to create a new repository, it would regenerate `.gitattributes` from the poisoned `.gitcrypt` manifest, re-injecting the poison. Even if I manually fixed `.gitattributes`, the next `grepo` would overwrite it.

### The Phantom Submodule

The second problem was a naming collision. My utility function `_grepo_name` generates repository names using a `parent-child` format. For `~/.config`, the parent directory is the username folder and the child is `config`, so it generates `config-zsh` (since the repo was originally zsh-centric). But for `~/.config/zsh`, the parent is `config` and the child is `zsh`, which also generates... `config-zsh`.

Both the root and `zsh/` mapped to the same GitHub repo name. When `gsub` was run to register `zsh/` as a submodule, it pointed at the root's own remote URL. Git dutifully recorded this in `.gitmodules`. The result: a submodule entry that refers to itself. `git submodule status` showed `-07bf731...` with the minus prefix meaning "not initialized" — because git can't initialize a submodule that points at its own repository.

![The phantom submodule — a circular self-reference](https://numansyed.com/images/blog/git-crypt-fix/submodule-phantom.svg)

### The .gitignore Corruption

A third problem was lurking in the `_gisolate` function. This helper is meant to prevent parent-child git contamination by writing a `.gitignore` that blocks everything:

```
*
!.gitignore
```

This is fine for a freshly created repo. But when run on a repo that *already has* a proper `.gitignore` with carefully curated rules? It overwrites the whole thing. My `brew/` and `zsh/` directories both had this corruption.

## Phase A: Encryption Decontamination

The fix had to be surgical. I couldn't just blow away `.gitattributes` because there were legitimate encryption rules that needed to stay (my `.gitconfig` has credentials, `nomad/*` has sensitive project data).

First, I cleaned the root `.gitcrypt` manifest, removing all 6 poisoned patterns:

```
# Before (poisoned):
.git*
.gitignore
.gitconfig
.gitattributes
.gitcrypt
.gitmodules
.gsubignore
nomad/*

# After (clean):
.gitconfig
nomad/*
```

Then I cleaned `.gitattributes`, removing the 7 corresponding encryption rules while keeping the legitimate ones. Same operation on `zsh/.gitattributes` — removed the `.git*` patterns, kept `docs/*`, `git_users.zsh`, and `secrets.key`.

Finally, I ran `git-crypt status -f` to force-fix the encryption state. This re-staged `.gitconfig` through the encryption filter. There was one gotcha: `git-crypt status -f` internally runs `git add` without the `-f` flag, so it silently skipped gitignored files like `nomad/`. I had to manually `git add -f nomad/` to fix those.

Result: zero warnings. All infrastructure files plaintext. All sensitive files properly encrypted.

![Tangled cables — the state of the repo before the fix](https://numansyed.com/images/blog/git-crypt-fix/hero-tangled.jpg)

## Phase B: Submodule Restructure

With encryption cleaned up, I needed to untangle the phantom submodule. This required careful ordering — git is finicky about submodule operations.

```bash
# 1. Remove phantom entry from .gitmodules
#    (edit file to remove [submodule "zsh"] section)

# 2. Clean git config
git config --remove-section submodule.zsh

# 3. Remove cached modules directory
rm -rf .git/modules/zsh

# 4. Stage .gitmodules first, THEN remove index entry
git add .gitmodules
git rm --cached zsh
```

That last step is important: `git rm --cached zsh` refuses to run unless `.gitmodules` is already staged. Order matters.

Next, I renamed the root remote from `config-zsh` to `dotconfig`, freeing the `config-zsh` name for `zsh/` to use properly:

```bash
git remote set-url origin git@github.com:smnuman/dotconfig.git
```

Then I initialized `zsh/` as its own independent git repository:

```bash
cd ~/.config/zsh
git init
git branch -M main
git remote add origin git@github.com:smnuman/config-zsh.git
git fetch origin
git reset --hard origin/main
```

The `reset --hard origin/main` restored the proper `.gitignore` (which had been corrupted by `_gisolate`), the correct `.gitmodules`, and all tracked files from the remote history.

After setting up git-crypt and initializing sub-submodules (`git-utils` and `prompt`), I registered `zsh/` as a proper submodule in root and pushed everything. This required temporarily disabling GitHub branch protection on `dotconfig` since it enforces PRs even for admins:

```bash
# Disable protection
gh api -X DELETE repos/smnuman/dotconfig/branches/main/protection

# Push
git push -u origin main --force

# Re-enable protection
gh api -X PUT repos/smnuman/dotconfig/branches/main/protection \
  --input <(echo '{"required_pull_request_reviews":{"required_approving_review_count":1},"enforce_admins":true,"required_status_checks":null,"restrictions":null}')
```

## Phase C: Branch and Remote Cleanup

With the structure fixed, I still had three submodules in bad states.

**zsh/git-utils** was in detached HEAD at commit `038ed81`, but had significant uncommitted local work — a new `GIT_UTILS_DEBUG` toggle, a `git-toggle-remote` function for switching between GitHub and GitLab, and a `git-aliases` pretty-printer. The `main` branch was at `159bb1c` (ahead with a .gitignore update). Fix: stash, checkout main, pop stash, commit, push.

**zsh/prompt** was detached at `cfe95ac`. The `main` branch was significantly ahead at `6f4a2fe` with a cumulative update that subsumed all the orphaned commits. Fix: just `git checkout main`.

**brew/** was the worst — a git repo with no remote, no commits, and a corrupted `.gitignore`. But it had plenty of local content (an up-to-date Brewfile, utilities, README) and the remote `config-brew` existed on GitHub with 21 commits of history. Fix: add remote, fetch, `git reset origin/main` to graft onto remote history, fix the `.gitignore` corruption, commit the updated content, push.

After fixing all three, I propagated submodule pointers bottom-up: `zsh/` committed its updated `git-utils` and `prompt` pointers, then root committed its updated `brew` and `zsh` pointers. Each push to `dotconfig` required the branch-protection dance.

## The Final State

```
~/.config/                    -> smnuman/dotconfig.git
  brew/                       -> smnuman/config-brew.git       [submodule]
  zsh/                        -> smnuman/config-zsh.git        [submodule]
    git-utils/                -> smnuman/zsh-git-utils.git     [submodule]
    prompt/                   -> smnuman/zsh-prompt.git        [submodule]
```

All 5 repositories on `main`, tracking `origin/main`, fully synced. Zero detached HEADs. Zero missing remotes. Zero uncommitted changes.

![Final repository hierarchy — all 5 repos connected and synced](https://numansyed.com/images/blog/git-crypt-fix/repo-hierarchy.svg)

![Before and after comparison](https://numansyed.com/images/blog/git-crypt-fix/before-after.svg)

![Clean infrastructure — the restored state](https://numansyed.com/images/blog/git-crypt-fix/hero-server-clean.jpg)

## Lessons Learned

Seven hard-won takeaways from a long day of git archaeology:

1. **Never encrypt git infrastructure files.** Files like `.gitattributes`, `.gitmodules`, and `.gitignore` must be plaintext. Encrypting `.gitattributes` (which controls encryption rules) creates a circular dependency. Encrypting `.gitmodules` means git can't discover submodules. Just don't do it.

2. **Auto-generated repo names can collide.** If your naming convention is `parent-child`, make sure a parent and its child can't resolve to the same name. In my case, both `~/.config` and `~/.config/zsh` generated `config-zsh`. Validate uniqueness before pushing.

3. **Guard your .gitignore from helper functions.** Any utility that writes a `.gitignore` (like my `_gisolate`) should check whether one already exists first. Overwriting a curated ignore file with `*` / `!.gitignore` silently breaks the entire repo's file tracking.

4. **Submodule update always detaches HEAD.** This is by design — `git submodule update` checks out the exact commit recorded in the parent, not a branch. Always follow it with `git checkout main` in each submodule if you need to be on a branch.

5. **Pre-commit hooks produce false positives on .gitattributes.** If your secret-scanning hook greps for patterns like `password`, `secret`, or `token`, it will flag `.gitattributes` because those words appear in encryption pattern names (e.g., `**/*password* filter=git-crypt`). Exclude `.gitattributes` from secret scanning.

6. **Know how to bypass branch protection in emergencies.** GitHub's `enforce_admins: true` blocks even repo owners from direct pushes. For emergency structural fixes: `gh api -X DELETE` to disable, push, `gh api -X PUT` to re-enable. Script this if you value your sanity.

7. **git-crypt status -f doesn't handle gitignored files.** It runs `git add` without `-f`, so gitignored-but-tracked files get silently skipped. Always check for these manually and use `git add -f`.

---

The whole operation took most of a day. The repo hierarchy is now clean, every submodule is properly registered and tracked, encryption only touches genuinely sensitive files, and the custom git utilities work without re-poisoning anything. Sometimes you have to tear down the scaffolding to find out the foundation was cracked.

---

*This article was originally published on [numansyed.com](https://numansyed.com/blog/git-crypt-decontamination-submodule-restructure). Cross-posted to Medium with canonical URL pointing to the original. Published under [Medium's Terms of Service](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f) — the author retains all rights to this content per Medium's content licensing: "You own the rights to the content you create and post on Medium." ([Medium ToS, Section 2](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f)). Images: Stock photos from [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com) (free for commercial use). Diagrams by the author.*
