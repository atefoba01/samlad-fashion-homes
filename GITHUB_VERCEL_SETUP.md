# GitHub + Vercel Complete Setup Guide

## Your 3 Options (Pick One)

### ⚡ OPTION 1: Vercel (Easiest - Recommended) ⚡

Complete setup in 10 minutes, automatic GitHub syncing, FREE tier available.

#### Prerequisites
- GitHub account (create at github.com if needed)
- Vercel account (create at vercel.com - free)

#### Step-by-Step

**1. Push to GitHub**

```bash
# Navigate to your project folder
cd /path/to/samlad-fashion

# Initialize git
git init
git add .
git commit -m "Initial commit: Samlad Fashion Homes app"
git branch -M main

# Create new repository on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/samlad-fashion-homes.git
git push -u origin main
```

**2. Create Vercel Account**
- Go to https://vercel.com
- Click "Sign Up"
- Select "GitHub" to connect your account
- Authorize Vercel to access GitHub

**3. Import Your Project**
- In Vercel dashboard, click "New Project"
- Select your `samlad-fashion-homes` repository
- Vercel auto-detects the build settings
- Click "Continue"

**4. Add Environment Variables**
- In the "Environment Variables" section, add:
  
  | Name | Value |
  |------|-------|
  | `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` |
  | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Where to find these values:**
1. Log into https://app.supabase.com
2. Select your project
3. Go to Settings (bottom left) → API
4. Copy "Project URL" and "Anon public key"

**5. Deploy!**
- Click "Deploy"
- Wait 2-3 minutes
- Your app is live! ✅

**6. Every Future Update**
- Make changes locally
- Run `git add . && git commit -m "Update message"`
- Run `git push`
- Vercel automatically rebuilds and deploys!

**Your live URL:** https://samlad-fashion-homes.vercel.app (or custom domain)

---

### 🎁 OPTION 2: Netlify (Also Easy)

Similar to Vercel, very user-friendly.

#### Step-by-Step

**1. Push to GitHub** (Same as above)

**2. Connect to Netlify**
- Go to https://netlify.com
- Click "New site from Git"
- Select GitHub and authorize
- Choose your repository

**3. Configure Build**
- Build command: `npm run build`
- Publish directory: `dist`
- Click "Deploy site"

**4. Add Environment Variables**
- In Netlify dashboard: Site settings → Build & deploy → Environment
- Add same Supabase variables

**5. Done!**
- Your site is live at `https://your-site-name.netlify.app`
- Updates auto-deploy on every GitHub push

---

### 📦 OPTION 3: Download ZIP + Manual Setup

For when you want everything local or can't use GitHub yet.

#### Create ZIP File

```bash
# In your project directory:
zip -r samlad-fashion-complete.zip . \
  -x "node_modules/*" ".git/*" "dist/*" ".env"
```

This creates `samlad-fashion-complete.zip` containing:
- ✅ All source code
- ✅ Database migrations
- ✅ Config files
- ✅ GitHub Actions workflow
- ✅ Everything needed (except node_modules)

#### To Use the ZIP

1. **Extract it**
   - Download the ZIP
   - Extract to your desired location

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Test locally**
   ```bash
   npm run dev
   # Visit http://localhost:5173
   ```

5. **When ready to deploy**
   - Initialize git: `git init`
   - Create GitHub repo
   - Push code
   - Connect to Vercel/Netlify (see Options 1 & 2)

---

## Getting Your Supabase Credentials

**IMPORTANT:** You need these for both GitHub and deployment!

1. Go to https://app.supabase.com
2. Select your project
3. Click "Settings" (⚙️ bottom left)
4. Click "API"
5. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon public** → `VITE_SUPABASE_ANON_KEY`

**Keep these safe!** They're like your database keys.

---

## Database Access After Deployment

Your database works automatically! After deploying:

### Add New Palettes
1. Visit Supabase dashboard
2. Click your project
3. Table: `palettes`
4. Click "Insert" → Add new palette
5. Changes appear instantly on your live app

### View Contact Submissions
1. Supabase dashboard
2. Table: `contact_submissions`
3. See all messages sent via contact form

### Manage Gallery
1. Table: `gallery_posts`
2. Add, edit, or delete portfolio items
3. Changes live immediately

---

## Local Testing Before Deployment

```bash
# 1. Install dependencies
npm install

# 2. Create .env with Supabase credentials

# 3. Run dev server
npm run dev

# 4. Open browser
# http://localhost:5173

# 5. Test features:
# - Color picker
# - Gallery page
# - Contact form (check Supabase)
# - WhatsApp links
```

---

## Monitoring Your Live App

### After Deployment, Check:

**Functionality**
- [ ] Home page loads
- [ ] Color picker works
- [ ] Gallery displays
- [ ] Contact form saves to database
- [ ] WhatsApp links work
- [ ] Mobile responsive

**Performance**
- [ ] Fast load time
- [ ] Images load quickly
- [ ] Smooth transitions

**Database**
- [ ] Palettes load
- [ ] Gallery posts appear
- [ ] Contact submissions saved

---

## Update Workflow (After Initial Deployment)

Want to make changes?

```bash
# 1. Edit files locally
# (e.g., change colors, add pages, update contact info)

# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to GitHub
git push

# 5. Vercel/Netlify auto-deploys!
# Your app updates within 2-3 minutes
```

---

## Troubleshooting

### "App won't deploy"
- Check logs in Vercel/Netlify dashboard
- Most common: Missing env variables
- Solution: Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

### "Database not connecting"
- Verify credentials copied correctly (no extra spaces)
- Check env variables in deployment platform
- Test locally first with `npm run dev`

### "Images not loading"
- Images hosted on Pexels (external service)
- Check internet connection
- Verify Pexels accessible in your region

### "WhatsApp links don't work"
- Should format as: `https://wa.me/2348142805347`
- Verify number in code is correct
- Test on desktop first, then mobile

### "Contact form not saving"
- Check Supabase database has `contact_submissions` table
- Verify database credentials are correct
- Check browser console for errors (F12)

---

## Security Best Practices

✅ **DO:**
- Keep `.env` file local (never commit to GitHub)
- Use environment variables for secrets
- Use Supabase's RLS policies (already configured)

❌ **DON'T:**
- Commit `.env` file to GitHub
- Share API keys publicly
- Expose service role key (only use anon key for frontend)

---

## Going Live Checklist

- [ ] GitHub account created
- [ ] Code pushed to GitHub
- [ ] Vercel/Netlify account created
- [ ] Project imported to Vercel/Netlify
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Live URL working
- [ ] Tested all pages
- [ ] Verified contact form works
- [ ] Checked database has data

---

## Your App URLs

**After Deployment:**
- **Vercel:** `https://samlad-fashion-homes.vercel.app`
- **Netlify:** `https://samlad-fashion-homes.netlify.app`
- **Custom Domain:** You can add your own domain

**Share with clients:**
- Send them your live URL
- They can browse, contact, save palettes

---

## Support & Documentation

**Official Docs:**
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- React Router: https://reactrouter.com
- Vite: https://vitejs.dev

**Your Project Files:**
- README.md - Overview
- DATABASE_SETUP.md - Database info
- DEPLOYMENT_GUIDE.md - Deployment details
- CONTACT_INFO_UPDATE.md - Recent changes

---

## You're Ready! 🚀

Pick Option 1 (Vercel), follow the steps, and you're live in ~10 minutes!

Questions? Check the troubleshooting section or review the detailed guides.

**Good luck! Your Samlad Fashion Homes app will be amazing!** ✨
