# Pending Updates - numansyed.com

## High Priority

### Header
- [ ] **Search button** - Currently non-functional (onClick is empty)
- [ ] **Write button** - Should link to a new post page or external writing platform

### Footer
- [ ] **Write section links** - Currently placeholder `#` links
- [ ] **Contact page** - Need a contact page or email link
- [ ] **Privacy/Terms pages** - Need actual pages or remove links
- [ ] **Help page** - Need a help page or remove link

### BlogPage
- [ ] **Topic filtering** - Links go to `/blog?topic=X` but filtering isn't implemented
- [ ] **Popular reads** - Hardcoded "2.4k reads" - should be dynamic or removed

## Medium Priority

### Blog Posts
- [ ] **Move to CMS/Markdown** - Currently hardcoded in `BlogPostPage.jsx` - should be fetched from files or a CMS
- [ ] **Add more blog posts** - Only 4 posts currently
- [ ] **Reading time calculation** - Currently hardcoded in `readTimes` object

### Content
- [ ] **Reviews page** - Needs content/update
- [ ] **About page** - Review and update content
- [ ] **Author bio** - Currently same text in multiple places - should be centralized

### Interactive Features
- [ ] **Clap/like button** on blog posts - Medium-style appreciation
- [ ] **Comments section** - Medium-style responses
- [ ] **Email subscription** - Newsletter signup

## Low Priority

### SEO & Performance
- [ ] **Meta tags** - Add proper Open Graph, Twitter cards
- [ ] **Sitemap.xml** - Generate for SEO
- [ ] **Robots.txt** - Add for crawlers

### Analytics
- [ ] **Add analytics** - Track visitors, popular content

---

## Quick Reference

```bash
# Work on pending updates
git checkout main
npm run dev

# Revert to pre-redesign (if needed)
git checkout pre-medium-style-redesign
```
