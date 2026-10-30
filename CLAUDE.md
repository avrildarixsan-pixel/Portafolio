# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static student portfolio (plain HTML/CSS/JS, no build step, no dependencies, no tests) for Avril Darix San Martín Jiménez — 4° Medio, Química Industrial, Centro Politécnico Particular de Ñuñoa. Published with GitHub Pages at <https://ivan1721.github.io/Portafolio/>; pushed changes appear in 1–2 minutes. All site content is in Spanish.

The portfolio is graded against teacher rubrics (Desafío N.º 1, N.º 3, …). `README.md` tracks rubric status, pending files and data that still needs confirming against the student's lab notebook — keep it updated when adding pages or assets.

## Running locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Any static server works; opening the files directly also works except for some PDF viewers.

## Architecture

- **Every page is a standalone HTML file at the repo root** that duplicates the same header/nav and footer. There is no templating: when changing the nav, footer or contact info, edit every `*.html` file. Subpages of a module keep the parent module's nav link marked `active` (e.g. `pmao-*.html` mark `pmao.html`).
- **Module hubs link to subpages via `project-card`s**: `pmao.html` is the hub for `pmao-*.html` (Desafío 1, Desafío 3, and the five lab analyses). Subpages use a `.breadcrumb` back to the hub.
- **`js/main.js`** is shared by all pages and drives behavior through markup conventions:
  - `.reveal` → fades in on scroll (IntersectionObserver adds `.visible`).
  - `img[data-optional]` → if the file is missing, it is replaced by a "📷 Imagen pendiente — agregar <path>" box (the nav badge is just removed). This is how pages are built before photos are uploaded: reference the final filename and add `data-optional`.
  - `.pdf-loader[data-pdf][data-title]` with a `[data-load-pdf]` button → the PDF `<iframe>` is only created on click (auto-loading triggered downloads in some browsers). Always pair it with a `download` link.
- **`css/styles.css`**: single stylesheet; palette and sizes are CSS variables in `:root`. Reusable blocks: `.page-header`, `.section`/`.section__title`, `.article`, `.figure`, `.gallery-grid`, `.data-table` inside `.table-wrap`, `.formula`, `.project-card`.
- **Assets**: photos in `assets/img/`, PDFs in `assets/docs/`, videos in `assets/video/`. Filenames referenced in HTML must match exactly (case-sensitive on GitHub Pages). `*.zip` is gitignored.

## Content conventions

- Pending or unconfirmed content is marked in HTML with `<!-- ⚠️ ... -->` comments; values in result tables may be placeholders labelled "(ejemplo)". Don't invent lab results — leave placeholders and note them in `README.md`.
- Rubric requirements are noted as HTML comments next to the section that satisfies them (e.g. exact title text, line limits, minimum photo counts). Respect them when editing text.
