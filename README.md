# Web Dashboard (Front)

A **Next.js** web application for operating a multi-tenant distribution network: clients, vending-style **distributors**, field agents, administrators, advertisers, and **claims** (support tickets). The UI is in **English** and talks to a REST API.

### Featured deployment (dispenser dashboard)

The live **dispenser / vending operations** frontend is hosted on Vercel:

**[https://dist-frontend-ecru.vercel.app](https://dist-frontend-ecru.vercel.app)**

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js 13](https://nextjs.org/) (Pages Router) |
| UI | React 18, [Tailwind CSS](https://tailwindcss.com/) |
| HTTP | [Axios](https://axios-http.com/) (shared client in `services/httpService.js` with toast errors) |
| Charts | [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) |
| Maps | [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) |
| Auth | JWT from API, user payload stored in a `user` cookie (`js-cookie`) |
| Notifications UI | [react-toastify](https://fkhadra.github.io/react-toastify/) |
| Tests | Jest + React Testing Library |

---

## Backend API

The default API base URL is set in `config/config.js`:

```js
https://distbackend-96a5.onrender.com/api/v1
```

Many pages also call this URL directly. To point the app at another environment, update `config/config.js` and replace hardcoded URLs as needed.

### Demo credentials (also shown on `/login`)

The login page lets you choose **Super admin** vs **Customer** so the correct endpoint is called.

| Role | Email | Password | API |
|------|--------|----------|-----|
| Super admin (SADM) | `admin@example.com` | `demo123456` | `POST /api/v1/auth/sadm/login` |
| Customer (consommateur) | `demo@example.com` | `demo123456` | `POST /api/v1/auth/consommateur/login` |

Body for both: `{ "email": "...", "password": "..." }`.

---

## Getting started

**Requirements:** Node.js 18+ (recommended) and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Next.js ESLint |
| `npm test` | Jest tests |

---

## Authentication and routing

- **Login** (`/login`): Email and password. You pick **Super admin** or **Customer**; the app calls `POST /auth/sadm/login` or `POST /auth/consommateur/login` (see demo table above). On success, a `user` cookie is set and the JWT is attached for API calls; then redirect to `/dashboard`.
- **Forgot / reset password** (`/forgetPassword`, `/resetPassword`): Uses `/auth/{role}/forgotPassword` and `/auth/{role}/resetPassword/:token`.
- **Middleware** (`middleware.js`): Logged-in users hitting `/login` are redirected to `/dashboard`. Unauthenticated users hitting `/dashboard` are redirected to `/login`. `/createAgent` routes require a `user` cookie.

The dashboard shell (sidebar + content) is applied to all routes except `/`, `/about`, `/login`, `/forgetPassword`, and `/resetPassword` (`components/layout/DashboardLayout.jsx`).

---

## Roles and access control

Roles used in the app include **SADM**, **ADM**, **AC**, **AM**, **DE**, **client**, and **annonceur** (API role for advertisers). Sidebar items are filtered with `utils/accessControl.js` and `config/accessByRole.js`:

- **Super admin (SADM)** and **admin (ADM)**-style access gates features such as **Account management** (ADM-only in config).
- **Agent** grouping (ADM, AC, AM, DE) can reach distributors, ads, claims, notifications, and statistics where configured.
- **Guest** in config allows broad read of items like home, about, dashboard, and profile labels—actual server routes still expect login for most app pages.

Exact rules live in `config/accessByRole.js`; adjust there if you add new pages or roles.

---

## Functionality overview

### Public marketing pages

- **`/`** — Landing: navigation, hero, how it works, help, contact, footer (`components/homePage/*`).
- **`/about`** — About page for the product/team.

### Dashboard (`/dashboard`)

- Summary **cards**: distributor count, client count, ADM count with links to lists and “add” flows.
- **Charts**: distributors per client (bar), new clients over time (line) via `services/stats.js`.
- **Map**: Leaflet map of distributor positions (`components/dashboard/DashbardMap.jsx`).

### Account and agent management

- **`/gestionComptes`** — Hub with counts and shortcuts for **sales agents (AC)**, **decision-makers (DE)**, and **maintenance agents (AM)**; links to listing pages and creation wizards.
- **Create flows** under `/createAgent/`: `createAC`, `createADM`, `createAM`, `createDE`, `createClient`.

### Lists and detail pages

- **Clients** — `/listes/Clients`, detail `/listes/Clients/[id]`.
- **Administrateurs (ADM)** — `/listes/ADM`, detail `[id]`.
- **AC / AM / DE** — `/listes/AC`, `/listes/AM`, `/listes/DE` with detail routes.
- **Distributors** — `/listes/Distributeurs/AC` (list scoped by client for non–super-admin; super admin can see all via `getAllDistributeur` in `services/distributeurs.js`). Detail `/listes/Distributeurs/AC/[id]` includes:
  - Distributor info, **map overlay**, **product carousel**, **drinks**, **maintenance agent (AM)** card, **assignment** UI, links to add **product** / **drink**.

### Resources (products and drinks)

- **`/AddDistributeur`** — Create a distributor: client, type, AM, region, state, map position, unlock code; posts to resource management API.
- **`/AddProduit/[id]`**, **`/AddBoisson/[id]`** — Associate products and drinks with a distributor (`services/produit.js`, `services/boisson.js`).

### Advertising (advertisers & ads)

- **`/listes/Annonceur`** — List advertisers for the logged-in user’s client; **create advertiser** modal/form.
- **`/listes/Annonceur/[id]`** — Advertiser detail.
- **`/listes/Annonceur/annonce/[id]`** — Ad detail: information cards and **pricing** section.

### Claims (support tickets)

- **`/listes/Reclamations`** — Table of claims; open a popup to **add a response**; navigates to detail on success.
- **`/listes/Reclamations/[id]`** — Detail and response thread (`services/reclamationReponses.js`: list, single, save/delete responses, delete claim).

### Statistics (`/statistics`)

- Extended analytics page with multiple **bar charts** (`BarChart1`–`BarChart6`) and filters; uses stats and profile/resource endpoints for regional and order-related metrics (see `pages/statistics/index.jsx`).

### Notifications (`/notifications`)

- Presents a list of notification cards (currently **static sample data** in the page). UI is ready to be wired to a live API or WebSocket later.

### Profile (`/profile`)

- Loads the current user’s profile from `/profileManagement/{role}/{id}` and supports **updating** fields via PUT to the same path.

### Other

- **`/not-authorized`** — Access denied page.
- **`404`** — Custom not found page.
- **`pages/api/hello.js`** — Sample API route (default Next.js stub).

---

## Project structure (high level)

```
pages/           # Routes (dashboard, lists, auth, create flows)
components/      # UI by feature (dashboard, lists, login, annonceur, details, shared)
services/        # API wrappers (auth, clients, distributeurs, produit, boisson, stats, reclamations, …)
config/          # API URL, role → page access map
context/         # AuthProvider (scaffold for future global auth state)
utils/           # accessControl helpers
middleware.js    # Edge redirects for login/dashboard/createAgent
```

---

## Security notes for production

- Prefer **environment variables** for the API base URL instead of hardcoding.
- Ensure the **JWT** from login is attached to Axios requests server-side or client-side consistently (`httpService.setJwt` exists but must be called where appropriate).
- Review the **profile** update flow: do not send placeholder passwords from the client; let the API handle password changes securely.

---

## License

Private project (`"private": true` in `package.json`). Add a license file if you intend to open-source it.
