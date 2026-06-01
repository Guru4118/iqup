# iQup — AI-Powered Mock Interview Platform

> A complete frontend revamp: light-theme SaaS design, professional animations, scroll-reveal effects, multi-section pages, and a polished component library.

---

## ✨ What's New in This Revamp

| Area | Before | After |
|---|---|---|
| Theme | Dark bg, inconsistent colours | Clean white + warm off-white surfaces, global CSS variables |
| Typography | Generic system font | Bricolage Grotesque (display) + DM Sans (body) |
| Animations | None | fadeUp, float, pulse-ring, marquee, scroll-reveal (IntersectionObserver) |
| Navbar | Basic links | Glass-morphism sticky nav, active states, mobile drawer |
| HomePage | Single section | 7 sections: Hero, Marquee, Stats, How it Works, Features, Testimonials, CTA |
| About | Minimal | Mission, Goals, Values, Tech Stack, Timeline, CTA |
| Auth | Separate login/register pages | Unified tabbed `AuthForms` page with split panel |
| Upload | Plain file input | Drag-and-drop zone with visual states, side panel, privacy note |
| Blog | Unstyled list | Featured article, category filter strip, newsletter CTA |
| Blog Detail | Bare text | Sidebar with related articles, author card, share button |
| Practice IDE | Functional only | Custom language dropdown, light Monaco theme, tips panel |
| Interview | Dark, no layout | Live indicator, question card, voice + text answer, tips sidebar |
| Evaluation | Raw text dump | Score ring SVG, metric bars, parsed feedback sections, action bar |
| 404 | None | Branded not-found page with quick links |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in VITE_JUDGE0_API_KEY for the Practice IDE
```

### 3. Run locally
```bash
npm run dev
# Opens at http://localhost:5173
```

### 4. Production build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── blogApi.jsx          # Axios blog API calls
├── components/
│   ├── Navbar.jsx            # Sticky glass-morphism nav
│   ├── Footer.jsx            # Dark footer with social links
│   ├── Login.jsx             # Standalone login (split panel)
│   └── Register.jsx          # Standalone register
├── hooks/
│   └── useReveal.js          # IntersectionObserver scroll-reveal hook
├── pages/
│   ├── HomePage.jsx          # 7-section landing page
│   ├── About.jsx             # Multi-section about page
│   ├── AuthForms.jsx         # Unified login/register with tabs
│   ├── UploadPage.jsx        # Drag-and-drop resume upload
│   ├── InterviewPage.jsx     # Live voice + webcam interview
│   ├── EvaluationPage.jsx    # Score ring + feedback report
│   ├── Blog.jsx              # Blog listing with category filter
│   ├── BlogDetail.jsx        # Article view with sidebar
│   ├── Practice.jsx          # Monaco IDE with Judge0 execution
│   └── NotFound.jsx          # 404 page
├── App.jsx                   # React Router setup
├── main.jsx                  # Entry point
└── index.css                 # Global design system (CSS variables, utilities, animations)
```

---

## 🎨 Design System

All design tokens live in `src/index.css` as CSS custom properties:

```css
--color-bg          /* #ffffff — page background */
--color-bg-subtle   /* #f8f7f4 — section backgrounds */
--color-ink         /* #1a1714 — primary text */
--color-accent      /* #e8572a — brand orange */
--color-teal        /* #0d8f7c — success / secondary */
--color-violet      /* #6d28d9 — accent 3 */
--color-amber       /* #d97706 — warning / highlight */
--font-display      /* Bricolage Grotesque */
--font-body         /* DM Sans */
```

Reusable utility classes: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-teal`, `.card`, `.card-flat`, `.badge`, `.input`, `.section`, `.container`, `.spinner`, `.tag`, `.divider`.

Scroll-reveal classes: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` — add `data-reveal` attribute and `data-delay="200"` to elements; the `useRevealAll` hook activates them on scroll.

---

## 🔧 Key Dependencies

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing |
| `axios` | HTTP requests to backend API |
| `@monaco-editor/react` | VS Code-grade code editor in the Practice IDE |
| `react-webcam` | Webcam feed in the interview screen |
| `lucide-react` | Icon library |
| `@tailwindcss/vite` | Utility-first CSS (v4, optional) |

---

## 🌐 Backend API

All API calls use `VITE_API_BASE_URL` (see `src/api/config.js`). Default production: `https://iqup.onrender.com`. Routes used:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/resume/upload` | Resume upload → returns `sessionId` |
| `GET` | `/api/question/:sessionId` | Fetch next interview question |
| `POST` | `/api/question/:sessionId` | Submit answer |
| `GET` | `/api/evaluate/:sessionId` | Get final evaluation |
| `GET` | `/api/blogs` | Fetch all blog posts |
| `GET` | `/api/blogs/:id` | Fetch single blog post |

---

## 👤 Author

Built with ❤️ by [Guruprasath](https://www.linkedin.com/in/guruprasath103/)  
Revamped frontend — professional SaaS design, 2025.
