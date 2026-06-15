# 🔭 CosmosBoard — NASA Space Intelligence Dashboard

A real-time space data dashboard powered by NASA's free Open APIs. Track near-Earth asteroids, view daily astronomy photography, monitor live natural events on Earth, and explore space data — all in one beautiful dark-themed dashboard.

---

## 🚀 Live Demo

> Deploy to Vercel in under 5 minutes — see setup below.

---

## ✨ Features

### 🌌 Overview Tab
- **6 Live KPI Cards** — total asteroids this week, hazardous count, safe flybys, active Earth events, fastest asteroid speed, largest asteroid size
- **Today's NASA Astronomy Picture** — full image with scientific explanation
- **Asteroids Per Day** — stacked bar chart (safe vs hazardous)
- **Hazard Distribution** — donut chart
- **Earth Events by Type** — horizontal bar chart (wildfires, storms, volcanoes)
- **Top 10 Fastest Asteroids** — velocity bar chart
- **Top 10 Largest Asteroids** — size comparison bar chart

### ☄️ Asteroids Tab
- **Bubble Chart** — miss distance vs velocity (red = hazardous, size = diameter)
- **Area Chart** — daily asteroid trend (safe vs hazardous over 7 days)
- **Full Data Table** — all near-Earth objects with size, distance, speed, lunar distance, and hazard status

### 📸 Space Gallery Tab
- **7-Day APOD Grid** — clickable thumbnails for each day's astronomy picture
- **Lightbox Viewer** — full-screen HD image with explanation
- **Media Type Donut** — images vs videos breakdown
- **Weekly Title List** — all 7 APOD entries at a glance

### 🌪️ Earth Events Tab
- **Live EONET Feed** — active natural events from NASA's Earth Observatory
- **Events Donut Chart** — by category (wildfires, storms, floods, volcanoes)
- **Events Bar Chart** — volume per event type
- **Live Event Feed** — scrollable list with category, name, and date

---

## 📊 Chart Types Used

| Chart | Tab | Data Source |
|---|---|---|
| Stacked Bar | Overview | Asteroids per day |
| Donut | Overview | Hazardous vs safe |
| Horizontal Bar | Overview | Earth events by type |
| Bar Chart | Overview | Fastest / largest asteroids |
| Bubble Chart | Asteroids | Distance vs velocity |
| Area Chart | Asteroids | Daily trend |
| Donut | Gallery | Media type breakdown |
| Donut | Events | Events by category |
| Bar Chart | Events | Event volume |

---

## 🛠️ Tech Stack

- **Frontend** — Vanilla HTML, CSS, JavaScript (no framework)
- **Charts** — Chart.js v4
- **Backend** — Vercel Serverless Functions (Node.js)
- **APIs** — NASA Open APIs (APOD, NeoWs, EONET)
- **Deployment** — Vercel

---

## 📁 Project Structure

```
cosmosboard/
├── index.html          ← Full dashboard frontend
├── api/
│   └── nasa.js         ← Serverless proxy for NASA APIs
├── vercel.json         ← Vercel routing config
├── package.json        ← Node version config
└── README.md
```

---

## ⚡ Quick Deploy to Vercel

### Step 1 — Get a NASA API Key (free, instant)

1. Go to [api.nasa.gov](https://api.nasa.gov)
2. Fill in your name and email
3. Click **Sign Up** — key arrives in your email immediately
4. Free tier: **1,000 requests/hour**

> **Note:** The app works without a key using `DEMO_KEY` (30 req/hour limit) — perfect for demos.

### Step 2 — Push to GitHub

```bash
# Unzip the project
unzip cosmosboard.zip

# Create a new GitHub repo and push
cd cosmosboard
git init
git add .
git commit -m "Initial commit — CosmosBoard"
git remote add origin https://github.com/YOUR_USERNAME/cosmosboard.git
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your `cosmosboard` GitHub repo
3. Click **Deploy** (no build settings needed)
4. Go to **Settings → Environment Variables**
5. Add: `NASA_API_KEY` = your key from api.nasa.gov
6. Redeploy → Done ✅

**Your live URL:** `cosmosboard.vercel.app`

---

## 🔌 NASA APIs Used

| API | Endpoint | Data |
|---|---|---|
| APOD | `/planetary/apod` | Astronomy Picture of the Day |
| NeoWs | `/neo/rest/v1/feed` | Near-Earth asteroid data |
| EONET | `eonet.gsfc.nasa.gov/api/v3/events` | Active natural events |

All APIs are **free** and **publicly accessible**. No credit card required.

---

## 🔧 Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
cd cosmosboard
vercel dev

# Open in browser
http://localhost:3000
```

---

## 🌐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NASA_API_KEY` | Optional | NASA API key from api.nasa.gov. Falls back to `DEMO_KEY` if not set. |

---

## 📱 Screenshots

| Tab | Description |
|---|---|
| Overview | KPIs, APOD image, asteroid charts, Earth events |
| Asteroids | Bubble chart, area chart, full data table |
| Space Gallery | 7-day photo grid, lightbox, APOD details |
| Earth Events | EONET live feed, category charts |

---

## 🙌 Built By

**Srinivas Malempati**
QA Manager → AI Builder | 17+ years in quality engineering

- 🌐 Portfolio: [srinivas-malempati.github.io](https://srinivas-malempati.github.io)
- 💼 LinkedIn: [linkedin.com/in/srinivas-malempati](https://linkedin.com/in/srinivas-malempati)
- 🐙 GitHub: [github.com/srinivas-malempati](https://github.com/srinivas-malempati)

---

## 📄 License

MIT License — free to use, modify, and deploy.

---

*Powered by [NASA Open APIs](https://api.nasa.gov) · Built with ❤️ and Chart.js*
