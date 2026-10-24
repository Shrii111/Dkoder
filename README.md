# Dkoder Landing Page Redesign

A modern React + Vite landing page redesign for Dkoder with a yellow-and-purple brand theme, student-first storytelling, responsive layout, and interactive UI elements.

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS
- Lucide React
- Motion for React
- Three.js and React Three Fiber for the Skill Engine
- Lenis smooth scrolling (disabled for reduced-motion preferences)

## Project Structure

- `src/App.jsx` — main page composition
- `src/App.css` — page styling and responsive layout
- `src/index.css` — global reset and base styles
- `src/components/SkillEngine3D.jsx` — lazy-loaded 3D Skill Engine with a CSS fallback
- `src/components/DokiAssistant.jsx` — accessible FAQ helper with predefined, frontend-only responses
- `src/components/DokiAssistant.css` — Doki mascot and responsive chat panel styles
- `src/components/SkillRoadmapDemo.jsx` — goal-selectable illustrative learning roadmap
- `src/components/SkillRoadmapDemo.css` — responsive roadmap demo styles
- `src/components/CodingPlayground.jsx` — editable code preview with predefined sample outputs (no arbitrary execution)
- `src/components/CodingPlayground.css` — responsive editor and terminal preview styles
- `src/components/InteractiveButton.jsx` — reusable Motion CTA with magnetic hover and click feedback
- `src/assets/` — starter assets (unused in final build)

## Setup and Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Production Build

```bash
npm run build
```

The build output will be generated in the `dist` folder.

## Deployment

### GitHub

1. Initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository in GitHub.
3. Push the project:
   ```bash
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

### Vercel

1. Go to https://vercel.com
2. Import the GitHub repository
3. Select the project and deploy
4. Vercel will handle the build using the default React project settings

### Netlify

1. Go to https://netlify.com
2. Drag and drop the `dist` folder or connect the GitHub repo
3. Set build command to:
   ```bash
   npm run build
   ```
4. Set publish directory to:
   ```bash
   dist
   ```

## Notes

- The project is a frontend-only demo. Company tracks, dashboard metrics, and event cards are illustrative previews.
- Doki uses predefined local responses; messages are not sent to a backend or saved.
- The Skill Engine scene is code-generated and lazy-loaded. A CSS-built engine remains visible if WebGL is unavailable.
- Motion and continuous decorative movement respect `prefers-reduced-motion`.
- Light/dark appearance preference is saved locally in the browser.
- Roadmap completion and coding output are illustrative frontend previews; nothing is saved and the editor does not execute arbitrary code.
- The design follows the required yellow-purple branding and includes responsiveness plus reduced-motion support.
