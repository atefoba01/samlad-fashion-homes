# GitHub Push Setup - IMPORTANT SECURITY NOTES

## ⚠️ IMPORTANT: Environment Variables & Security

Your `.env` file contains sensitive Supabase credentials:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These ARE in your `.gitignore` file, so they will NOT be committed to GitHub. This is correct and secure!

---

## Step 1: Push Code to GitHub

To push to GitHub, you need to authenticate. Choose ONE method:

### Option A: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Samlad Fashion Homes"
4. Select scopes:
   - ✅ repo (full control)
   - ✅ workflow (if using GitHub Actions)
5. Click "Generate token"
6. Copy the token (save it somewhere safe!)

**Then run this command:**
```bash
git push -u origin main
```

When prompted for password, paste your token instead.

---

### Option B: SSH Key (More Secure)

If you already have SSH set up on GitHub, just run:
```bash
git remote set-url origin git@github.com:atefoba01/samlad-fashion-homes.git
git push -u origin main
```

---

### Option C: GitHub CLI (Easiest)

```bash
# Install GitHub CLI from: https://cli.github.com
gh auth login
# Follow the prompts
git push -u origin main
```

---

## Step 2: Add Environment Variables to Vercel

**CRITICAL:** Your `.env` file is NOT in GitHub (it's in .gitignore). 
You must add the variables to Vercel manually:

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to Settings → Environment Variables
4. Add these variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://mhkwzxoamdaisjxzrjnn.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oa3d6eG9hbWRhaXNqeHpyam5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDY0ODIsImV4cCI6MjA5NjEyMjQ4Mn0.IAPjvigEL9N_Q-pIWWYJ2qP3CTXrCz-v62P8csQncps` |

5. Click "Save"
6. Vercel will automatically redeploy with the new variables

---

## Step 3: Your VS Code Setup

After pushing to GitHub:

```bash
# Clone your repo
git clone https://github.com/atefoba01/samlad-fashion-homes.git
cd samlad-fashion-homes

# Create .env file locally (this stays on your computer, not in Git)
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://mhkwzxoamdaisjxzrjnn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oa3d6eG9hbWRhaXNqeHpyam5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDY0ODIsImV4cCI6MjA5NjEyMjQ4Mn0.IAPjvigEL9N_Q-pIWWYJ2qP3CTXrCz-v62P8csQncps
EOF

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

---

## Step 4: Deploy to Vercel

### Method 1: GitHub Integration (Recommended - Auto-Deploy!)

1. Go to https://vercel.com/new
2. Click "Import from GitHub"
3. Select: `atefoba01/samlad-fashion-homes`
4. Click "Import"
5. Add environment variables (see Step 2)
6. Click "Deploy"
7. Wait 2-3 minutes
8. Your app is live!

**Bonus:** Every time you push to GitHub, Vercel auto-deploys!

---

### Method 2: Manual Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project folder
vercel
# Follow the prompts
```

---

## Security Checklist

✅ `.env` file is in `.gitignore` (won't upload to GitHub)
✅ Credentials only in Vercel dashboard (secure)
✅ Personal access token not shared anywhere
✅ GitHub repo can be public (credentials safe)
✅ Each deploy gets fresh env variables from Vercel

---

## After Everything is Set Up

### Your Workflow:
```bash
# 1. Make changes locally
# (your .env stays on your computer)

# 2. Test
npm run dev

# 3. Commit and push
git add .
git commit -m "New feature"
git push

# 4. Vercel auto-deploys (2-3 minutes)
# Your live app updates automatically!
```

---

## Your Live URLs

After deployment:
- **GitHub:** https://github.com/atefoba01/samlad-fashion-homes
- **Vercel:** https://samlad-fashion-homes.vercel.app (or your custom domain)

---

## Important Reminders

DO:
✅ Keep `.env` file local only
✅ Add secrets to Vercel dashboard
✅ Use strong personal access tokens
✅ Regularly push code to GitHub

DON'T:
❌ Commit `.env` to GitHub
❌ Share personal access tokens
❌ Paste credentials in code
❌ Make credentials public

---

## Questions?

- GitHub auth issues? See: https://docs.github.com/en/authentication
- Vercel setup? See: https://vercel.com/docs
- Lost your .env? Check your local project folder
- Vercel won't build? Check Environment Variables in dashboard

---

## Your Project is Ready!

Everything is set up. Just push to GitHub with your credentials, add them to Vercel, and you're live!
