export const gardenNotes = [
  {
    slug: 'unix-philosophy-modern-dev',
    title: 'The Unix Philosophy in Modern Development',
    status: 'evergreen',
    lastUpdated: 'March 10, 2026',
    created: 'January 5, 2026',
    excerpt: 'Do one thing well. How Unix principles shape better CLI tools, microservices, and composable systems.',
    tags: ['Systems', 'Philosophy', 'Architecture'],
    content: `
      <p>The Unix philosophy — "do one thing and do it well" — is more relevant today than ever. Every time we reach for a monolithic framework, we trade composability for convenience.</p>

      <h2>The Core Tenets</h2>
      <ol>
        <li><strong>Make each program do one thing well.</strong> To do a new job, build afresh rather than complicating old programs by adding new features.</li>
        <li><strong>Expect the output of every program to become the input to another.</strong> Don't clutter output with extraneous information. Don't insist on interactive input.</li>
        <li><strong>Design and build software to be tried early.</strong> Don't hesitate to throw away the clumsy parts and rebuild them.</li>
      </ol>

      <h2>Modern Parallels</h2>
      <p>Microservices are Unix pipes at a network level. Each service does one thing. They communicate over well-defined interfaces (HTTP, gRPC, message queues). The composability is the same — you can swap, scale, or replace any service independently.</p>

      <p>CLI tools like <code>ripgrep</code>, <code>fd</code>, <code>jq</code>, and <code>fzf</code> embody this perfectly. Each is laser-focused. Together, they're more powerful than any IDE.</p>

      <h2>Where We Go Wrong</h2>
      <p>The temptation to build "platforms" instead of "tools" is the modern violation of Unix philosophy. When your CLI tool needs a config file, a plugin system, and a daemon — you've lost the plot.</p>
    `,
    connections: ['shell-scripting-patterns', 'composable-architecture'],
  },
  {
    slug: 'shell-scripting-patterns',
    title: 'Shell Scripting Patterns That Actually Scale',
    status: 'budding',
    lastUpdated: 'March 8, 2026',
    created: 'February 15, 2026',
    excerpt: 'Beyond bashisms: structuring shell scripts for maintainability, error handling, and portability.',
    tags: ['Shell', 'DevOps', 'Patterns'],
    content: `
      <p>Most shell scripts start as one-liners and grow into unmaintainable monsters. Here are patterns that prevent that.</p>

      <h2>The Main Function Pattern</h2>
      <p>Always wrap your script in a <code>main()</code> function. This prevents variables from leaking into global scope and makes the script's entry point explicit.</p>

      <pre><code>#!/usr/bin/env bash
set -euo pipefail

main() {
    local input="\${1:?Usage: script.sh <input>}"
    process "$input"
}

process() {
    echo "Processing: $1"
}

main "$@"</code></pre>

      <h2>Error Handling</h2>
      <p><code>set -euo pipefail</code> is your first line of defense. But it's not enough. Use trap for cleanup, and explicit error messages for user-facing scripts.</p>

      <h2>Still Evolving</h2>
      <p>I'm collecting more patterns around: argument parsing without getopt, cross-platform path handling, and structured logging in bash. This note will grow.</p>
    `,
    connections: ['unix-philosophy-modern-dev'],
  },
  {
    slug: 'composable-architecture',
    title: 'Composable Architecture',
    status: 'seedling',
    lastUpdated: 'March 1, 2026',
    created: 'March 1, 2026',
    excerpt: 'Early thoughts on building systems from interchangeable, independently deployable parts.',
    tags: ['Architecture', 'Systems', 'Design'],
    content: `
      <p>This is an early-stage idea I'm exploring. The question: can we design entire systems the way Unix designs tools?</p>

      <h2>What I'm Thinking About</h2>
      <ul>
        <li>How do you define the "pipe" between services? REST is too loose, gRPC is too rigid.</li>
        <li>What's the equivalent of stdout/stderr for microservices? Structured logging? Event streams?</li>
        <li>Can you compose services declaratively the way you compose shell commands?</li>
      </ul>

      <p>More to come as I read and experiment.</p>
    `,
    connections: ['unix-philosophy-modern-dev'],
  },
  {
    slug: 'git-internals-mental-model',
    title: 'A Mental Model for Git Internals',
    status: 'evergreen',
    lastUpdated: 'February 28, 2026',
    created: 'December 10, 2025',
    excerpt: 'Git is a content-addressable filesystem with a VCS bolted on. Once you see it that way, everything clicks.',
    tags: ['Git', 'Mental Models', 'Tools'],
    content: `
      <p>Most people learn Git commands. Few learn Git's data model. The commands make no sense without the model.</p>

      <h2>The Three Objects</h2>
      <p>Git has exactly three object types:</p>
      <ul>
        <li><strong>Blob:</strong> File contents. No filename, no metadata. Just bytes + a SHA.</li>
        <li><strong>Tree:</strong> A directory listing. Maps names to blobs or other trees.</li>
        <li><strong>Commit:</strong> A snapshot. Points to a tree, plus parent commit(s), author, and message.</li>
      </ul>

      <p>That's it. Everything else — branches, tags, HEAD — is just a pointer to a commit.</p>

      <h2>Why This Matters</h2>
      <p>When you understand this, <code>git rebase</code> stops being scary. It's just creating new commit objects that point to the same trees. <code>git cherry-pick</code> is creating a new commit with the same diff. <code>git reset --hard</code> is moving a pointer.</p>

      <p>The reflog exists because Git never deletes objects immediately. Your "lost" work is almost always recoverable.</p>
    `,
    connections: [],
  },
  {
    slug: 'developer-tooling-taste',
    title: 'Taste in Developer Tooling',
    status: 'budding',
    lastUpdated: 'February 20, 2026',
    created: 'January 20, 2026',
    excerpt: 'Why some tools feel right and others don\'t. Speed, feedback loops, and the aesthetics of developer experience.',
    tags: ['DX', 'Tools', 'Philosophy'],
    content: `
      <p>There's a reason developers get religious about their tools. Good tooling isn't just functional — it has <em>taste</em>.</p>

      <h2>What Makes a Tool Feel Right</h2>
      <ul>
        <li><strong>Speed:</strong> Not just fast — instant. The difference between 50ms and 200ms is the difference between flow and friction.</li>
        <li><strong>Predictability:</strong> The tool does what you expect, every time. No surprises.</li>
        <li><strong>Composability:</strong> It plays well with other tools. Stdin, stdout, exit codes, flags.</li>
        <li><strong>Opacity:</strong> You can understand what it's doing. No magic, no hidden state.</li>
      </ul>

      <h2>The Vite Effect</h2>
      <p>Vite succeeded because it made the feedback loop nearly instant. Not because it had more features than Webpack. The speed <em>was</em> the feature.</p>

      <p>I'm collecting more examples of tools where taste made the difference. This note is growing.</p>
    `,
    connections: ['unix-philosophy-modern-dev'],
  },
];

export const gardenTopics = [...new Set(gardenNotes.flatMap(note => note.tags))];

export const statusInfo = {
  seedling: { emoji: '\u{1F331}', label: 'Seedling', description: 'Early idea, just planted' },
  budding: { emoji: '\u{1F33F}', label: 'Budding', description: 'Growing, being refined' },
  evergreen: { emoji: '\u{1F333}', label: 'Evergreen', description: 'Mature, well-developed' },
};
