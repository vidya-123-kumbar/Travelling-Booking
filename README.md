# TravelGo - Premium Outstation & Airport Cab Booking Platform

A full-stack travel and cab booking platform built with **React 19**, **Tailwind CSS v4**, **Express 5**, and **SQLite (better-sqlite3)**.

---

## 🚀 Features

- **Multi-Service Booking Engine**:
  - Outstation Round Trips & One-Way Cabs
  - Local Hourly Rentals
  - Airport Transfers (Pickups & Drop-offs)
  - Corporate Business Travels
  - Curated Holiday Tour Packages
- **Real-Time Fare Estimator**: Dynamic pricing based on distance, vehicle tier, driver allowances, and tolls.
- **Fleet Showcase**: Comprehensive vehicle catalog (Sedan, Luxury SUV, Premium Electric, Tempo Travellers, Mercedes Benz).
- **Interactive Booking Checkout**: Multi-step booking flow with passenger selection, GST invoices, and coupon discounts.
- **REST Backend & SQLite Storage**:
  - Express backend running with WAL-mode SQLite database.
  - Endpoints for booking creation, status management, and customer lead inquiries.
- **Modern Responsive Design**: Glassmorphic UI with smooth micro-interactions, dark/light contrast, and mobile optimization.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express 5, CORS, Dotenv
- **Database**: SQLite (`better-sqlite3`) with WAL journal mode
- **Tooling**: TypeScript, Oxlint, Concurrently

---

## 🏁 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development
Runs both the Express API server (`http://localhost:5000`) and the Vite frontend dev server (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

### 3. Build for Production
Compiles TypeScript and creates optimized bundles in `dist/`:
```bash
npm run build
```

---

## 📁 Project Architecture

```
Travelling Booking/
├── public/                 # Static assets & logos
├── server/
│   ├── data/               # SQLite database directory (auto-created)
│   ├── db.js               # SQLite connection, schema, seed data, & queries
│   └── index.js            # Express REST API routes & server setup
├── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/              # App views (HomePage, BookPage, ContactPage, etc.)
│   ├── App.tsx             # App layout & routing
│   └── main.tsx            # Vite React entry point
├── package.json
└── vite.config.ts          # Vite configuration with /api proxy to Express
```
