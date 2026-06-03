# V Sai Purandhara — Portfolio

A fast, dependency-free portfolio website (vanilla HTML/CSS/JS) showcasing full-stack
and AI/ML engineering work at Jio Platforms.

**Live:** https://sai-purandhara.github.io

## Local preview

Just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

This repo is named `sai-purandhara.github.io`, so GitHub serves it as your **user site** at
`https://sai-purandhara.github.io` automatically.

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/sai-purandhara/sai-purandhara.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` branch / root**. Live in ~1 minute.

## Customise

- **Content** — edit `index.html` (sections: hero, about, skills, experience, projects, contact).
- **Colours/theme** — tweak the CSS variables at the top of `styles.css` (`:root`).
- **LinkedIn URL** — update the link in the contact section of `index.html` if your handle differs.
- **Project links** — each project card links to your GitHub; point them at specific repos when ready.

## Structure

```
index.html    # markup + content
styles.css    # dark theme, layout, animations
script.js     # nav, scroll reveals, animated stat counters
.nojekyll     # tells GitHub Pages to skip Jekyll processing
```
