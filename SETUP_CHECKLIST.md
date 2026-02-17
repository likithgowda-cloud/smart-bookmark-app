# Smart Bookmark App - Setup & Deployment Checklist

## ✅ Project Setup Complete

All files have been created and the project is ready for configuration and deployment.

## 📋 Pre-Deployment Checklist

### 1. Supabase Configuration

- [ ] Create a Supabase project at https://supabase.com
- [ ] Get your project URL from Supabase dashboard
- [ ] Get your anon/public key from Supabase dashboard
- [ ] Update `.env.local` with real credentials:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```

### 2. Database Setup in Supabase

- [ ] Go to SQL Editor in your Supabase project
- [ ] Copy the contents of `supabase/migrations/001_create_bookmarks.sql`
- [ ] Paste and execute in the SQL Editor
- [ ] Verify the `bookmarks` table was created with RLS policies

### 3. Enable Google OAuth

- [ ] In Supabase, go to Authentication → Providers
- [ ] Enable Google provider
- [ ] Add your Google OAuth credentials:
  - Go to Google Cloud Console
  - Create OAuth 2.0 credentials (Web application)
  - Authorized redirect URIs should include:
    - `https://your-project.supabase.co/auth/v1/callback`
    - `http://localhost:3000/auth/callback` (for local testing)
- [ ] Copy Client ID and Client Secret to Supabase
- [ ] Add your deployment URL's callback: `https://your-domain.vercel.app/auth/callback`

### 4. Local Testing

- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Click "Sign in with Google"
- [ ] After successful login, you should be redirected to /dashboard
- [ ] Test adding a bookmark
- [ ] Test opening two browser tabs and verify real-time sync
- [ ] Test deleting a bookmark

### 5. Prepare for Deployment

- [ ] Ensure `.env.local` is NOT committed (it's in .gitignore)
- [ ] Create `.env.production.local` (or use Vercel environment variables)
- [ ] Test production build: `npm run build && npm run start`

### 6. Deploy to Vercel

- [ ] Push code to GitHub
- [ ] Import project in Vercel
- [ ] Add environment variables in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deploy
- [ ] Update Supabase OAuth redirect URLs to include your Vercel domain

### 7. Post-Deployment Testing

- [ ] Visit your live URL
- [ ] Test Google authentication
- [ ] Add and delete bookmarks
- [ ] Test real-time sync in multiple tabs
- [ ] Verify each user can only see their own bookmarks

## 🗂️ Project Structure

```
smart-bookmark-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Home/login page
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Main app page
│   │   └── auth/
│   │       ├── callback/
│   │       │   └── route.ts        # OAuth callback handler
│   │       └── error/
│   │           └── page.tsx        # Auth error page
│   ├── contexts/
│   │   ├── AuthContext.tsx         # User auth state
│   │   └── BookmarkContext.tsx     # Bookmarks state + real-time
│   ├── components/
│   │   ├── LoginButton.tsx         # Google sign-in button
│   │   ├── BookmarkForm.tsx        # Add bookmark form
│   │   └── BookmarkList.tsx        # Display bookmarks
│   └── utils/
│       └── supabase/
│           ├── client.ts           # Browser Supabase client
│           └── server.ts           # Server Supabase client
├── middleware.ts                   # Auth session middleware
├── supabase/
│   └── migrations/
│       └── 001_create_bookmarks.sql # Database schema
├── .env.local                       # Local environment variables
└── package.json
```

## 🚀 Key Features Implemented

✅ **Google OAuth Only** - No email/password authentication
✅ **Private Bookmarks** - Each user only sees their own
✅ **Real-time Sync** - Updates instantly across tabs/devices
✅ **Add Bookmarks** - URL + title input validation
✅ **Delete Bookmarks** - Remove unwanted bookmarks
✅ **Responsive UI** - Works on desktop and mobile
✅ **Row-Level Security** - Database enforced privacy

## 📝 Tech Stack

- **Frontend**: Next.js 15+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel
- **Authentication**: Google OAuth

## 🔧 Available Commands

```bash
npm run dev      # Start development server on :3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 💡 Important Notes

1. **Row-Level Security (RLS)** is enabled on the bookmarks table - users can only access their own data
2. **Real-time subscriptions** use Supabase's Realtime feature - ensure it's enabled
3. **Environment variables** are public (NEXT*PUBLIC*\*) - they're visible in browser, which is fine for Supabase anon keys
4. **Redirect URLs** must be exact - mismatches will break OAuth

## 🐛 Troubleshooting

**OAuth redirect fails?**

- Check Supabase redirect URLs include your domain
- Verify credentials in .env.local are correct

**No bookmarks appear after adding?**

- Check browser console for errors
- Verify RLS policies are applied in Supabase
- Ensure user_id matches authenticated user

**Real-time not working?**

- Enable "Realtime" in Supabase for the bookmarks table
- Check WebSocket connection in browser DevTools

**Build fails?**

- Clear .next folder: `rm -r .next`
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -r node_modules && npm install`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com/docs)
