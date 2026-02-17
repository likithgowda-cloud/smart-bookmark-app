#!/bin/bash

# Smart Bookmark App - Quick Commands Reference

# ============================================
# LOCAL DEVELOPMENT
# ============================================

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build locally
npm run build && npm run start

# ============================================
# GIT & DEPLOYMENT
# ============================================

# Initialize git repo
git init
git add .
git commit -m "Initial commit: Smart Bookmark App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-bookmark-app.git
git push -u origin main

# Make changes and push
git add .
git commit -m "Your commit message"
git push

# ============================================
# ENVIRONMENT SETUP
# ============================================

# Step 1: Create .env.local from template
cp .env.example .env.local

# Then edit .env.local and add:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# ============================================
# SUPABASE SETUP
# ============================================

# 1. Create project at https://supabase.com
# 2. Get API credentials from Settings > API
# 3. Run SQL migrations:
#    - Go to SQL Editor
#    - Paste content from: supabase/migrations/001_create_bookmarks.sql
#    - Click Run
# 4. Configure Google OAuth:
#    - Go to Authentication > Providers > Google
#    - Add Client ID and Client Secret
#    - Enable provider

# ============================================
# VERCEL DEPLOYMENT
# ============================================

# 1. Push to GitHub (see GIT & DEPLOYMENT above)
# 2. Go to https://vercel.com
# 3. Click "New Project"
# 4. Select GitHub repo
# 5. Add environment variables:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
# 6. Click "Deploy"

# After deployment:
# - Update Google OAuth redirect URI in Google Cloud Console
# - Update redirect URI in Supabase Authentication settings
# - Visit your-app.vercel.app to test

# ============================================
# TESTING
# ============================================

# Test local app
npm run dev
# Visit http://localhost:3000
# Click "Sign in with Google"
# Add a bookmark
# Verify it appears

# Test real-time sync
# Open app in 2 browser tabs
# Add bookmark in Tab A
# Verify it appears instantly in Tab B (no refresh needed)

# ============================================
# TROUBLESHOOTING
# ============================================

# Clear Next.js cache and rebuild
rm -r .next
npm run build

# Reinstall all dependencies
rm -r node_modules package-lock.json
npm install

# Check Node version (need 18+)
node --version

# View dev server logs
npm run dev
# Output: http://localhost:3000

# ============================================
# PROJECT STRUCTURE REFERENCE
# ============================================

# Key files:
# - src/app/page.tsx              → Home/login page
# - src/app/dashboard/page.tsx    → Main app
# - src/components/               → React components
# - src/contexts/                 → State management
# - src/utils/supabase/           → Supabase clients
# - supabase/migrations/          → Database schema
# - .env.local                    → Environment variables (local only)
# - .env.example                  → Template for env vars
# - README.md                     → User guide
# - DEPLOYMENT_GUIDE.md           → Detailed setup instructions

# ============================================
# PRODUCTION CHECKLIST
# ============================================

# Before deploying:
# ✓ Test locally: npm run dev
# ✓ Can sign in with Google
# ✓ Can add bookmarks
# ✓ Can delete bookmarks
# ✓ Real-time sync works
# ✓ Build succeeds: npm run build
# ✓ Push to GitHub
# ✓ Deploy to Vercel
# ✓ Test live app at vercel URL
# ✓ Update Google OAuth redirect URI
# ✓ Update Supabase redirect URI

echo "Smart Bookmark App - Quick Reference"
echo "For detailed instructions, see README.md and DEPLOYMENT_GUIDE.md"
