<p align="center">
  <h1 align="center">⚡ SnapURL</h1>
  <p align="center">A fast, minimal URL shortener with click analytics</p>
  <p align="center">
    <a href="https://snap-url-iota.vercel.app">🌐 Live Demo</a> •
    <a href="https://snapurl-f71p.onrender.com">🔧 API</a> •
    <a href="https://github.com/bhumikagupta17/SnapURL">📁 GitHub</a>
  </p>
</p>

---

![SnapURL Preview](https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-Vite-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=for-the-badge&logo=mongodb)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-Deployed-46e3b7?style=for-the-badge&logo=render)

---

## 🔗 Live Links

| Service | URL |
|---------|-----|
| 🌐 Frontend | [snap-url-iota.vercel.app](https://snap-url-iota.vercel.app) |
| 🔧 Backend API | [snapurl-f71p.onrender.com](https://snapurl-f71p.onrender.com) |

---

## ✨ Features

- 🔗 Shorten any long URL instantly
- 🎯 Auto-generated 5-character short codes (e.g. `xK9mP`)
- 📊 Click-count analytics per link
- 🔁 Instant redirect on short URL visit
- 🎨 Modern dark UI with purple gradient accents

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
SnapURL/
├── src/               # React frontend
│   └── App.jsx
├── server/            # Express backend
│   ├── models/
│   │   └── Url.js     # Mongoose schema
│   ├── routes/
│   │   └── url.js     # API routes
│   └── index.js       # Server entry point
└── README.md
```

---

## 🌐 API Reference

Base URL: `https://snapurl-f71p.onrender.com`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/shorten` | Shorten a URL |
| `GET` | `/:shortCode` | Redirect to original URL |
| `GET` | `/api/analytics/:shortCode` | Get click count |

### Shorten a URL

```bash
curl -X POST https://snapurl-f71p.onrender.com/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://www.github.com"}'
```

**Response:**
```json
{
  "shortCode": "xK9mP",
  "shortUrl": "https://snapurl-f71p.onrender.com/xK9mP"
}
```

### Get Analytics

```bash
curl https://snapurl-f71p.onrender.com/api/analytics/xK9mP
```

**Response:**
```json
{
  "originalUrl": "https://www.github.com",
  "shortCode": "xK9mP",
  "clicks": 42
}
```

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |

> ⚠️ Never commit your `.env` file — it's in `.gitignore`.

---

## 👩‍💻 Author

**Bhumika Gupta** — [@bhumikagupta17](https://github.com/bhumikagupta17)

---

## 📄 License

MIT License — feel free to use and build on this project.