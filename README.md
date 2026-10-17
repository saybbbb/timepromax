# TimePro Max — Luxury Smartwatch Prototype & Demo Website

A high-performance product landing page and interactive configurator built for **TimePro Max**, featuring video hero integration, live customizer studio, telemetry bento showcase, and simulated demo order flow.

---

## ⚡ Quick Start

### 1. Start the Local Development Server
```bash
npm run dev
```
Open your browser at the provided localhost URL (typically `http://localhost:5173/`).

### 2. Production Build
```bash
npm run build
npm run preview
```

---

## 🎬 How to Add the Client's Hero Video

There are two easy ways to use the client's video:

### Option A: Static Asset (Recommended for Client Delivery)
1. Place the client's MP4 video file inside the `public/` directory:
   ```
   c:\Users\STORM\timepromax\public\hero-video.mp4
   ```
2. The website will automatically detect and loop this video with smooth muted autoplay and ambient vignette.

### Option B: On-the-Fly Video Loading (Instant Preview)
- On the Hero section, click the **"Load Video"** pill at the bottom right.
- Select any video file from your computer to preview it live inside the hero section immediately without restarting the server.

> **Tip for Best Video Performance**:
> - Recommended codec: H.264 (MP4) or WebM.
> - Resolution: 1080p (1920x1080).
> - Audio: Strip or mute the audio track to minimize file size and avoid browser autoplay restrictions.

---

## 🎨 How to Map the Canva Prototype to this Codebase

| Canva Prototype Element | Codebase Location | How to Update |
|---|---|---|
| **Color Palette** | `src/index.css` & `src/components/WatchCustomizer.jsx` | Edit hex codes for primary accents (`cyan-400`, `obsidian`, `gold`). |
| **Typography & Copy** | `src/components/Hero.jsx` & `src/components/FeaturesBento.jsx` | Update headlines and product specs directly in JSX. |
| **Product Photos / Watch Renders** | `src/components/WatchCustomizer.jsx` or `public/` | Swap the dynamic SVG watch stage with exported high-res transparent PNGs from Canva if preferred. |
| **Navigation Links** | `src/components/Navbar.jsx` | Add or rename links in the `navLinks` array. |

---

## 🛍️ Demo Order Workflow

Since this site is built for client demonstration:
1. Users can select case finishes (Titanium, Obsidian DLC, Cyber Gold), bands, diameters (45mm vs 49mm), and satellite connectivity.
2. The live price updates dynamically.
3. Clicking **"Pre-Order Demo"** opens the slide-in checkout drawer.
4. Users can input any demo shipping information and choose from simulated payment options.
5. Clicking **"Confirm Demo Order"** generates an interactive Digital Authenticity Receipt with a simulated order tracking ID and celebratory confetti.

---

## 🚀 1-Click Free Deployment Options

- **Vercel**: Run `npx vercel` in the project root.
- **Netlify**: Run `npx netlify deploy --prod --dir=dist` after running `npm run build`.
- **GitHub Pages**: Build with `npm run build` and publish the `dist` folder.
