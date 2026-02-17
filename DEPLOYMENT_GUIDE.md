# Smart Bookmark App - Setup Guide

This guide walks through setting up and deploying the Smart Bookmark App on Vercel with Supabase backend.

## Project Overview

- **Frontend**: Next.js 15+ with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Real-time**: Supabase Realtime subscriptions
- **Deployment**: Vercel

## Step 1: Local Development Setup

### 1.1 Install Dependencies

```bash
npm install
```

### 1.2 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for project to be created (about 2 minutes)
4. Go to **Settings > API** and copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** API key

### 1.3 Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

Replace with your actual values from Supabase.

### 1.4 Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy all SQL from `supabase/migrations/001_create_bookmarks.sql`
4. Paste into the SQL editor and click **Run**

This creates:

- `bookmarks` table
- Row Level Security (RLS) policies (users can only see their own)
- Indexes for performance
- Realtime subscriptions

### 1.5 Configure Google OAuth

#### In Google Cloud Console:

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Type: Web Application
   - Authorized redirect URIs: `https://[PROJECT_ID].supabase.co/auth/v1/callback`
   - Copy the Client ID and Client Secret

#### In Supabase:

1. Go to **Authentication > Providers > Google**
2. Enable Google
3. Paste Client ID and Client Secret
4. Click Save

### 1.6 Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and test the login flow.

## Step 2: Deploy to Vercel

### 2.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Smart Bookmark App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-bookmark-app.git
git push -u origin main
```

### 2.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New > Project**
3. Import your GitHub repository
4. In "Environment Variables" section, add:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your Supabase anon key
5. Click **Deploy**

### 2.3 Update Google OAuth Redirect URI

After Vercel deployment completes:

1. Note your Vercel URL (e.g., `https://smart-bookmark-app-123.vercel.app`)
2. Update Google Cloud Console:
   - Add authorized redirect URI: `https://smart-bookmark-app-123.vercel.app/auth/callback`
3. Update Supabase:
   - Add redirect URI: `https://smart-bookmark-app-123.vercel.app/auth/callback`

### 2.4 Test Live App

Visit your Vercel URL and test:

- [ ] Google login works
- [ ] Can add bookmarks
- [ ] Bookmarks appear on dashboard
- [ ] Can delete bookmarks
- [ ] Real-time sync (open in 2 tabs)

## Real-time Sync Testing

To verify real-time sync works across devices:

1. Open the app in **Tab A**: `https://your-app.vercel.app/dashboard`
2. Open the app in **Tab B**: Same URL
3. In Tab A, add a new bookmark
4. Verify it appears **instantly** in Tab B without refresh

This works because:

- Both tabs are logged in as the same user
- BookmarkContext subscribes to Supabase Realtime
- When Tab A adds a bookmark, Supabase broadcasts the change
- Tab B's subscription receives the event and updates state

## How It Works

### Authentication Flow

```
User → Click "Sign in with Google"
     ↓
LoginButton component calls supabase.auth.signInWithOAuth()
     ↓
Redirected to Google consent screen
     ↓
User approves → Redirected to /auth/callback
     ↓
Route handler exchanges auth code for session
     ↓
Redirected to /dashboard
```

### Bookmark Operations

```
User adds bookmark via BookmarkForm
     ↓
addBookmark() calls supabase.from('bookmarks').insert()
     ↓
Database insert (RLS policy checks auth.uid() = user_id)
     ↓
Supabase broadcasts postgres_changes event
     ↓
All subscribed clients (all user's tabs) receive update
     ↓
BookmarkContext updates local state
     ↓
Component re-renders with new bookmark
```

### Security

- **Row Level Security (RLS)**: Database enforces that queries only affect user's own bookmarks
- **Google OAuth**: No passwords stored anywhere
- **Secure Session**: Supabase JWT tokens stored in httpOnly cookies
- **HTTPS Only**: Vercel enforces HTTPS

## Project Structure

```
smart-bookmark-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, includes providers
│   │   ├── page.tsx                # Home/login page
│   │   ├── globals.css             # Tailwind + global styles
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Main app (protected)
│   │   └── auth/
│   │       ├── callback/
│   │       │   └── route.ts        # OAuth callback handler
│   │       └── error/
│   │           └── page.tsx        # Auth error page
│   │
│   ├── components/
│   │   ├── LoginButton.tsx         # Google OAuth button
│   │   ├── BookmarkForm.tsx        # Add bookmark form
│   │   └── BookmarkList.tsx        # Bookmark list display
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx         # Auth state (user, session)
│   │   └── BookmarkContext.tsx     # Bookmarks + real-time sync
│   │
│   └── utils/
│       └── supabase/
│           ├── client.ts           # Client-side Supabase instance
│           └── server.ts           # Server-side Supabase instance
│
├── supabase/
│   └── migrations/
│       └── 001_create_bookmarks.sql
│
├── .env.local                      # (local only, not in git)
├── .env.example                    # Template for env variables
├── package.json
└── README.md
```

## Troubleshooting

### Issue: "Supabase URL or key is missing"

- Verify `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart dev server after changing env vars

### Issue: OAuth redirect fails

- Check redirect URI matches exactly in both Google Cloud and Supabase
- For local: should be `http://localhost:3000/auth/callback` (HTTP)
- For Vercel: should be `https://your-app.vercel.app/auth/callback` (HTTPS)

### Issue: Real-time sync not working

- Verify RLS policies are enabled on `bookmarks` table
- Check browser console for errors
- Verify Realtime is enabled: Supabase > Settings > Realtime > bookmarks (ON)

### Issue: "Can't see my bookmarks after login"

- First login, no bookmarks yet - add one via the form
- If still empty, check RLS policy: should allow `auth.uid() = user_id`

## Next Steps

- [ ] Set up a custom domain on Vercel
- [ ] Add bookmark categories/tags
- [ ] Add search functionality
- [ ] Add export/import bookmarks as CSV
- [ ] Mobile app with React Native

## Support

- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- Vercel docs: https://vercel.com/docs
