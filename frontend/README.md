# AgriMarket — React app

Signup, login, buyer dashboard and farmer dashboard, built in React + Tailwind,
themed to match the three HTML mockups (`agrimarket_1_.html`, `agrimarket-dashboard.html`,
`agrimarket-farmer-dashboard.html`): the Fraunces/Inter/JetBrains Mono type pairing,
the paper/forest/leaf/harvest/soil palette, and the "mandi stamp" produce badges.

## Getting started

```bash
npm install
npm run dev
```

This runs standalone on its own Vite setup. If you'd rather merge it into your existing
project, copy the `src/` folder plus `tailwind.config.js` and `postcss.config.js` in, then
add `react-router-dom` and `lucide-react` to your own `package.json`.

## Structure

```
src/
  api.js                 fetch helpers for /signup and /login
  context/AuthContext.jsx  logged-in user (name, email, role), persisted to localStorage
  data/mockListings.js   demo produce listings + farmer analytics data
  hooks/useToast.js      small toast-notification hook
  components/            Navbar, ProduceCard, CartDrawer, RoleToggle, AuthCard, etc.
  pages/
    Login.jsx
    Signup.jsx
    BuyerDashboard.jsx   marketplace: search, category/price filters, cart drawer, simulated checkout
    FarmerDashboard.jsx  KPIs, sales chart, category split, stock levels, transactions,
                         plus the "list a crop" form and active-listings table
```

Routes: `/login`, `/signup`, `/buyer`, `/farmer`. `/buyer` and `/farmer` are role-gated —
visiting the wrong one bounces you to the correct dashboard, and visiting either while
logged out sends you to `/login`. `/` redirects based on auth state.

## Backend assumptions

`App.jsx`/`login.jsx` were already calling `http://localhost:5000/signup` and `/login`, so
`src/api.js` keeps that contract:

- **POST /signup** — now also sends `role` (`"buyer"` or `"farmer"`) alongside
  `name`, `email`, `password`.
- **POST /login** — sends `email`, `password`.

For the dashboards to route correctly right after signup/login, have your backend include
`name` and `role` in its JSON response. If `role` is missing, the app falls back to
`"buyer"` so it still works end-to-end while your backend catches up.

## What's mock data vs. real

The marketplace listings, KPI numbers, sales chart, category split, stock levels and
transaction feed are all static demo data in `src/data/mockListings.js` — same as the
original HTML prototypes, just moved into React state. The "List a crop" form is fully
interactive (it updates the table and the Active Listings KPI live), but doesn't yet call
a backend endpoint. When you're ready to wire up real listings, that's the one function to
change: `handleSubmit` in `FarmerDashboard.jsx`.
