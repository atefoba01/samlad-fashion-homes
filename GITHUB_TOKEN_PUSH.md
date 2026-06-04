# 🚀 Push Your Code to GitHub - Step by Step

Your GitHub Personal Access Token has been generated!

## Your Token
```
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
```

## Important: Create Repository First!

Before you can push, you need to create the empty repository on GitHub:

1. Go to: https://github.com/new
2. Repository name: `samlad-fashion-homes`
3. Description: `Samlad Fashion Homes - Color Fashion Design Platform`
4. Choose: Public
5. Do NOT check "Initialize with README"
6. Click "Create repository"

Then follow the commands below (they should appear on GitHub after creating the repo).

---

## Push Your Code from Your Local Computer

After creating the repository on GitHub, open terminal/PowerShell and run these commands:

```bash
# Navigate to your project folder
cd /path/to/samlad-fashion-homes

# Initialize git (if not already done)
git init
git config user.email "atefoba01@github.com"
git config user.name "atefoba01"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Samlad Fashion Homes - Production ready"

# Rename branch to main
git branch -m main

# Add remote
git remote add origin https://github.com/atefoba01/samlad-fashion-homes.git

# Push to GitHub
git push -u origin main
```

**When prompted for credentials:**
- Username: `atefoba01`
- Password: `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`

---

## Alternative: Use Token in URL (No Prompts)

If you want to skip the password prompt, use this command instead:

```bash
git push -u https://atefoba01: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@github.com/atefoba01/samlad-fashion-homes.git main
```

---

## After Successful Push

Your code will be at:
```
https://github.com/atefoba01/samlad-fashion-homes
```

Then follow these steps:

### Step 2: Clone to Your Local Computer

```bash
git clone https://github.com/atefoba01/samlad-fashion-homes.git
cd samlad-fashion-homes
code .
```

### Step 3: Setup in VS Code

In VS Code terminal:

```bash
npm install

# Create .env file (File → New File)
# Add these credentials:
VITE_SUPABASE_URL=https://mhkwzxoamdaisjxzrjnn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oa3d6eG9hbWRhaXNqeHpyam5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDY0ODIsImV4cCI6MjA5NjEyMjQ4Mn0.IAPjvigEL9N_Q-pIWWYJ2qP3CTXrCz-v62P8csQncps

# Test locally
npm run dev
```

### Step 4: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `atefoba01/samlad-fashion-homes`
4. In "Environment Variables" add:
   - `VITE_SUPABASE_URL`: `https://mhkwzxoamdaisjxzrjnn.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oa3d6eG9hbWRhaXNqeHpyam5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDY0ODIsImV4cCI6MjA5NjEyMjQ4Mn0.IAPjvigEL9N_Q-pIWWYJ2qP3CTXrCz-v62P8csQncps`
5. Click "Deploy"

Your app will be live at: `https://samlad-fashion-homes.vercel.app`

---

## Security Reminder

Your token is valid for 30 days. After that, you'll need to generate a new one if needed.

Keep this token safe! If you lose it, generate a new one from:
https://github.com/settings/tokens

---

## Next Steps

1. Create the repository on GitHub: https://github.com/new
2. Push your code using the commands above
3. Clone to your local computer
4. Create .env file with credentials
5. Deploy to Vercel

You'll have a live app in about 20 minutes!
