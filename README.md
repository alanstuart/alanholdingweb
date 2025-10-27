# Alan Holding Digital Solutions Website

Professional web development and AI chatbot services website built with React, TypeScript, and Supabase.

🌐 **Live Site:** [alanholding.co.uk](https://alanholding.co.uk)

---

## 🚨 Website Appears Blank? Start Here!

If your deployed website shows a blank page:

1. **Quick Fix:** Read [`QUICK-FIX.md`](./QUICK-FIX.md) (2 minutes)
2. **Full Diagnosis:** Read [`DIAGNOSIS-SUMMARY.md`](./DIAGNOSIS-SUMMARY.md) (5 minutes)
3. **Complete Guide:** Read [`DEPLOYMENT.md`](./DEPLOYMENT.md) (10 minutes)
4. **Visual Guide:** Read [`TROUBLESHOOTING-FLOWCHART.md`](./TROUBLESHOOTING-FLOWCHART.md)

**Most Common Issue:** Missing environment variables on hosting platform!

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd alanholdingweb

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your Supabase credentials
# (See "Environment Variables" section below)

# Start development server
npm run dev
```

Visit: http://localhost:5173

---

## 📁 Project Structure

```
project/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── context/         # React context providers
│   ├── services/        # API service layer
│   ├── lib/             # Supabase client & utilities
│   ├── types/           # TypeScript type definitions
│   ├── translations/    # Multi-language support
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── dist/                # Production build output
├── supabase/
│   └── migrations/      # Database migrations
├── DEPLOYMENT.md        # Deployment guide
├── QUICK-FIX.md         # Emergency troubleshooting
├── DIAGNOSIS-SUMMARY.md # Issue diagnosis & resolution
└── verify-deployment.sh # Pre-deployment checks
```

---

## 🔧 Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Where to find these:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy "Project URL" and "anon public" key

**Important:**
- Never commit `.env` to git (already in `.gitignore`)
- Use `.env.example` for documentation
- See `DEPLOYMENT.md` for hosting platform setup

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:5173)

# Production
npm run build            # Build for production
npm run preview          # Preview production build locally

# Quality
npm run lint             # Run ESLint

# Deployment
./verify-deployment.sh   # Check if ready to deploy
```

---

## 🌟 Features

- **Modern React Architecture:** Built with React 18, TypeScript, and Vite
- **Responsive Design:** Mobile-first, works on all devices
- **Multi-language Support:** English, Spanish, Turkish
- **Dark/Light Mode:** Theme toggle with persistence
- **Blog System:** Dynamic blog with Supabase backend
- **AI Chatbot Integration:** ElevenLabs conversational AI
- **Appointment Booking:** Integrated Cal.com calendar
- **Particle Effects:** Beautiful animated backgrounds
- **SEO Optimized:** Meta tags, semantic HTML
- **Fast Loading:** Optimized bundles, code splitting ready

---

## 🎨 Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite 5.4** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM 7.8** - Routing
- **Lucide React** - Icons

### Backend & Services
- **Supabase** - Database & authentication
- **ElevenLabs** - AI voice chatbot
- **Cal.com** - Appointment scheduling

### Deployment
- **Netlify/Vercel** - Hosting (recommended)
- **GitHub Pages** - Not recommended (no env var support)

---

## 🚢 Deployment

### Before Deploying

1. **Run verification script:**
   ```bash
   ./verify-deployment.sh
   ```

2. **Test production build locally:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Check documentation:**
   - Read `DEPLOYMENT.md` for platform-specific instructions
   - Ensure environment variables are ready

### Netlify (Recommended)

1. Connect your GitHub repository
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables:** Add from `.env`
4. Deploy!

Full instructions: [`DEPLOYMENT.md`](./DEPLOYMENT.md)

### Vercel

1. Import your GitHub repository
2. **Build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Environment variables:** Add from `.env`
4. Deploy!

Full instructions: [`DEPLOYMENT.md`](./DEPLOYMENT.md)

---

## 🐛 Troubleshooting

### Website is blank after deployment

**Quick Check:**
```bash
# 1. Check if environment variables are set on hosting platform
# 2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
# 3. Check browser console for errors (F12)
```

**Documentation:**
- [`QUICK-FIX.md`](./QUICK-FIX.md) - Emergency fixes
- [`DIAGNOSIS-SUMMARY.md`](./DIAGNOSIS-SUMMARY.md) - Root cause analysis
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Complete deployment guide
- [`TROUBLESHOOTING-FLOWCHART.md`](./TROUBLESHOOTING-FLOWCHART.md) - Visual guide

### Common Issues

**1. Missing Environment Variables**
```
Error: Missing Supabase environment variables
Fix: Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to hosting platform
```

**2. Routes Show 404**
```
Error: Direct URLs like /blog return 404
Fix: Ensure _redirects file is in dist folder (should be automatic)
```

**3. Build Fails**
```
Error: Build command fails
Fix: Delete node_modules and dist, then npm install && npm run build
```

---

## 🔐 Security

- Environment variables are not committed to git
- Supabase Row Level Security (RLS) enabled
- Client-side keys are safe to expose
- Never expose service role keys

---

## 📊 Performance

- **Bundle Size:** ~640 KB (177 KB gzipped)
- **Load Time:** < 2 seconds
- **Lighthouse Score:** 90+
- **Mobile Friendly:** Yes
- **PWA Ready:** No (can be added)

---

## 🤝 Contributing

This is a private project, but if you have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

All rights reserved. This is a proprietary website for Alan Holding Digital Solutions.

---

## 📞 Support

**Website Issues?**
1. Check [`QUICK-FIX.md`](./QUICK-FIX.md)
2. Run `./verify-deployment.sh`
3. Review browser console (F12)
4. Check [`DEPLOYMENT.md`](./DEPLOYMENT.md)

**Need Professional Services?**
- Website: [alanholding.co.uk](https://alanholding.co.uk)
- Email: Contact via website form
- Services: Web development, AI chatbots, custom solutions

---

## 🎯 Deployment Checklist

Before going live:

- [ ] Environment variables configured on hosting platform
- [ ] Build command set to: `npm run build`
- [ ] Publish directory set to: `dist`
- [ ] Domain configured (alanholding.co.uk)
- [ ] SSL certificate active (HTTPS)
- [ ] Ran `./verify-deployment.sh` successfully
- [ ] Tested production build locally
- [ ] Checked all routes work
- [ ] Verified mobile responsiveness
- [ ] Browser console shows no errors
- [ ] Database connectivity works
- [ ] Forms submit correctly
- [ ] Booking system functional

---

## 📚 Documentation Index

- **README.md** (this file) - Project overview & quick start
- **DEPLOYMENT.md** - Complete deployment guide
- **QUICK-FIX.md** - Emergency troubleshooting (2 min)
- **DIAGNOSIS-SUMMARY.md** - Issue analysis & resolution (5 min)
- **TROUBLESHOOTING-FLOWCHART.md** - Visual diagnostic guide
- **.env.example** - Environment variable template
- **verify-deployment.sh** - Automated pre-deployment checks

---

**Built with ❤️ by Alan Holding Digital Solutions**
