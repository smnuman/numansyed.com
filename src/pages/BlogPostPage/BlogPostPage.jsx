import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './BlogPostPage.module.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

// Blog post data (should ideally be fetched or imported from a central place)
const blogPosts = {
  'git-crypt-decontamination-submodule-restructure': {
    title: 'How I Decontaminated a Poisoned Git-Crypt Repo and Rebuilt My Entire Dotfiles Hierarchy',
    date: 'February 21, 2026',
    author: 'Numan Syed',
    content: `
      <blockquote>
        <strong>TL;DR:</strong> My dotfiles repo had git-crypt encrypting its own infrastructure files (.gitattributes, .gitmodules, .gitignore), a phantom submodule pointing at itself, and corrupted .gitignore files across the tree. Every <code>grepo</code> command re-poisoned the repo. I fixed it in three phases: encryption decontamination, submodule restructure, and branch/remote cleanup. Here are the war stories and the lessons.
      </blockquote>

      <h2>The Discovery</h2>

      <p>It started with a simple <code>grepo</code> command failing. I was trying to initialize a new repository from my dotfiles setup, and git-crypt was throwing errors that made no sense. Encryption problems. Files that should be plaintext were being run through encryption filters. <code>git-crypt status</code> was screaming warnings on every single git infrastructure file.</p>

      <p>Then I looked at the submodule status. My <code>zsh/</code> directory was registered as a submodule in root <code>~/.config</code>, pointing to <code>smnuman/config-zsh.git</code>. Sounds reasonable, right? Except the <em>root repo itself</em> was also <code>smnuman/config-zsh.git</code>. A submodule pointing at its own parent. A snake eating its own tail.</p>

      <p>And when I dug into the <code>brew/</code> directory? No remote. No commits. An empty git repo with a <code>.gitignore</code> that blocked everything. Three submodules sitting in detached HEAD states. The whole hierarchy was a mess.</p>

      <p>For context: my dotfiles live in <code>~/.config</code> and are managed as a tree of git repositories connected via submodules. I use a set of custom Zsh utilities (<code>grepo</code>, <code>gsub</code>, <code>gsync</code>) to create, register, and synchronize them. The system is supposed to make dotfiles management effortless. It had done the opposite.</p>

      <h2>Root Cause Analysis: The Self-Reinforcing Poison Loop</h2>

      <p>If you are not familiar with <code>git-crypt</code>: it is a tool that transparently encrypts files in a git repository. You specify which files to encrypt via patterns in <code>.gitattributes</code> (using <code>filter=git-crypt diff=git-crypt</code>), and git-crypt handles the rest. The key insight is that <code>.gitattributes</code> tells git how to process files during staging and checkout.</p>

      <p>Now, here is what happened. Someone (possibly me, in a hurry) added these patterns to the <code>.gitcrypt</code> manifest:</p>

      <pre><code>.git*
.gitignore
.gitconfig
.gitattributes
.gitcrypt
.gitmodules
.gsubignore</code></pre>

      <p>The intent was probably to "protect everything." The result was catastrophic. The <code>gencrypt_setup</code> function reads <code>.gitcrypt</code> and writes corresponding rules to <code>.gitattributes</code>. So now <code>.gitattributes</code> contained:</p>

      <pre><code>.git* filter=git-crypt diff=git-crypt
.gitignore filter=git-crypt diff=git-crypt
.gitattributes filter=git-crypt diff=git-crypt
.gitmodules filter=git-crypt diff=git-crypt</code></pre>

      <p>Stop and think about that for a second. <code>.gitattributes</code> is the file that <em>tells git how to handle files</em>. We just told git to encrypt <code>.gitattributes</code> itself. Git needs to read <code>.gitattributes</code> to know what to encrypt, but it cannot read it because it is encrypted. A perfect circular dependency.</p>

      <p>But here is the truly insidious part: <strong>it was self-reinforcing</strong>. My <code>grepo</code> utility calls <code>gencrypt_setup</code> unconditionally at line 731. Every time I ran <code>grepo</code> to create a new repository, it would regenerate <code>.gitattributes</code> from the poisoned <code>.gitcrypt</code> manifest, re-injecting the poison. Even if I manually fixed <code>.gitattributes</code>, the next <code>grepo</code> would overwrite it.</p>

      <h3>The Phantom Submodule</h3>

      <p>The second problem was a naming collision. My utility function <code>_grepo_name</code> generates repository names using a <code>parent-child</code> format. For <code>~/.config</code>, the parent directory is the username folder and the child is <code>config</code>, so it generates <code>config-zsh</code> (since the repo was originally zsh-centric). But for <code>~/.config/zsh</code>, the parent is <code>config</code> and the child is <code>zsh</code>, which also generates... <code>config-zsh</code>.</p>

      <p>Both the root and <code>zsh/</code> mapped to the same GitHub repo name. When <code>gsub</code> was run to register <code>zsh/</code> as a submodule, it pointed at the root's own remote URL. Git dutifully recorded this in <code>.gitmodules</code>. The result: a submodule entry that refers to itself. <code>git submodule status</code> showed <code>-07bf731...</code> with the minus prefix meaning "not initialized" -- because git cannot initialize a submodule that points at its own repository.</p>

      <h3>The .gitignore Corruption</h3>

      <p>A third problem was lurking in the <code>_gisolate</code> function. This helper is meant to prevent parent-child git contamination by writing a <code>.gitignore</code> that blocks everything:</p>

      <pre><code>*
!.gitignore</code></pre>

      <p>This is fine for a freshly created repo. But when run on a repo that <em>already has</em> a proper <code>.gitignore</code> with carefully curated rules? It overwrites the whole thing. My <code>brew/</code> and <code>zsh/</code> directories both had this corruption.</p>

      <h2>Phase A: Encryption Decontamination</h2>

      <p>The fix had to be surgical. I could not just blow away <code>.gitattributes</code> because there were legitimate encryption rules that needed to stay (my <code>.gitconfig</code> has credentials, <code>nomad/*</code> has sensitive project data).</p>

      <p>First, I cleaned the root <code>.gitcrypt</code> manifest, removing all 6 poisoned patterns:</p>

      <pre><code># Before (poisoned):
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
nomad/*</code></pre>

      <p>Then I cleaned <code>.gitattributes</code>, removing the 7 corresponding encryption rules while keeping the legitimate ones. Same operation on <code>zsh/.gitattributes</code> -- removed the <code>.git*</code> patterns, kept <code>docs/*</code>, <code>git_users.zsh</code>, and <code>secrets.key</code>.</p>

      <p>Finally, I ran <code>git-crypt status -f</code> to force-fix the encryption state. This re-staged <code>.gitconfig</code> through the encryption filter. There was one gotcha: <code>git-crypt status -f</code> internally runs <code>git add</code> without the <code>-f</code> flag, so it silently skipped gitignored files like <code>nomad/</code>. I had to manually <code>git add -f nomad/</code> to fix those.</p>

      <p>Result: zero warnings. All infrastructure files plaintext. All sensitive files properly encrypted.</p>

      <h2>Phase B: Submodule Restructure</h2>

      <p>With encryption cleaned up, I needed to untangle the phantom submodule. This required careful ordering -- git is finicky about submodule operations.</p>

      <pre><code># 1. Remove phantom entry from .gitmodules
#    (edit file to remove [submodule "zsh"] section)

# 2. Clean git config
git config --remove-section submodule.zsh

# 3. Remove cached modules directory
rm -rf .git/modules/zsh

# 4. Stage .gitmodules first, THEN remove index entry
git add .gitmodules
git rm --cached zsh</code></pre>

      <p>That last step is important: <code>git rm --cached zsh</code> refuses to run unless <code>.gitmodules</code> is already staged. Order matters.</p>

      <p>Next, I renamed the root remote from <code>config-zsh</code> to <code>dotconfig</code>, freeing the <code>config-zsh</code> name for <code>zsh/</code> to use properly:</p>

      <pre><code>git remote set-url origin git@github.com:smnuman/dotconfig.git</code></pre>

      <p>Then I initialized <code>zsh/</code> as its own independent git repository:</p>

      <pre><code>cd ~/.config/zsh
git init
git branch -M main
git remote add origin git@github.com:smnuman/config-zsh.git
git fetch origin
git reset --hard origin/main</code></pre>

      <p>The <code>reset --hard origin/main</code> restored the proper <code>.gitignore</code> (which had been corrupted by <code>_gisolate</code>), the correct <code>.gitmodules</code>, and all tracked files from the remote history.</p>

      <p>After setting up git-crypt and initializing sub-submodules (<code>git-utils</code> and <code>prompt</code>), I registered <code>zsh/</code> as a proper submodule in root and pushed everything. This required temporarily disabling GitHub branch protection on <code>dotconfig</code> since it enforces PRs even for admins:</p>

      <pre><code># Disable protection
gh api -X DELETE repos/smnuman/dotconfig/branches/main/protection

# Push
git push -u origin main --force

# Re-enable protection
gh api -X PUT repos/smnuman/dotconfig/branches/main/protection \\
  --input &lt;(echo '{"required_pull_request_reviews":{"required_approving_review_count":1},"enforce_admins":true,"required_status_checks":null,"restrictions":null}')</code></pre>

      <h2>Phase C: Branch and Remote Cleanup</h2>

      <p>With the structure fixed, I still had three submodules in bad states.</p>

      <p><strong>zsh/git-utils</strong> was in detached HEAD at commit <code>038ed81</code>, but had significant uncommitted local work -- a new <code>GIT_UTILS_DEBUG</code> toggle, a <code>git-toggle-remote</code> function for switching between GitHub and GitLab, and a <code>git-aliases</code> pretty-printer. The <code>main</code> branch was at <code>159bb1c</code> (ahead with a .gitignore update). Fix: stash, checkout main, pop stash, commit, push.</p>

      <p><strong>zsh/prompt</strong> was detached at <code>cfe95ac</code>. The <code>main</code> branch was significantly ahead at <code>6f4a2fe</code> with a cumulative update that subsumed all the orphaned commits. Fix: just <code>git checkout main</code>.</p>

      <p><strong>brew/</strong> was the worst -- a git repo with no remote, no commits, and a corrupted <code>.gitignore</code>. But it had plenty of local content (an up-to-date Brewfile, utilities, README) and the remote <code>config-brew</code> existed on GitHub with 21 commits of history. Fix: add remote, fetch, <code>git reset origin/main</code> to graft onto remote history, fix the <code>.gitignore</code> corruption, commit the updated content, push.</p>

      <p>After fixing all three, I propagated submodule pointers bottom-up: <code>zsh/</code> committed its updated <code>git-utils</code> and <code>prompt</code> pointers, then root committed its updated <code>brew</code> and <code>zsh</code> pointers. Each push to <code>dotconfig</code> required the branch-protection dance.</p>

      <h2>The Final State</h2>

      <pre><code>~/.config/                    -&gt; smnuman/dotconfig.git
  brew/                       -&gt; smnuman/config-brew.git       [submodule]
  zsh/                        -&gt; smnuman/config-zsh.git        [submodule]
    git-utils/                -&gt; smnuman/zsh-git-utils.git     [submodule]
    prompt/                   -&gt; smnuman/zsh-prompt.git        [submodule]</code></pre>

      <p>All 5 repositories on <code>main</code>, tracking <code>origin/main</code>, fully synced. Zero detached HEADs. Zero missing remotes. Zero uncommitted changes.</p>

      <h2>Lessons Learned</h2>

      <p>Seven hard-won takeaways from a long day of git archaeology:</p>

      <ol>
        <li><strong>Never encrypt git infrastructure files.</strong> Files like <code>.gitattributes</code>, <code>.gitmodules</code>, and <code>.gitignore</code> must be plaintext. Encrypting <code>.gitattributes</code> (which controls encryption rules) creates a circular dependency. Encrypting <code>.gitmodules</code> means git cannot discover submodules. Just do not do it.</li>
        <li><strong>Auto-generated repo names can collide.</strong> If your naming convention is <code>parent-child</code>, make sure a parent and its child cannot resolve to the same name. In my case, both <code>~/.config</code> and <code>~/.config/zsh</code> generated <code>config-zsh</code>. Validate uniqueness before pushing.</li>
        <li><strong>Guard your .gitignore from helper functions.</strong> Any utility that writes a <code>.gitignore</code> (like my <code>_gisolate</code>) should check whether one already exists first. Overwriting a curated ignore file with <code>*</code> / <code>!.gitignore</code> silently breaks the entire repo's file tracking.</li>
        <li><strong>Submodule update always detaches HEAD.</strong> This is by design -- <code>git submodule update</code> checks out the exact commit recorded in the parent, not a branch. Always follow it with <code>git checkout main</code> in each submodule if you need to be on a branch.</li>
        <li><strong>Pre-commit hooks produce false positives on .gitattributes.</strong> If your secret-scanning hook greps for patterns like <code>password</code>, <code>secret</code>, or <code>token</code>, it will flag <code>.gitattributes</code> because those words appear in encryption pattern names (e.g., <code>**/*password* filter=git-crypt</code>). Exclude <code>.gitattributes</code> from secret scanning.</li>
        <li><strong>Know how to bypass branch protection in emergencies.</strong> GitHub's <code>enforce_admins: true</code> blocks even repo owners from direct pushes. For emergency structural fixes: <code>gh api -X DELETE</code> to disable, push, <code>gh api -X PUT</code> to re-enable. Script this if you value your sanity.</li>
        <li><strong>git-crypt status -f does not handle gitignored files.</strong> It runs <code>git add</code> without <code>-f</code>, so gitignored-but-tracked files get silently skipped. Always check for these manually and use <code>git add -f</code>.</li>
      </ol>

      <hr />

      <p>The whole operation took most of a day. The repo hierarchy is now clean, every submodule is properly registered and tracked, encryption only touches genuinely sensitive files, and the custom git utilities work without re-poisoning anything. Sometimes you have to tear down the scaffolding to find out the foundation was cracked.</p>
    `,
  },
  'building-this-website': {
    title: 'Building This Website with React & Vite',
    date: 'May 17, 2025',
    author: 'Numan Syed',
    content: `
      <p>This website, numansyed.com, was built using a modern JavaScript stack. Here's a quick rundown of the key technologies and why they were chosen:</p>
      <ul>
        <li><strong>React:</strong> A popular JavaScript library for building user interfaces. Its component-based architecture makes it easy to create reusable UI elements.</li>
        <li><strong>Vite:</strong> A next-generation frontend tooling that provides an extremely fast development server and optimized builds. It made the development experience very smooth.</li>
        <li><strong>React Router:</strong> For handling client-side routing, allowing for a single-page application (SPA) feel.</li>
        <li><strong>CSS Modules:</strong> To scope CSS locally to components, preventing style conflicts and making styling more manageable.</li>
        <li><strong>Dark/Light Theme:</strong> Implemented using CSS custom properties (variables) and a simple JavaScript toggle, with theme preference saved to local storage.</li>
      </ul>
      <p>The goal was to create a clean, modern, and responsive personal website that's easy to maintain and update. The design is inspired by nayeemsyed.com, focusing on readability and a pleasant user experience.</p>
      <p>Future improvements might include adding a CMS for blog posts, more interactive elements, and further performance optimizations.</p>
    `,
  },
  'importance-of-dark-mode': {
    title: 'The Importance of Dark Mode in Modern Web Design',
    date: 'May 16, 2025',
    author: 'Numan Syed',
    content: `
      <p>Dark mode has become an increasingly popular feature in applications and websites, and for good reason. It's not just a trend; it offers several tangible benefits:</p>
      <ul>
        <li><strong>Reduced Eye Strain:</strong> Especially in low-light environments, dark mode can be easier on the eyes by reducing the overall brightness of the screen.</li>
        <li><strong>Improved Readability:</strong> For some users, light text on a dark background can enhance contrast and make text easier to read.</li>
        <li><strong>Battery Savings:</strong> On OLED and AMOLED screens, dark mode can conserve battery life because black pixels are essentially turned off.</li>
        <li><strong>Aesthetic Appeal:</strong> Many users simply prefer the look and feel of dark interfaces. It can give a website a sleek, modern appearance.</li>
        <li><strong>Accessibility:</strong> For users with certain visual impairments, such as photophobia, dark mode can be a crucial accessibility feature.</li>
      </ul>
      <p>Implementing dark mode using CSS custom properties is relatively straightforward and provides a significant enhancement to the user experience. It's a feature worth considering for any modern web project.</p>
    `,
  },
  'responsive-design-principles': {
    title: 'Core Principles of Responsive Web Design',
    date: 'May 15, 2025',
    author: 'Numan Syed',
    content: `
      <p>With the variety of devices used to access the web today, responsive web design (RWD) is no longer a luxury but a necessity. The core idea is to create web pages that look good on all devices (desktops, tablets, and phones).</p>
      <p>Here are some fundamental principles:</p>
      <ul>
        <li><strong>Fluid Grids:</strong> Using relative units like percentages for widths, rather than fixed units like pixels. This allows the layout to adapt to different screen sizes.</li>
        <li><strong>Flexible Images:</strong> Ensuring images scale within their containing elements, often using <code>max-width: 100%;</code>.</li>
        <li><strong>Media Queries:</strong> A CSS technique that allows you to apply different styles based on device characteristics, primarily screen width.</li>
        <li><strong>Mobile-First Approach:</strong> Designing for mobile devices first and then progressively enhancing the design for larger screens. This often leads to a cleaner, more focused design.</li>
        <li><strong>Content Prioritization:</strong> Thinking about what content is most important and how it should be presented on smaller screens where space is limited.</li>
      </ul>
      <p>By adhering to these principles, developers can create websites that provide a consistent and optimal user experience across a wide range of devices.</p>
    `,
  },
};


const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className={`${styles.blogPostPage} container`}>
      <article className={styles.postContent}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postMeta}>
          By {post.author} on {post.date}
        </p>
        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <Link to="/blog" className={styles.backLink}>
        &larr; Back to Blog
      </Link>
    </div>
  );
};

export default BlogPostPage;