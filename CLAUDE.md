# CLAUDE.md — Cadeau- Project

This file provides context and conventions for AI assistants (Claude) working in this repository.

## Project Overview

**Repository:** Cadeau-
**Owner:** Nicoselle
**Purpose:** A clean, modern landing page for a service/consultancy. The goal is to convert visitors into booked appointments by clearly communicating the value proposition and providing a direct call-to-action (Calendly integration).

**Target audience:** Entrepreneurs who want to strengthen their systems and solve complex operational problems.

## Intended Stack

- **HTML** — Semantic, accessible markup (`index.html`)
- **CSS** — Custom stylesheet, mobile-first (`css/style.css`)
- **JavaScript** — Minimal interactions, no framework required (`js/main.js`)
- **No build tools** required — runs directly in browser via localhost or file system

## Repository Structure

```
Cadeau-/
├── index.html              # Main landing page
├── css/
│   └── style.css           # Global styles
├── js/
│   └── main.js             # JS for interactions (scroll, animations, etc.)
├── assets/
│   ├── images/             # Logo, headshot, photography
│   └── docs/               # Brand guidelines, tone-of-voice, color palette
└── CLAUDE.md               # This file
```

## Design Conventions

- **Mobile-first** — design for small screens first, scale up
- **Whitespace** — generous spacing, essayistic layout, breathing room
- **Typography** — clean sans-serif, clear hierarchy
- **Color** — follow brand palette in `assets/docs/` if available
- **Tone** — direct, action-oriented, professional but human

## Key Page Sections (intended)

1. **Hero** — Bold headline, subheadline, primary CTA (book a call)
2. **Problem/Solution** — What complex problems are solved and for whom
3. **Services/Approach** — How Nicoselle works
4. **Social Proof** — Testimonials or client logos (if available)
5. **About** — Short bio with headshot
6. **Booking CTA** — Calendly embed or link

## Development Workflow

### Branch
Always work on:
```
claude/autonomous-workflows-webdev-1aHNf
```

### Git Commands
```bash
git checkout -b claude/autonomous-workflows-webdev-1aHNf  # if branch doesn't exist
git add <specific-files>
git commit -m "descriptive message"
git push -u origin claude/autonomous-workflows-webdev-1aHNf
```

### Before Editing
- Read existing files before modifying
- Check `assets/docs/` for brand guidelines
- Use Plan Mode for structural changes

## AI Assistant Instructions

1. **Ask before building** — Use reverse prompting to clarify goals, audience, and style before generating code
2. **Reuse, don't reinvent** — Check existing files for patterns before adding new code
3. **Iterate with screenshots** — Accept browser screenshots as feedback and adjust accordingly
4. **Brand consistency** — Apply tone-of-voice and color palette from `assets/docs/` automatically
5. **No over-engineering** — Keep it simple; plain HTML/CSS/JS unless complexity is explicitly requested
6. **Calendly integration** — Use Calendly embed widget for booking functionality

## Calendly Integration (reference)

```html
<!-- Inline embed -->
<div class="calendly-inline-widget"
     data-url="https://calendly.com/YOUR_USERNAME"
     style="min-width:320px;height:700px;">
</div>
<script type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async>
</script>
```

Replace `YOUR_USERNAME` with the actual Calendly handle when provided.

## Verification Checklist

- [ ] `index.html` opens correctly in browser
- [ ] Page is responsive on mobile (375px) and desktop (1280px)
- [ ] CTA buttons link to Calendly or booking flow
- [ ] All images load from `assets/images/`
- [ ] No console errors in browser devtools
- [ ] Git status is clean after each feature
