# Paws and Coffee

A full-stack coffee shop menu web app with a shopping cart, checkout flow, and automated order-confirmation emails — built as a personal portfolio project.

🔗 **Live Demo:** https://coffee-shop-sable-three.vercel.app

---

## Features

- Browse a coffee menu with item details and pricing
- Add items to cart, adjust quantities, and remove items — managed globally via `CartContext`
- Full checkout flow from cart to order confirmation
- Backend powered by Supabase (PostgreSQL) with Row Level Security (RLS) to keep order data scoped and secure
- Automated order-confirmation emails triggered via an n8n workflow, connected to Supabase using `pg_net`
- Built with React + Vite for a fast dev experience and optimized production build
- Continuous deployment: every push to `master` auto-deploys to Vercel

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite |
| State Management | React Context API (`CartContext`) |
| Backend / Database | Supabase (PostgreSQL, Row Level Security) |
| Automation | n8n (workflow automation), `pg_net` (Postgres → HTTP webhook), ngrok (local tunnel for development) |
| Deployment | Vercel |
| IDE | Antigravity |

---

## How It Works

1. **Menu & Cart** — Menu items are rendered from Supabase data. Adding an item updates `CartContext`, which is available throughout the app so the cart badge/total stays in sync everywhere.
2. **Checkout** — On checkout, the order is written to Supabase. Row Level Security policies ensure each order/user can only access their own data.
3. **Order Confirmation Email** — A Postgres trigger uses `pg_net` to fire an HTTP request to an n8n webhook whenever a new order is inserted. The n8n workflow picks up the order details and sends a confirmation email automatically. During development, `ngrok` was used to expose the local n8n instance so Supabase could reach it.

---

## Project Structure

```
coffee_shop/
├── src/
│   ├── components/
│   │   └── CartPage.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── App.jsx
│   └── ...
├── .gitignore
├── .npmrc
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js installed
- A Supabase project (URL + anon key)
- (Optional, for email automation) An n8n instance and a way to expose it, e.g. ngrok

### Installation

```bash
git clone https://github.com/purple0613/coffee_shop.git
cd coffee_shop
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Note: these are read at build time by Vite, so they must also be added under **Vercel → Settings → Environment Variables** for the deployed site to work.

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Deployment Notes

- Deployed on **Vercel**, connected to the `master` branch of this repo for automatic deployments on every push.
- `node_modules` is excluded via `.gitignore` — Vercel installs dependencies fresh on each build.
- `esbuild`'s install script is explicitly approved via the `allowScripts` field in `package.json`, required by newer versions of npm's install-script security feature.

---

## Author

Built by [purple0613](https://github.com/purple0613)
