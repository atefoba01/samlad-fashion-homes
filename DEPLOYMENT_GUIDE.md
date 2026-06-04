# Samlad Fashion Homes - Complete Setup Guide

## Quick Start Options

You have THREE ways to deploy this app:

---

## Option 1: Vercel (Recommended - Easiest)

### Step 1: Connect GitHub
1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import Git Repository
4. Select your GitHub repo
5. Vercel will auto-detect Next.js/Vite setup

### Step 2: Add Environment Variables
In Vercel Project Settings → Environment Variables, add:
```
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

### Step 3: Deploy
Click "Deploy" - that's it! Your app is live with automatic GitHub syncing.

**Benefits:**
- ✅ Free tier available
- ✅ Automatic deployments on every push
- ✅ Zero config needed
- ✅ Database automatically connected
- ✅ Global CDN included

---

## Option 2: Netlify

### Step 1: Connect GitHub
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → Import existing project
3. Select GitHub repo

### Step 2: Build Settings
- Build command: `npm run build`
- Publish directory: `dist`

### Step 3: Environment Variables
Add in Site settings → Environment:
```
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

**Benefits:**
- ✅ Very similar to Vercel
- ✅ Free with generous limits
- ✅ Good performance

---

## Option 3: GitHub Pages (Free but Limited)

### Prerequisites
- Create `vite.config.ts` with: `base: '/samlad-fashion/'`

### Step 1: Update Config
```typescript
export default {
  base: process.env.NODE_ENV === 'production' ? '/samlad-fashion/' : '/',
  // ... rest of config
}
```

### Step 2: Push to GitHub
Create `.github/workflows/deploy.yml` (already created)

### Step 3: Enable GitHub Pages
Go to Settings → Pages → Deploy from `gh-pages` branch

**Benefits:**
- ✅ Completely free
- ✅ No external services
- **Limitations:**
- ❌ Static sites only
- ❌ Database calls might have issues with CORS

---

## Database Setup (Supabase)

The database is **already created** and contains:
- 12 color palettes
- 9 gallery posts
- 5 reviews
- Contact form table
- User saved palettes table

### Your Supabase Credentials
Find these in Supabase Dashboard → Settings → API:

```
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

**These are the ONLY credentials you need to add to GitHub/deployment!**

---

## Step-by-Step: Push to GitHub + Deploy to Vercel

### 1. Initialize GitHub Repository
```bash
cd /path/to/project
git init
git add .
git commit -m "Initial commit: Samlad Fashion Homes app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/samlad-fashion.git
git push -u origin main
```

### 2. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub

### 3. Import Project
- Click "New Project"
- Select your GitHub repo
- Click "Import"

### 4. Add Environment Variables
- In Project Settings → Environment Variables
- Add: `VITE_SUPABASE_URL`
- Add: `VITE_SUPABASE_ANON_KEY`
- Click "Save"

### 5. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your app is live! ✅

---

## What's Included in the Project

### Frontend
- ✅ 13 React pages (Landing, Home, Gallery, About, Contact, etc.)
- ✅ Responsive design (mobile-first)
- ✅ Color picker with AI matching
- ✅ Fabric upload with color extraction
- ✅ Gallery with 9 portfolio items
- ✅ Reviews slider
- ✅ WhatsApp integration

### Database (Supabase)
- ✅ 5 tables with complete schema
- ✅ 12 sample palettes
- ✅ 9 gallery posts
- ✅ 5 reviews
- ✅ Row-level security (RLS)
- ✅ Contact form submissions

### Deployment Files
- ✅ `.env` template
- ✅ `.github/workflows/deploy.yml` (for auto-deploy)
- ✅ `package.json` with all dependencies
- ✅ TypeScript config
- ✅ Tailwind CSS setup

---

## File Structure
```
samlad-fashion/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── data/              # Sample data
│   ├── lib/               # Utilities (Supabase, colors)
│   ├── context/           # React Context (AppProvider)
│   └── types/             # TypeScript types
├── supabase/
│   └── migrations/        # Database schemas
├── .github/
│   └── workflows/         # GitHub Actions
├── .env                   # Environment variables
├── package.json           # Dependencies
├── vite.config.ts         # Vite config
└── tailwind.config.js     # Tailwind config
```

---

## Environment Variables Explained

### Local Development (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Deployment (Vercel/Netlify)
Same variables added in dashboard (never commit secrets!)

---

## Common Questions

**Q: Will my database work on GitHub/Vercel?**
A: Yes! Your database is on Supabase (separate service). As long as you add the env variables, everything works.

**Q: Do I need to pay for anything?**
A: 
- Vercel: Free tier available ($0)
- Supabase: Free tier (500MB database, 2GB bandwidth)
- Total: FREE for small-medium projects

**Q: Can I update content without redeploying?**
A: Yes! Update palettes/gallery in Supabase dashboard, changes appear instantly.

**Q: How do I add new palettes/gallery posts?**
A: 
1. Go to Supabase dashboard
2. Navigate to "palettes" or "gallery_posts" table
3. Click "Insert" and add data
4. Refresh your app - new content appears!

**Q: Can I edit the WhatsApp number in the future?**
A: Yes, just edit the `.tsx` files and push to GitHub. Vercel auto-deploys on push.

---

## Next Steps

1. ✅ Create GitHub account (if you don't have one)
2. ✅ Create Vercel account (free)
3. ✅ Push project to GitHub
4. ✅ Import into Vercel
5. ✅ Add Supabase env variables
6. ✅ Deploy!

Your app will be live in ~5 minutes! 🚀

---

## Support

For issues or questions:
- **Supabase Database**: [supabase.com/docs](https://supabase.com/docs)
- **Vercel Deployment**: [vercel.com/docs](https://vercel.com/docs)
- **Your App Code**: All files are in `/src`

---

## Need a ZIP File?

If you need everything as a ZIP (including all files, no node_modules):

Run this command in your project directory:
```bash
zip -r samlad-fashion-complete.zip . -x "node_modules/*" ".git/*" "dist/*"
```

This creates a ZIP with:
- ✅ All source code
- ✅ Config files
- ✅ Database schema (migrations)
- ✅ GitHub Actions workflow
- ✅ Everything except node_modules (you run `npm install` after)

---

## You're All Set! 🎉

Your complete app is ready. Choose your deployment method and go live!
