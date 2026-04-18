# T2VR Creative Solution — Website

A professional Next.js website with MongoDB backend and email integration.

---

## 🚀 Quick Setup Guide

### Prerequisites
- Node.js 18+ installed → https://nodejs.org
- A free MongoDB Atlas account → https://cloud.mongodb.com
- A Gmail account (for sending emails)

---

### Step 1 — Install Dependencies

Open Terminal / Command Prompt in this folder and run:

```bash
npm install
```

---

### Step 2 — Configure Environment Variables

1. Copy `.env.local.example` and rename it to `.env.local`
2. Fill in your details:

**MongoDB Setup:**
- Go to https://cloud.mongodb.com → Create free cluster
- Create a database user (username + password)
- Get the connection string and paste it as `MONGODB_URI`

**Gmail Email Setup:**
- Enable 2-Step Verification on your Google account
- Go to: Google Account → Security → App Passwords
- Create an App Password for "Mail"
- Paste that password as `EMAIL_PASS`

---

### Step 3 — Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

### Step 4 — Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
t2vr-website/
├── app/
│   ├── layout.js          — Root layout, metadata, fonts
│   ├── page.js            — Home page (assembles all sections)
│   ├── globals.css        — All custom styles & animations
│   └── api/
│       └── contact/
│           └── route.js   — Form API: saves to MongoDB + sends emails
├── components/
│   ├── Navbar.jsx         — Sticky navigation with mobile menu
│   ├── Hero.jsx           — Hero with particles + image slideshow
│   ├── Stats.jsx          — Animated counter stats
│   ├── Services.jsx       — Service cards
│   ├── About.jsx          — About section with timeline
│   ├── WhyUs.jsx          — Why choose us features
│   ├── TechStack.jsx      — Scrolling tech stack marquee
│   ├── ContactForm.jsx    — Enquiry form with validation
│   └── Footer.jsx         — Footer with links
├── lib/
│   └── mongodb.js         — MongoDB connection utility
├── models/
│   └── Enquiry.js         — Mongoose schema for enquiries
├── .env.local.example     — Environment variable template
└── package.json
```

---

## 📧 How Emails Work

When a visitor submits the enquiry form:

1. **Admin Email** — You receive a detailed notification with all enquiry details
2. **Client Email** — The visitor receives a professional auto-reply with their reference ID

Both emails are HTML-formatted with your brand colors.

---

## 🌐 Deployment (Vercel — Free)

1. Push this project to GitHub
2. Go to https://vercel.com → Import your repository
3. Add environment variables in Vercel Dashboard
4. Deploy — your site will be live!

---

## ✏️ Customization

- **Phone Number**: Update in `ContactForm.jsx` and `Footer.jsx`
- **Social Links**: Update URLs in `Footer.jsx`
- **Company Info**: Update throughout components
- **Colors**: Edit CSS variables in `globals.css` (`:root` section)
- **Services**: Add/remove in `Services.jsx` services array

---

© 2024 T2VR Creative Solution. All rights reserved.
