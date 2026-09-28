# Muhammad Hamza - Portfolio

Live site: https://insightsbyhamza.github.io/

Data Analyst & Automation Specialist: dashboards, web scraping, automation pipelines and reporting.

## Files

- `index.html` - the whole site (HTML + CSS + JS in one file).
- `uploads/` - dashboard screenshots (`.webp`), portrait, tool logos (`uploads/logos/`) and `Resume.pdf`.
- `favicon.svg`, `site.webmanifest` - icon and web app manifest.

## Editing the common things

Search `index.html` for:

| Change | Where |
|---|---|
| Hero headline / sub line | `<h1 class="hero-title">` and `.hero-sub` |
| Numbers (7+, 15+ ...) | `data-count="..."` in the `#impact` section |
| About text | `#about` section |
| Skills tiles | `#skills` section, one `<article class="sk">` per discipline: title, one-line note and `.sk-tool` icons (logo from `uploads/logos/`, or a text monogram `<i class="txt">`). Each tile's `--art` variable is the width of its background art. |
| Jobs on the career chart | `#exp` section: each `.crow` has `left`/`width` percentages (2017-01 = 0%, 2026-12 = 100%) |
| Projects | `#work` section: each `<button class="pj">` is one project; its `data-` attributes hold the title, tag, tools, description, `data-link` (public) or `data-conf="1"` (confidential) and `data-pages` (one label + image per dashboard page). |
| Web apps (Price Radar) | `#radar` section: copy on the left, screenshot pages as `.rd-tabs` buttons (`data-img`) on the right |
| Automations | `#autos` section, one `<article class="card">` each |
| Email / links | `#contact` section and the footer |
| Colours | `:root` (dark) and `[data-theme=light]` at the top of the `<style>` block |

## Tech notes

- Fonts: Bricolage Grotesque, Manrope and JetBrains Mono via Google Fonts.
- Motion: GSAP + ScrollTrigger and Lenis from CDN. With the CDN blocked or `prefers-reduced-motion` on, the page renders static and still works.
- Theme: dark by default, light via the toggle (stored in `localStorage` under `theme`).
