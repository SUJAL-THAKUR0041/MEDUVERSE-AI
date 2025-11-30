# Meduverse

> Lightweight React + Vite front-end for a healthcare/education assistant (local development).

This repository contains a Vite + React app that uses Tailwind, React Router, Lucide icons, and a small Gemini client to call the Generative Language API. The README below explains how to set up, run, and troubleshoot the project locally.

---

## Quick facts
- Project root: `E:/Meduverse/Meduverse`
- Dev server: Vite (`npm run dev`)
- Node required: Node 16+ (Node 18+ recommended)

---

## Prerequisites
- Node.js and npm installed
- (Optional) A Gemini API key for testing AI features. For local tests only — do not commit secrets.

---

## Install dependencies
Open PowerShell in the project root and run:

```powershell
Set-Location -Path 'E:\Meduverse\Meduverse'
npm install
```

---

## Environment variables
Create a `.env` file in the project root (do NOT commit this file). Use the `.env.example` already in the repo as a template.

Example `.env`:

```
VITE_GEMINI_API_KEY=your_real_gemini_api_key_here
```

Notes:
- Vite exposes `import.meta.env.VITE_*` variables to the client. The code uses `import.meta.env.VITE_GEMINI_API_KEY`.
- For production, **do not** keep API keys in client-side code — use a server-side proxy.

---

## Start the dev server
Run the dev server from the project root:

```powershell
Set-Location -Path 'E:\Meduverse\Meduverse'
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173` or `http://localhost:3000`).

If you set the `VITE_GEMINI_API_KEY` in the current shell, set it like this in PowerShell (temporary for that session):

```powershell
$env:VITE_GEMINI_API_KEY = 'your_real_key_here'
npm run dev
```

---

## Recommended safer approach: local server proxy for Gemini (keeps key secret)
Create a minimal Express proxy (local testing only). Example:

1. Create `server/index.js`:

```javascript
// server/index.js
import express from 'express';
import fetch from 'node-fetch'; // or use global fetch if Node >= 18
const app = express();
app.use(express.json());

app.post('/api/gemini/generate', async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(500).json({ error: 'Server missing GEMINI_API_KEY' });
    const body = { model: 'gemini-pro', prompt: { text: req.body.prompt } };
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    const json = await r.json();
    res.status(r.status).json(json);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.listen(3001, () => console.log('Proxy listening on http://localhost:3001'));
```

2. Initialize and run the server (in a separate terminal):

```powershell
cd E:\Meduverse\Meduverse\server
npm init -y
npm install express node-fetch
$env:GEMINI_API_KEY = 'your_real_key_here'  # PowerShell temporary
node index.js
```

3. Update `src/api/geminiClient.js` to call `/api/gemini/generate` instead of Google's endpoint.

---

## Troubleshooting common errors
- `GEMINI API key is not set` / 403: set `VITE_GEMINI_API_KEY` or use the proxy. Confirm no extra quotes or whitespace.
- Unresolved imports / module not found: many files have spaces in their filenames (e.g. `Animated Background.jsx`). Import paths must match exact on-disk names. Consider renaming files to remove spaces and use kebab-case or camelCase.
- `lucide-react` icon not exported: some icon names used in code may not exist in the installed version of `lucide-react` (e.g., `Hospital` vs `Building`). If you see `export not found` errors, replace the icon name or pin the package version.
- `process is not defined` in browser: ensure code uses `import.meta.env` (Vite) rather than `process.env`.
- React Router future flag warnings: advisory only. To opt-in to v7 behaviors early, use `createBrowserRouter(routes, { future: { v7_startTransition: true, v7_relativeSplatPath: true } })`.

---

## Developer tips
- Install React DevTools in your browser (Chrome/Edge/Firefox) and open DevTools → React tab.
- Consider renaming component files to remove spaces for more predictable imports.
- Use a server-side proxy for the Gemini API in production — never expose production keys in client JS.

---

## Project structure (important folders)
- `src/` — React source
  - `src/pages/` — page components
  - `src/components/` — smaller components and UI primitives
  - `src/components/ui/` — UI primitives (button, input, card, etc.)
  - `src/api/geminiClient.js` — Gemini client wrapper (uses `import.meta.env`)

---

## Quick Hindi (सरल रूप से)

1) प्रोजेक्ट रूट में जाएँ:
```powershell
Set-Location -Path 'E:\Meduverse\Meduverse'
```
2) डिपेंडेंसी इंस्टॉल करें:
```powershell
npm install
```
3) `.env` फ़ाइल बनाकर अपनी Gemini की दर्ज करें:
```text
VITE_GEMINI_API_KEY=your_real_gemini_api_key_here
```
4) dev सर्वर चलाएँ:
```powershell
npm run dev
```

ध्यान दें: अगर Gemini API 403 दे रहा है तो की सही है या नहीं चेक करें, और प्रोडक्शन के लिए की सर्वर-साइड रखें।

---

If you want, I can also:
- add a `server/` folder and implement the proxy code automatically, or
- rename files to remove spaces and normalize imports across the repo.

Feel free to tell me which of the above you'd like me to do next.
