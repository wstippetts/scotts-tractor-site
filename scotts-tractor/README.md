# Scott's Tractor Service — Project Guide
## Local Preview & How to Edit

---

## Project Structure

```
scotts-tractor/
├── index.html          ← Main page (all content lives here)
├── css/
│   └── style.css       ← All colors, layout, animations
├── js/
│   └── main.js         ← Scroll animations, navbar, counters, video logic
└── assets/
    ├── images/         ← Drop your photos here
    └── video/          ← Drop your hero video here
```

---

## Previewing Locally (Windows)

### Option 1 — VS Code + Live Server (RECOMMENDED)

This is the best option. Live Server auto-refreshes your browser every
time you save a file, so you see changes instantly.

**Step 1 — Install VS Code** (if you don't have it)
  → https://code.visualstudio.com/download

**Step 2 — Install the Live Server extension**
  1. Open VS Code
  2. Press `Ctrl + Shift + X` (opens Extensions panel)
  3. Search: `Live Server`
  4. Click Install (by Ritwick Dey)

**Step 3 — Open the project folder**
  1. In VS Code: File → Open Folder
  2. Navigate to and select the `scotts-tractor` folder
  3. Click "Select Folder"

**Step 4 — Launch Live Server**
  - Right-click `index.html` in the Explorer panel on the left
  - Select "Open with Live Server"
  - Your browser will open at: http://127.0.0.1:5500
  - Every time you save (Ctrl+S), the browser refreshes automatically ✓

---

### Option 2 — Python (no install needed on most Windows 11 machines)

**Step 1 — Open a terminal in your project folder**
  - Navigate to `scotts-tractor` in File Explorer
  - Click the address bar at the top, type `cmd`, press Enter
  - A Command Prompt opens already in that folder

**Step 2 — Start a local server**
```
python -m http.server 8080
```
  If that gives an error, try:
```
python3 -m http.server 8080
```

**Step 3 — Open in browser**
  → http://localhost:8080

  Press `Ctrl + C` in the terminal to stop the server.

---

### ⚠️  Why not just double-click index.html?

You can — but the video background won't load. Browsers block local
video/media files when opened directly from the filesystem (file:// URLs)
for security reasons. A local server fixes this.
Images and fonts work fine without a server, so for photo work only
you can skip the server step.

---

## Adding Your Photos

1. Copy your image files into `assets/images/`
   - JPG or WebP are best (PNG is fine but larger file size)
   - Recommended max width: 1920px (use Photos or Paint to resize if needed)

2. In `index.html`, find any placeholder like this:
```html
<div class="ph landscape">
  <svg ...></svg>
  <span class="ph-tag">Brush Hogging Photo</span>
</div>
```

3. Replace the entire `<div class="ph ...">...</div>` block with:
```html
<img src="assets/images/brush-hog-job.jpg" alt="Brush hogging a field">
```

4. Save. Live Server refreshes automatically.

---

## Adding Your Hero Video

1. Export or download your video clip as an **MP4**
   - Landscape orientation (horizontal), ideally 1920×1080
   - Keep it under ~15MB for fast loading
   - Free compression tool: https://handbrake.fr

2. Copy the file into `assets/video/` and name it `hero.mp4`

3. Open `index.html` and find this line (around line 80):
```html
<video id="hero-video" src="" autoplay muted loop playsinline ...>
```

4. Change `src=""` to `src="assets/video/hero.mp4"`:
```html
<video id="hero-video" src="assets/video/hero.mp4" autoplay muted loop playsinline ...>
```

5. Save. The placeholder text disappears and your video plays automatically.
   The dark overlay on top keeps your text readable.

---

## Editing Colors

All colors are CSS variables at the top of `css/style.css`:

```css
:root {
  --red:         #C8102E;   ← Mahindra red (primary accent)
  --red-dark:    #9B0B22;   ← Darker red for hover states
  --green:       #2E5E1E;   ← Deep green (chips, footer border)
  --green-light: #3D7A27;   ← Lighter green (hero subtitle)
  --black:       #0E0E0E;   ← Page background
  ...
}
```

Change any hex value and it updates everywhere on the page.

---

## Editing Content

All text content is in `index.html`. Use `Ctrl + F` in VS Code to
search for any phrase you want to change.

Key spots:
- Hero headline      → search: `Land Done Right`
- About paragraph    → search: `I'm a local owner-operator`
- Phone number       → search: `2087403044` (appears twice — href and display)
- Stats numbers      → search: `data-target` (e.g. `data-target="7"`)
- Footer             → search: `&copy; 2025`

---

## Next Steps (whenever you're ready)

When you want to put this online, good free/cheap options are:
- **Netlify** (free tier) — drag and drop the folder to deploy: https://netlify.com
- **GitHub Pages** (free) — push to a repo, enable Pages in settings
- **GoDaddy / Bluehost** — if you want a custom domain like scottstractor.com

---

Questions? Just ask — happy to walk through any step.
