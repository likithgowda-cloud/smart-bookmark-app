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

🛠 Problems Faced and Solution 

🔐 The "Auth" Headache
1. The Redirect URI Loop
The Problem: I tried to sign in with Google, but I just kept getting a nasty "Invalid redirect URI" error. It felt like Google and Supabase weren't talking to each other.
My Fix: I realized that I had to be extremely pedantic with URLs. I went into the Google Cloud Console and the Supabase Auth settings and made sure every single URL matched perfectly—no extra slashes, no http where it should be https. I added both my localhost for testing and my Vercel domain for production. Once they were identical everywhere, the error vanished.

2. My Environment Variables Weren't Loading
The Problem: Locally, everything was fine. But as soon as I deployed to Vercel, the app just... died. It couldn't find the database.
My Fix: I forgot that Vercel doesn't read my local .env.local file (for obvious security reasons!). I had to manually go into the Vercel Project Settings, copy-paste my NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, and trigger a new deployment.

📊 Database & Security Battles

3. The "Disappearing" Bookmarks
The Problem: I would click "Add Bookmark," the UI would look fine, but when I refreshed, it was gone. It wasn't saving to the database.
My Fix: This was a Row Level Security (RLS) issue. Supabase was protecting the table so well that even I couldn't write to it! I had to go into the SQL editor and write a policy that specifically allowed authenticated users to INSERT and SELECT data, but only if the user_id matched their own ID.

4. The Privacy Leak (The "I see you" bug)
The Problem: During testing, I realized that if I logged in with a different account, I could see the first account's bookmarks. That’s a huge privacy fail.
My Fix: I went back to my RLS policies. I had to ensure the SELECT policy wasn't just "true," but actually checked auth.uid() == user_id. After updating the SQL migration, I tested with two different browser windows, and finally, everyone only saw their own data.

5. Real-time Sync was Broken
   
The Problem: I wanted to see bookmarks pop up instantly if I had two tabs open, but I had to refresh the page every time.
My Fix: I learned that you have to explicitly "turn on the radio" in Supabase. I went to Database → Replication and toggled the "Realtime" switch for my bookmarks table. Once that was on, the WebSockets started flowing, and the UI updated instantly.

🚀 Build & Deployment Frustrations

6. The "Port 3000" Conflict
The Problem: Sometimes I’d try to start my dev server and it would just fail because I had another project running in the background.
My Fix: Instead of hunting down the process to kill it, I just started running npm run dev -- -p 3001. It’s a simple trick, but it saved me a lot of frustration when multitasking between projects.

7. Build Fails on Vercel
The Problem: My code worked locally, but Vercel kept failing the "Build" step with URL errors.
My Fix: It turns out my build script was trying to validate environment variables that weren't there during the build process. I provided "placeholder" values in the build command so the code could compile, and then the real variables took over once the site went live.

✅ My Key Takeaways

RLS is King: Never trust the frontend; always secure the database.

Logs are Friends: Most of my answers were hidden in the Browser Console or Vercel Build Logs.

Double Check URLs: 90% of OAuth issues are just typos in the Redirect URIs.

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
