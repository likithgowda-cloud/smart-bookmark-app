# Smart Bookmark App - Complete Step-by-Step Tutorial

## Part 1: Create Supabase Project (Free)

### 1.1 Sign Up

- Go to https://supabase.com
- Click "Sign Up"
- Use email or GitHub account
- Verify email if needed

### 1.2 Create Project

- Click "New Project"
- Name: `smart-bookmarks` (or your choice)
- Database Password: Generate a strong one (save it!)
- Region: Choose closest to you
- Click "Create new project"
- Wait 2-3 minutes for project to initialize

### 1.3 Get Project Credentials

- In Supabase dashboard, go to **Settings → API**
- Copy these two values (you'll need them soon):
  - **Project URL** (looks like: `https://xxxx.supabase.co`)
  - **Anon/Public key** (long string starting with `eyJ...`)
- Save these in a text file temporarily

## Part 2: Set Up Database

### 2.1 Run SQL Migration

- In Supabase, go to **SQL Editor** (left sidebar)
- Click **New Query**
- Copy entire contents of `supabase/migrations/001_create_bookmarks.sql` from this project
- Paste into the query box
- Click **Run** (or press Ctrl+Enter)
- You should see: "bookmarks" table created successfully

### 2.2 Verify Table Created

- Go to **Table Editor** in Supabase
- You should see a new `bookmarks` table
- It should have columns: `id`, `user_id`, `title`, `url`, `created_at`, `updated_at`

## Part 3: Set Up Google OAuth

### 3.1 Create Google Cloud Project

- Go to https://console.cloud.google.com
- Click Project dropdown → **New Project**
- Name: `Smart Bookmark App`
- Click **Create**
- Wait for it to load

### 3.2 Enable Google+ API

- In search bar, type: `Google+ API`
- Click on it
- Click **Enable**

### 3.3 Create OAuth Credentials

- Go to **APIs & Services → Credentials** (left sidebar)
- Click **Create Credentials → OAuth Client ID**
- If prompted, create OAuth consent screen first:
  - Choose "External"
  - Add your email
  - Add `Smart Bookmark App` as app name
  - Click **Save and Continue** through all screens
- For Application Type, choose: **Web application**
- Name: `Smart Bookmark App`
- Under "Authorized redirect URIs", click **Add URI** twice:
  - First: `http://localhost:3000/auth/callback` (for local testing)
  - Second: Leave blank for now (update after Vercel deployment)
- Click **Create**
- Copy **Client ID** and **Client Secret** (save these!)

### 3.4 Add to Supabase

- In Supabase, go to **Authentication → Providers**
- Find "Google" and click it
- Paste your Google:
  - **Client ID**
  - **Client Secret**
- Click **Save**

### 3.5 Add Supabase Callback to Google

- Go back to Google Cloud Console
- Go to **APIs & Services → Credentials**
- Click your OAuth app (pencil icon)
- Under "Authorized redirect URIs", add:
  - `https://your-project.supabase.co/auth/v1/callback`
  - (Replace `your-project` with your actual Supabase project name)
- Click **Save**

## Part 4: Configure Local Project

### 4.1 Update .env.local

- Open `.env.local` in this project
- Replace the placeholder values:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-long-anon-key
  ```
- (Use the values you saved from Supabase Settings → API)
- Save the file

### 4.2 Install Dependencies (if not done)

```bash
npm install
```

### 4.3 Start Development Server

```bash
npm run dev
```

You should see: `▲ Next.js 15.1.x ready on http://localhost:3000`

## Part 5: Test Locally

### 5.1 Test Login

- Open http://localhost:3000 in browser
- Click "Sign in with Google"
- Select your Google account
- If all is well, you'll be redirected to `/dashboard`
- You should see "My Bookmarks" with your email

### 5.2 Test Adding Bookmark

- In the "Add New Bookmark" form:
  - Title: `GitHub`
  - URL: `https://github.com`
- Click "Add Bookmark"
- Bookmark should appear instantly in the list below

### 5.3 Test Real-time Sync

- Open another browser tab
- Go to http://localhost:3000
- Sign in with the same Google account
- In Tab 1: Add another bookmark
- Watch Tab 2: It appears instantly without page refresh!

### 5.4 Test Delete

- In either tab, click "Delete" on any bookmark
- Watch the other tab: It disappears instantly

### 5.5 Test Logout

- Click "Sign Out" button (top right)
- You should be redirected to home page (`/`)

**If all above works, your local setup is complete!** ✅

## Part 6: Deploy to Vercel

### 6.1 Prepare Code

- If you haven't already:
  ```bash
  git init
  git add .
  git commit -m "Smart Bookmark App - Initial commit"
  ```

### 6.2 Push to GitHub

- Create new repo on GitHub.com (private or public)
- Add remote and push:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/smart-bookmark-app.git
  git branch -M main
  git push -u origin main
  ```

### 6.3 Deploy on Vercel

- Go to https://vercel.com
- Click "New Project"
- Click "Import Git Repository"
- Paste your GitHub repo URL
- Click "Import"
- Skip "Create a Team" if you don't need it
- In **Environment Variables**, add:
  - `NEXT_PUBLIC_SUPABASE_URL` = `https://xxxx.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
- Click **Deploy**
- Wait 2-3 minutes...
- When done, copy your Vercel URL (looks like: `https://smart-bookmark-app-xxx.vercel.app`)

### 6.4 Update Google OAuth

- Go back to Google Cloud Console
- Go to **Credentials**
- Click your OAuth app (pencil)
- In "Authorized redirect URIs", add:
  - `https://your-vercel-url.vercel.app/auth/callback`
  - (Replace with YOUR actual Vercel URL)
- Click **Save**

### 6.5 Update Supabase OAuth

- In Supabase, go to **Authentication → Providers → Google**
- Make sure redirect URIs match both:
  - `http://localhost:3000/auth/callback` (local dev)
  - `https://your-vercel-url.vercel.app/auth/callback` (production)

### 6.6 Test Live Deployment

- Go to your Vercel URL in browser
- Click "Sign in with Google"
- Should work exactly like local!
- Add a bookmark
- Share URL with a friend
- They can sign in with THEIR Google account
- They see their own bookmarks (not yours)

**Congratulations! Your app is live!** 🎉

## Part 7: Share Your App

Your app is now live at: `https://your-vercel-url.vercel.app`

Share the link! Anyone can:

1. Sign in with their Google account
2. Add their own private bookmarks
3. See them sync in real-time across tabs/devices

## 📝 Important Notes

- **Each user's bookmarks are completely private** - enforced by database
- **Real-time sync works across browser tabs, devices, etc.**
- **Google OAuth provides secure login** - no password to remember
- **Vercel provides free hosting** with generous limits
- **Supabase free tier** includes 500MB database, auth, real-time

## 🆘 Troubleshooting

### "Invalid redirect URI" error

→ Check that your redirect URIs in Google Cloud match your Supabase settings

### Bookmarks not appearing after adding

→ Check browser console (F12) for errors
→ Verify you're logged in with same Google account

### "Cannot GET /dashboard"

→ Check that you're logged in
→ If not logged in, home page will redirect you to login

### Real-time not working

→ Open two tabs of YOUR LIVE VERCEL URL (not localhost)
→ Make sure both are signed in with same account
→ Add bookmark in one tab - should appear instantly in other

### Vercel says "Environment variables not set"

→ Go back to Vercel project settings
→ Re-enter the environment variables
→ Redeploy

## 🎓 What You Learned

✅ How to set up a Supabase backend
✅ How to configure Google OAuth
✅ How to run a Next.js development server
✅ How to deploy a full-stack app to Vercel
✅ How real-time database subscriptions work

## 📚 Next Steps (Optional)

- Add bookmark categories/tags
- Add search/filter functionality
- Add bookmark sharing
- Add import/export bookmarks
- Add dark mode
- Add PWA (offline support)

Enjoy your Smart Bookmark App! 🚀
