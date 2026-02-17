# 🔖 Smart Bookmark App

A modern, real-time bookmark manager that syncs instantly across all your devices. Built with Next.js, Supabase, and Tailwind CSS.

**Live Demo**: [Add your Vercel URL here after deployment]

## ✨ Features

✅ **Google OAuth Only** - Sign in with your Google account, no passwords needed
✅ **Add Bookmarks** - Save URLs with custom titles
✅ **Real-time Sync** - Changes appear instantly across all open tabs and devices
✅ **Private Bookmarks** - Each user only sees their own bookmarks (enforced at database level)
✅ **Delete Bookmarks** - Remove bookmarks you no longer need
✅ **Responsive Design** - Works beautifully on desktop and mobile
✅ **Zero Configuration Auth** - OAuth setup included, just add your credentials
✅ **Production Ready** - Deploy to Vercel in minutes

## 🎯 What This App Does

1. **You sign in** with Google (one-click)
2. **Add bookmarks** by entering URL + title
3. **View in real-time** - open multiple tabs and see instant updates
4. **Stay private** - your bookmarks are yours alone
5. **Access anywhere** - from any device via the web

## 🛠️ Tech Stack

| Layer              | Technology                                     |
| ------------------ | ---------------------------------------------- |
| **Frontend**       | Next.js 15+ (App Router), React 19, TypeScript |
| **Styling**        | Tailwind CSS                                   |
| **Backend**        | Supabase (PostgreSQL)                          |
| **Authentication** | Google OAuth + Supabase Auth                   |
| **Real-time**      | Supabase Realtime                              |
| **Hosting**        | Vercel (recommended)                           |

## 📋 Prerequisites

