# Elegant Rescues — Website

Static marketing site for Elegant Rescues, a conservation-restoration studio.
Plain HTML / CSS / JS — no build step required.

## Structure

```
index.html        Home page
styles.css        All styles
app.js            Scroll reveals, before/after sliders, nav state
images/           Photography & logo
.github/workflows/pages.yml   GitHub Pages deploy workflow
```

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

**Option A — GitHub Actions (recommended, already wired up)**

1. Push this folder to a repo.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` publishes automatically via `.github/workflows/pages.yml`.

**Option B — Deploy from a branch**

1. Push to `main`.
2. **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.

## Before going live

- **Portrait:** the About section uses a placeholder. Drop a headshot at
  `images/adri-portrait.jpg`, then in `index.html` replace
  `<div class="portrait-ph">…</div>` with
  `<img src="images/adri-portrait.jpg" alt="Adri Loubser, conservator-restorer" />`.
- **Contact links:** update the WhatsApp number (`wa.me/27000000000`) and confirm
  the email `hello@elegantrescues.co.za` in `index.html`.
- **Custom domain:** add a `CNAME` file (e.g. `elegantrescues.co.za`) and set the
  domain under Settings → Pages.
