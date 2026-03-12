export const tilEntries = [
  {
    id: 'til-001',
    date: 'March 12, 2026',
    title: 'Git diff supports word-level diffs',
    content: 'TIL that `git diff --word-diff` shows changes at the word level instead of line level. Incredibly useful for prose and documentation changes where a single word edit shows the entire line as changed.',
    tags: ['Git'],
  },
  {
    id: 'til-002',
    date: 'March 11, 2026',
    title: 'CSS :has() is the parent selector we always wanted',
    content: 'The `:has()` pseudo-class lets you style a parent based on its children. For example, `div:has(> img)` selects any div that directly contains an image. No more JavaScript for parent-based styling. Works in all modern browsers as of 2024.',
    tags: ['CSS', 'Web Dev'],
  },
  {
    id: 'til-003',
    date: 'March 10, 2026',
    title: 'Bash parameter expansion for default values',
    content: 'In bash, `${VAR:-default}` uses "default" if VAR is unset or empty. But `${VAR:=default}` also *assigns* the default to VAR. And `${VAR:?error message}` exits with the error if VAR is unset. Three patterns, three different use cases.',
    tags: ['Shell', 'DevOps'],
  },
  {
    id: 'til-004',
    date: 'March 9, 2026',
    title: 'React strict mode double-renders on purpose',
    content: 'React\'s StrictMode intentionally double-invokes functions like component bodies, initializers, and updaters during development. This helps find impure renders and side effects. It only happens in dev mode — production builds render once.',
    tags: ['React', 'Web Dev'],
  },
  {
    id: 'til-005',
    date: 'March 8, 2026',
    title: 'jq can construct new JSON objects',
    content: 'Beyond filtering, `jq` can build entirely new JSON structures: `jq \'{name: .user.login, stars: .stargazers_count}\'`. Combined with `[.[] | ...]` for arrays, you can reshape any JSON API response into exactly the structure you need.',
    tags: ['Tools', 'Shell'],
  },
  {
    id: 'til-006',
    date: 'March 7, 2026',
    title: 'Vite environment variables must be prefixed',
    content: 'Vite only exposes environment variables prefixed with `VITE_` to client-side code. Variables without the prefix are available in `vite.config.js` via `process.env` but won\'t be bundled into the client build. This is a security feature to prevent accidental secret exposure.',
    tags: ['Vite', 'Web Dev'],
  },
  {
    id: 'til-007',
    date: 'March 5, 2026',
    title: 'SSH config supports pattern matching',
    content: 'In `~/.ssh/config`, the `Host` directive supports wildcards. `Host *.dev.company.com` applies settings to all dev servers. Combined with `Match` blocks for conditional config, you can handle complex SSH setups without per-host entries.',
    tags: ['DevOps', 'Tools'],
  },
  {
    id: 'til-008',
    date: 'March 3, 2026',
    title: 'Object.groupBy() is now a thing in JavaScript',
    content: '`Object.groupBy(items, item => item.category)` groups an array into an object keyed by the callback\'s return value. No more `reduce()` boilerplate for grouping. Available in Node 21+ and all modern browsers.',
    tags: ['JavaScript', 'Web Dev'],
  },
];

export const tilTopics = [...new Set(tilEntries.flatMap(entry => entry.tags))];