- **Node.js** 18+ (download from [nodejs.org](https://nodejs.org))
- **npm** (comes with Node.js)
- **Supabase account** (free at [supabase.com](https://supabase.com))
- **Google Cloud account** (free at [console.cloud.google.com](https://console.cloud.google.com))
- **GitHub account** (for Vercel deployment)

## 🚀 Quick Start (5 Minutes)

### 1️⃣ Setup Supabase

```bash
# Create account at https://supabase.com
# Create new project
# Go to Settings → API and copy:
# - Project URL
# - Anon/Public key
```

### 2️⃣ Setup Google OAuth

```bash
# Create project at https://console.cloud.google.com
# Enable Google+ API
# Create OAuth 2.0 credentials (Web application)
# Add redirect URIs:
#   - http://localhost:3000/auth/callback
#   - https://your-domain.vercel.app/auth/callback (after deployment)
# Copy Client ID and Secret to Supabase
```

### 3️⃣ Configure Local Project

```bash
# Clone this repository
cd smart-bookmark-app

# Update .env.local with your credentials
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here

# Install dependencies
npm install
```

### 4️⃣ Setup Database

In Supabase SQL Editor, run the migration:

```sql
-- Copy contents of supabase/migrations/001_create_bookmarks.sql
```

### 5️⃣ Start Development

```bash
npm run dev
# Open http://localhost:3000
```

## 📚 Full Setup Guides

For complete step-by-step instructions, see:

- **[TUTORIAL.md](./TUTORIAL.md)** - Detailed setup for complete beginners (includes screenshots)
- **[QUICK_START.md](./QUICK_START.md)** - Fast reference guide for experienced developers
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Pre-deployment verification checklist
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deploy to Vercel in 5 minutes

## 🧪 Testing the App

### Local Testing

```bash
npm run dev
# Open http://localhost:3000 in browser
# Sign in with Google
# Add a bookmark
# Test real-time by opening multiple tabs
```

### Real-time Sync Test

1. Open http://localhost:3000 in two tabs
2. Sign in with Google in both
3. Add bookmark in Tab 1
4. Watch it appear instantly in Tab 2 (no refresh needed!)
5. Delete from Tab 2 - Tab 1 updates instantly

### Multi-user Privacy Test

1. Sign out
2. Sign in as different Google account
3. Verify you don't see first account's bookmarks
4. Add your own bookmark
5. This bookmark is private to this account only

## 🚢 Deploy to Vercel (Free)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Smart Bookmark App"
git remote add origin https://github.com/YOUR_USERNAME/smart-bookmark-app.git
git push -u origin main
```

### Step 2: Deploy on Vercel

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo
- Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Click Deploy

### Step 3: Update OAuth Redirect URIs

- Add your Vercel URL to:
  - Google Cloud Console (OAuth redirect URIs)
  - Supabase (Authentication providers)

**That's it! Your app is live!** 🎉

## 📁 Project Structure

```
src/
├── app/                          # Next.js pages (App Router)
│   ├── layout.tsx               # Root layout + auth providers
│   ├── page.tsx                 # Home/login page
│   ├── dashboard/page.tsx       # Main bookmarks page
│   └── auth/
│       ├── callback/route.ts    # OAuth callback handler
│       └── error/page.tsx       # Auth error page
├── contexts/
│   ├── AuthContext.tsx          # Global user auth state
│   └── BookmarkContext.tsx      # Global bookmarks + real-time
├── components/
│   ├── LoginButton.tsx          # Google sign-in button
│   ├── BookmarkForm.tsx         # Add bookmark form
│   └── BookmarkList.tsx         # Display bookmarks list
└── utils/supabase/
    ├── client.ts                # Browser Supabase client
    └── server.ts                # Server Supabase client

middleware.ts                      # Auth session middleware
supabase/migrations/              # Database schema
```

## 🔐 Security Features

- **Google OAuth**: No passwords stored, Google handles authentication
- **Row Level Security (RLS)**: Database enforces data privacy at row level
- **User Isolation**: Each user can ONLY access their own bookmarks
- **Secure API Keys**: Anon key is public but restricted by RLS policies
- **Session Management**: Middleware refreshes auth token on each request
- **HTTPS**: Enforced on Vercel deployment

## 📝 Available Commands

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run ESLint to check code quality
npm run type-check # Check TypeScript types
```

## 🐛 Troubleshooting

| Problem                                | Solution                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------- |
| **"Invalid redirect URI" error**       | Check your OAuth redirect URIs match exactly in Google Cloud and Supabase |
| **No bookmarks showing**               | Verify RLS is enabled in Supabase; check browser console for errors       |
| **Real-time not syncing**              | Enable "Realtime" for bookmarks table in Supabase dashboard               |
| **"Cannot sign in"**                   | Verify Google OAuth credentials are correct in Supabase                   |
| **Build fails**                        | Try `npm install` again or clear `.next` folder                           |
| **Bookmarks from other users visible** | This shouldn't happen; verify RLS policies are active                     |

See detailed troubleshooting in [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

## 🎓 How It Works

### Architecture

1. **Frontend** (Next.js + React) displays UI
2. **Middleware** refreshes auth session
3. **AuthContext** manages user login/logout
4. **BookmarkContext** manages bookmarks and real-time updates
5. **Supabase Database** stores bookmarks with RLS policies
6. **Supabase Realtime** pushes updates to all connected clients

### Real-time Flow

```
User adds bookmark in Tab 1
         ↓
BookmarkForm sends request to Supabase
         ↓
Supabase inserts in database
         ↓
Supabase emits "INSERT" event via Realtime
         ↓
BookmarkContext's subscription receives event
         ↓
React state updates in Tab 2
         ↓
Tab 2 UI updates instantly (no page refresh)
```

### Privacy Enforcement

```
User A tries to query bookmarks
         ↓
Request hits Supabase
         ↓
RLS Policy checks: user_id = auth.uid()?
         ↓
If YES: Return user's bookmarks
If NO: Return empty result (no error, just no data)
```

## 🌟 Key Highlights

✅ **No Configuration Hassle** - Clone, update env variables, deploy
✅ **Real-time Magic** - Bookmarks sync across tabs instantly
✅ **Privacy First** - Database level enforcement of user isolation
✅ **Modern Stack** - Next.js 15, React 19, TypeScript
✅ **Free Tier** - Supabase free tier has generous limits
✅ **Production Ready** - Deployed to millions via Vercel
✅ **Easy Deployment** - One-click deploy to Vercel from GitHub

## 💡 Future Enhancements

Ideas for extending this app:

- [ ] Bookmark categories/tags
- [ ] Search and filter
- [ ] Bookmark sharing (with specific users)
- [ ] Import/export bookmarks (CSV, JSON)
- [ ] Dark mode
- [ ] PWA (offline support)
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Social features (following users, public bookmarks)

## 📞 Support & Resources

- **[TUTORIAL.md](./TUTORIAL.md)** - Step-by-step beginner guide
- **[QUICK_START.md](./QUICK_START.md)** - Quick reference
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Production deployment
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Complete checklist
- **[Next.js Docs](https://nextjs.org/docs)** - Framework documentation
- **[Supabase Docs](https://supabase.com/docs)** - Backend documentation

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 🙌 Credits

Built with:

- [Next.js](https://nextjs.org) - React framework
- [Supabase](https://supabase.com) - Backend & real-time
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Vercel](https://vercel.com) - Hosting

---

**Ready to get started?** Follow [QUICK_START.md](./QUICK_START.md) or [TUTORIAL.md](./TUTORIAL.md) now! 🚀

**Questions?** Check the troubleshooting section above or the detailed guides.

**Found a bug?** Open an issue on GitHub.

**Love this project?** Give it a ⭐ on GitHub!
