# Clock WebApp

A small, lightweight web app that shows the **current time & date** and a sky that **dynamically changes** (sun / moon, day ↔ night).

Simple, responsive, and ready to run either as plain static files or as an npm/Vite project.

---

## Features

- Live clock (updates every second)
- Greeting based on time (Good morning / afternoon / evening / night)
- Sky background that smoothly blends between day and night
- Sun / moon orb that moves across the sky
- Works as plain static files or within a Vite (npm) project

---

## Demo (quick)

- Double-click `index.html` to open in a browser (plain static mode), **OR**
- Use Vite for a dev server and fast reload ([instructions below]).

---

## Requirements

- For plain usage: a modern browser (Chrome, Firefox, Edge, Safari)
- For npm/Vite workflow: Node.js (v16+) and npm

---

## Install & Run

### Option A — Plain static files (no Node / npm)

1. Put these three files in the same folder:
    - `index.html`
    - `style.css`
    - `main.js`
2. Open `index.html` by double-clicking it (or right-click → Open with → Browser).

> Use this option if you want the simplest, dependency-free run.
> 

---

### Option B — npm + Vite (recommended for development)

1. Create a Vite vanilla project (or inside an existing folder):

```bash
npm create vite@latest clock-webapp --template vanilla
cd clock-webapp

```

1. Replace (or copy) the repo's `index.html`, `style.css`, and `main.js` into the project root (or move them into `/src` and update paths accordingly).
2. Install dependencies:

```bash
npm install

```

1. Start dev server:

```bash
npm run dev

```

Open the URL printed in the terminal (e.g. `http://localhost:5173`).

1. Build for production:

```bash
npm run build

```

The optimized output will be in `dist/`.

---

## File structure (suggested)

```
clock-webapp/
├─ index.html
├─ style.css
├─ main.js
├─ package.json    # only if using npm/Vite
└─ dist/           # only after build

```

If you move JS/CSS into `src/` (Vite convention):

```
clock-webapp/
├─ index.html
├─ src/
│  ├─ main.js
│  └─ style.css
└─ package.json

```

If using `src/`, import CSS in `main.js`:

```jsx
import './style.css';

```

and update `index.html` to load `/src/main.js`:

```html
<script type="module" src="/src/main.js"></script>

```

---

## Customization hints

- Change the day range from `6` to `18` (in `main.js`) to tweak when “day” and “night” appear.
- Replace the inline SVGs (`SUN_SVG` / `MOON_SVG`) with real images for different styles — update `orb.innerHTML` logic.
- Add a timezone selector by using `Intl.DateTimeFormat` with a selected `timeZone` to show other timezones.
- Add transitions or different gradients in `style.css` to change mood (sunset, storm, etc.).

---

## Troubleshooting

- **Unstyled page / JS not loading**: confirm your files are in the *same folder* and your `<script>`/`<link>` use relative paths (no leading `/`) if opening directly via `file://`.
- **Using Vite** but page shows blank or errors: ensure you started the dev server with `npm run dev` and that `index.html` uses `type="module"` and paths beginning with `/` (or uses `/src` imports when applicable). Check the browser console (Inspect → Console) for errors.

---

## Contributing

- Fork the repo, create a branch (`feature/your-change`), and open a pull request.
- Keep changes small and focused; include a short description of the change.

---

## License

MIT — feel free to use, modify, and share.

---