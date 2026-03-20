# CLAUDE.md — Cadeau- Project

This file provides context and conventions for AI assistants (Claude) working in this repository.
**Last updated:** reflecting actual built state of the landing page.

---

## Project Overview

**Repository:** Cadeau-
**Owner:** Nicoselle
**Purpose:** Clean, modern Dutch-language landing page for a service/consultancy.
Converts visitors into direct contact (WhatsApp / email) by communicating value and personality.

**Target audience:** Entrepreneurs who want to strengthen their systems using AI, strategy, and coaching.

**Language:** Nederlands (Dutch)
**Primary CTA:** WhatsApp + email (no Calendly — direct contact preferred)

---

## Repository Structure (actual)

```
Cadeau-/
├── index.html              # Main landing page (complete, all sections)
├── css/
│   └── style.css           # Full stylesheet — design tokens, components, responsive
├── js/
│   └── main.js             # Mobile nav toggle + IntersectionObserver animations
├── assets/
│   ├── images/             # EMPTY — add: headshot.jpg, logo, other imagery
│   └── docs/               # EMPTY — add: style guide, brand guidelines, tone-of-voice
└── CLAUDE.md               # This file
```

---

## Current Page Sections (`index.html`)

| Section | ID | Description |
|---|---|---|
| Navigation | — | Sticky, blur backdrop, mobile hamburger menu |
| Hero | — | H1, subheadline, WhatsApp + email CTA buttons |
| Probleem/Oplossing | `#probleem` | 2-column: pain points (left) + solution (right) |
| Diensten | `#diensten` | 4-card grid: Systemen, AI, Strategie, Coaching |
| Over mij | `#over` | Photo + bio text (placeholder content) |
| Contact CTA | `#contact` | Dark section, WhatsApp + email buttons |
| Footer | — | Logo + copyright |

---

## Stack & Technical Decisions

- **Plain HTML/CSS/JS** — no framework, no build tools, opens directly in browser
- **Google Fonts** — Inter (300, 400, 500, 600, 700) loaded via `<link>`
- **No dependencies** — zero npm packages, zero external JS libraries
- **CSS custom properties** — all design tokens in `:root` at top of `style.css`
- **Mobile-first responsive** — breakpoints at 640px (mobile nav), 768px (layout), 1024px (desktop)
- **IntersectionObserver** — used for scroll fade-in animations (no GSAP/AOS needed)

---

## Design Tokens (in `css/style.css` `:root`)

```css
--clr-bg:        #FAFAF8;   /* Page background */
--clr-surface:   #FFFFFF;   /* Card/section background */
--clr-border:    #E8E8E4;   /* Borders */
--clr-text:      #1A1A18;   /* Body text */
--clr-muted:     #6B6B66;   /* Secondary text */
--clr-accent:    #2D5BE3;   /* Brand accent (REPLACE with style guide color) */
--clr-hero-bg:   #F0EDE8;   /* Hero section background */
```

**To apply the real brand style:** update these 7 variables and replace the Google Font — nothing else needs to change.

---

## Placeholders That Need Real Content

| Location | Placeholder | Replace with |
|---|---|---|
| `index.html` line ~46 | `https://wa.me/JOUWWHATSNUMMER` | Actual WhatsApp number (international format) |
| `index.html` line ~51 | `mailto:jouw@email.nl` | Actual email address |
| `index.html` line ~100 | `<!-- Vervang dit door: <img ...> -->` | `<img src="assets/images/headshot.jpg" alt="Nicoselle">` |
| `index.html` line ~148 | `[Korte introductie...]` | Real bio text |
| `index.html` line ~153 | `[Voeg hier een persoonlijk element toe...]` | Real personal touch |
| `index.html` line ~173 | Same WhatsApp/email placeholders | Same as above |
| `css/style.css` `:root` | `--clr-accent: #2D5BE3` | Brand color from style guide |
| `index.html` `<title>` | "Systemen die voor jou werken" | Real tagline |
| `index.html` `<meta description>` | Placeholder description | SEO-optimized description |
| `index.html` footer | `&copy; 2025` | Update year if needed |

---

## Development Workflow

### Active Branch
```
claude/autonomous-workflows-webdev-1aHNf
```

### Git Commands
```bash
# Stage specific files (never git add -A)
git add index.html css/style.css js/main.js

# Commit
git commit -m "descriptive message"

# Push
git push -u origin claude/autonomous-workflows-webdev-1aHNf
```

### Before Editing Any File
1. Read the file first
2. Check `assets/docs/` for brand guidelines (when added)
3. For layout changes: use Plan Mode first
4. For copy/content changes: can edit directly

---

## AI Assistant Instructions

1. **Read before editing** — always read the file before making changes
2. **Use design tokens** — never hardcode colors/fonts; update `:root` variables instead
3. **Preserve structure** — sections are in logical order; don't reorder without reason
4. **Placeholders = TODOs** — content in `[square brackets]` in HTML is placeholder text
5. **No over-engineering** — this is intentionally plain HTML/CSS/JS; don't introduce frameworks
6. **Screenshots welcome** — user will paste browser screenshots for visual feedback; act on them directly
7. **Brand files first** — when `assets/docs/` gets populated, read those before making style changes
8. **Dutch copy** — all visible text on the page is in Dutch; maintain this unless told otherwise

### When Adding a New Section
- Add the HTML in `index.html` between existing sections
- Add corresponding CSS at the bottom of `style.css` (before the responsive blocks)
- Add fade-up animation targets to the selector in `js/main.js` if needed

### When Adding Images
- Place files in `assets/images/`
- Reference as `src="assets/images/filename.jpg"`
- Always add descriptive `alt` text
- Recommended headshot dimensions: 600×800px minimum, WebP preferred

---

## Verification Checklist

- [ ] `index.html` opens correctly in browser (double-click or `python3 -m http.server`)
- [ ] Mobile nav hamburger works and closes on link click
- [ ] Page is responsive: 375px (iPhone SE), 768px (tablet), 1280px (desktop)
- [ ] WhatsApp link opens correct number
- [ ] Email link opens mail client with correct address
- [ ] Scroll animations trigger on all sections
- [ ] No console errors in browser devtools
- [ ] `git status` is clean after committing

---

## Running Locally

No build step needed. Open directly or use a simple server:

```bash
# Option 1: Open directly
open index.html

# Option 2: Local server (avoids font CORS issues)
cd /home/user/Cadeau-
python3 -m http.server 8080
# Then open: http://localhost:8080
```
