# Smart Bookmark App - Quick Reference

## 🚀 Getting Started (Local Development)

### Step 1: Install Dependencies

```bash
cd smart-bookmark-app
npm install
```

### Step 2: Set Up Supabase

1. Create account at https://supabase.com (free tier available)
2. Create new project
3. Go to Settings → API → Get your URL and keys
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   ```

### Step 3: Set Up Database

1. In Supabase SQL Editor, run the SQL from `supabase/migrations/001_create_bookmarks.sql`
2. Enable Google OAuth in Supabase → Authentication → Providers

### Step 4: Start Development Server

```bash
npm run dev
```

Then open http://localhost:3000

## 🔐 Google OAuth Setup (Required)

### Local Testing

1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI:
   - `http://localhost:3000/auth/callback`
6. Copy Client ID and Secret to Supabase

### Production (Vercel)

1. Add new authorized redirect URI:
   - `https://your-domain-on-vercel.app/auth/callback`
2. No code changes needed - just update Supabase settings

## 📦 Deployment to Vercel (5 Minutes)

### Prerequisites

- GitHub account with code pushed
- Supabase project configured
- Google OAuth credentials set up

### Deploy

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
5. Click Deploy
6. Update Google OAuth redirect URI to your Vercel domain

Done! Your app is live.

## 🧪 Testing Real-time Sync

1. Open your app in two browser tabs
2. Sign in with Google
3. In Tab 1: Add a bookmark
4. Watch Tab 2: Bookmark appears instantly without refresh
5. In Tab 2: Delete the bookmark
6. Watch Tab 1: Bookmark disappears instantly

## 📁 File Structure at a Glance

```
src/
├── app/              # Next.js pages (App Router)
├── contexts/         # React Context for state (Auth, Bookmarks)
├── components/       # React components (UI)
├── utils/            # Helper functions (Supabase clients)

middleware.ts        # Session management
supabase/
└── migrations/       # SQL database schema
```

## 🔑 Key Concepts

**AuthProvider**: Manages user login/logout state globally
**BookmarkProvider**: Manages bookmarks + real-time updates
**Row Level Security (RLS)**: Database enforces - users see only their data
**Realtime**: Instant updates across tabs when bookmarks change

## ✅ What Each Component Does

| File                  | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `layout.tsx`          | Wraps entire app with Auth & Bookmark providers |
| `page.tsx`            | Home page with login button                     |
| `dashboard/page.tsx`  | Main app page (protected route)                 |
| `LoginButton.tsx`     | Google OAuth sign-in button                     |
| `BookmarkForm.tsx`    | Add new bookmark form                           |
| `BookmarkList.tsx`    | Display all bookmarks for current user          |
| `AuthContext.tsx`     | Global user auth state                          |
| `BookmarkContext.tsx` | Global bookmarks state + real-time listener     |
| `middleware.ts`       | Refreshes auth session on every request         |

## 🚨 Common Issues & Fixes

| Issue                      | Solution                                                   |
| -------------------------- | ---------------------------------------------------------- |
| "Invalid redirect URI"     | Update Supabase OAuth settings with correct domain         |
| No bookmarks showing       | Check RLS is enabled in Supabase; verify user is logged in |
| Real-time not working      | Enable Realtime for bookmarks table in Supabase            |
| Build error                | Run `npm install` again or clear .next folder              |
| Cannot sign in with Google | Verify Google OAuth credentials in Supabase                |

## 🎯 Next Steps

- [ ] Fork/clone repository
- [ ] Create Supabase project
- [ ] Set up Google OAuth
- [ ] Configure .env.local
- [ ] Run `npm run dev`
- [ ] Deploy to Vercel
- [ ] Share your live URL!

## 📞 Support

Check SETUP_CHECKLIST.md for detailed setup guide
Check DEPLOYMENT_GUIDE.md for production deployment details
Check IMPLEMENTATION_DETAILS.md for code architecture
