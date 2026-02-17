# Smart Bookmark App - File Reference Guide

## 📂 Complete File Structure

```
smart-bookmark-app/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with auth providers
│   │   ├── page.tsx                  # Home/login page
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Main bookmarks dashboard
│   │   ├── auth/
│   │   │   ├── callback/
│   │   │   │   └── route.ts          # OAuth callback handler
│   │   │   └── error/
│   │   │       └── page.tsx          # Auth error page
│   │   ├── favicon.ico               # Browser favicon
│   │   └── globals.css               # Global styles
│   │
│   ├── contexts/                     # React Context providers
│   │   ├── AuthContext.tsx           # User authentication state
│   │   └── BookmarkContext.tsx       # Bookmarks + real-time sync
│   │
│   ├── components/                   # React components
│   │   ├── LoginButton.tsx           # Google sign-in button
│   │   ├── BookmarkForm.tsx          # Add bookmark form
│   │   └── BookmarkList.tsx          # Display bookmarks
│   │
│   └── utils/                        # Utility functions
│       └── supabase/
│           ├── client.ts             # Browser Supabase client
│           └── server.ts             # Server Supabase client
│
├── supabase/
│   └── migrations/
│       └── 001_create_bookmarks.sql  # Database schema & RLS
│
├── middleware.ts                      # Auth session middleware
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.ts                 # Tailwind CSS config
├── postcss.config.mjs                 # PostCSS config
├── .eslintrc.json                     # ESLint configuration
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies & scripts
├── package-lock.json                  # Locked dependency versions
├── .env.local                         # Local environment variables
├── .env.example                       # Environment template (if exists)
├── .gitignore                         # Git ignore rules
│
└── DOCUMENTATION/
    ├── README.md                      # Main project overview
    ├── QUICK_START.md                 # Fast reference guide
    ├── TUTORIAL.md                    # Detailed step-by-step setup
    ├── SETUP_CHECKLIST.md             # Pre-deployment checklist
    ├── DEPLOYMENT_GUIDE.md            # Vercel deployment steps
    ├── IMPLEMENTATION_DETAILS.md      # Technical deep-dive
    ├── PROJECT_SUMMARY.md             # Feature overview
    ├── COMPLETE_SUMMARY.md            # Complete implementation summary
    ├── INDEX.md                       # Documentation index
    └── FILE_REFERENCE.md              # This file
```

## 📄 File Descriptions

### Source Code - Pages (`src/app/`)

#### `layout.tsx`

- **Purpose**: Root layout wrapping entire app
- **Contains**:
  - `<AuthProvider>` - Manages user login state
  - `<BookmarkProvider>` - Manages bookmarks + real-time sync
  - Global styles and fonts
- **Key**: All child pages inherit these providers

#### `page.tsx` (Home)

- **Purpose**: Landing/login page
- **Shows**: Login button if not authenticated
- **Redirects**: To `/dashboard` if already logged in
- **Component**: LoginButton with Google OAuth

#### `dashboard/page.tsx`

- **Purpose**: Main app page (protected route)
- **Shows**:
  - User's email
  - BookmarkForm (add new bookmarks)
  - BookmarkList (display existing bookmarks)
  - Sign Out button
- **Protected**: Redirects to home if not logged in

#### `auth/callback/route.ts`

- **Purpose**: OAuth redirect endpoint
- **Handles**: Google OAuth callback
- **Process**: Exchanges auth code for session token
- **Redirects**: To `/dashboard` on success, `/auth/error` on failure

#### `auth/error/page.tsx`

- **Purpose**: Error page for auth failures
- **Shows**: Error message and link back to home
- **Triggered**: When OAuth fails or invalid redirect

### Contexts (`src/contexts/`)

#### `AuthContext.tsx`

- **Purpose**: Global user authentication state
- **Exports**: `AuthProvider` component, `useAuth()` hook
- **Provides**:
  - `user` - Current logged-in user object
  - `session` - Auth session info
  - `isLoading` - Loading state
- **Uses**: Supabase auth events
- **Key**: Used in `layout.tsx` to wrap entire app

#### `BookmarkContext.tsx`

- **Purpose**: Global bookmarks state + real-time sync
- **Exports**: `BookmarkProvider` component, `useBookmarks()` hook
- **Provides**:
  - `bookmarks` - Array of user's bookmarks
  - `isLoading` - Loading state
  - `addBookmark(title, url)` - Add new bookmark
  - `deleteBookmark(id)` - Delete bookmark
- **Features**:
  - Loads bookmarks on mount
  - Subscribes to real-time updates
  - Auto-updates on INSERT/DELETE/UPDATE
- **Realtime**: Uses Supabase Realtime channel

### Components (`src/components/`)

#### `LoginButton.tsx`

- **Purpose**: Google OAuth sign-in button
- **Displays**: Button with Google logo and text
- **On Click**: Initiates Google OAuth flow
- **Redirect**: To Google login, then returns to `/auth/callback`
- **Styling**: Tailwind CSS (white button with border)

#### `BookmarkForm.tsx`

- **Purpose**: Form to add new bookmarks
- **Fields**:
  - Title input (text)
  - URL input (with validation)
- **Validation**:
  - Both fields required
  - URL must be valid format
- **On Submit**: Calls `addBookmark()` from BookmarkContext
- **Features**:
  - Error messages
  - Loading state
  - Clear form after successful submit
- **Styling**: Tailwind CSS form styling

#### `BookmarkList.tsx`

- **Purpose**: Display all user's bookmarks
- **Shows**:
  - Title of each bookmark
  - URL (clickable link)
  - Creation date
  - Delete button
- **On Delete**: Asks for confirmation before deleting
- **Loading**: Shows "Loading..." if bookmarks not yet fetched
- **Empty State**: Shows message if no bookmarks
- **Real-time**: Updates instantly when new bookmarks added/deleted

### Utilities (`src/utils/`)

#### `supabase/client.ts`

- **Purpose**: Browser-side Supabase client
- **Type**: Client-side code (runs in browser)
- **Exports**: `createClient()` function
- **Uses**:
  - Public Supabase URL
  - Public anon key (from env variables)
- **Functionality**: Database queries, auth, real-time subscriptions
- **Used In**: All client components

#### `supabase/server.ts`

- **Purpose**: Server-side Supabase client
- **Type**: Server-only code (marked with 'use server')
- **Exports**: `createClient()` function
- **Uses**: Cookies for session management
- **Functionality**: Server-side queries, authenticated requests
- **Used In**: Middleware, server actions

### Middleware

#### `middleware.ts`

- **Purpose**: Process requests before they reach pages
- **Functionality**: Refreshes auth session on every request
- **Uses**: Supabase session middleware
- **Updates**: Cookie with new session token if expired
- **Security**: Ensures user stays logged in across requests

### Database

#### `supabase/migrations/001_create_bookmarks.sql`

- **Purpose**: Database schema and security setup
- **Creates**: `bookmarks` table
- **Columns**:
  - `id` - Unique bookmark ID (UUID)
  - `user_id` - Reference to auth user (foreign key)
  - `title` - Bookmark title (text)
  - `url` - Bookmark URL (text)
  - `created_at` - Creation timestamp
  - `updated_at` - Last update timestamp
- **Indexes**:
  - On `user_id` for fast user queries
  - On `created_at DESC` for sorting
- **Security**:
  - Enables Row Level Security (RLS)
  - Creates 4 RLS policies (SELECT, INSERT, UPDATE, DELETE)
  - Each policy checks: `auth.uid() = user_id`
- **Real-time**: Enables real-time for bookmarks table

### Configuration Files

#### `package.json`

- **Purpose**: NPM package configuration
- **Contains**:
  - Project metadata (name, version, description)
  - Dependencies (Next.js, React, Supabase, Tailwind, etc.)
  - Scripts (dev, build, start, lint)
  - Build configuration

#### `tsconfig.json`

- **Purpose**: TypeScript compiler configuration
- **Settings**:
  - Target JavaScript version
  - Module system
  - Path aliases (`@/*` for `src/*`)
  - Strict type checking

#### `next.config.ts`

- **Purpose**: Next.js configuration
- **Can Configure**:
  - Environment variables
  - Redirects and rewrites
  - Image optimization

#### `tailwind.config.ts`

- **Purpose**: Tailwind CSS configuration
- **Defines**:
  - Color themes
  - Custom fonts
  - Plugins

#### `.eslintrc.json`

- **Purpose**: Code quality and style rules
- **Extends**: Next.js ESLint config
- **Checks**: Code formatting, potential bugs, best practices

### Environment

#### `.env.local`

- **Purpose**: Local environment variables (not committed to git)
- **Contains**:
  - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- **Note**: `NEXT_PUBLIC_*` variables are exposed to browser (this is OK)
- **Not Committed**: Listed in `.gitignore`

#### `.gitignore`

- **Purpose**: Files/folders to not commit to git
- **Includes**:
  - `node_modules/` - NPM packages
  - `.env.local` - Local secrets
  - `.next/` - Build output
  - `*.log` - Log files

### Documentation Files

#### `README.md`

- **Purpose**: Main project documentation
- **Contains**:
  - Project overview
  - Feature list
  - Tech stack
  - Quick start guide
  - Troubleshooting
  - Links to detailed docs

#### `QUICK_START.md`

- **Purpose**: Fast reference for experienced developers
- **Includes**:
  - Key commands
  - Common issues
  - File descriptions
  - Deployment overview

#### `TUTORIAL.md`

- **Purpose**: Detailed step-by-step guide for beginners
- **Covers**:
  - Creating Supabase project
  - Setting up database
  - Google OAuth configuration
  - Local testing
  - Vercel deployment
- **Format**: Video-like instructions

#### `SETUP_CHECKLIST.md`

- **Purpose**: Verification before deployment
- **Contains**:
  - Pre-deployment checklist
  - Common issues and fixes
  - Feature verification
  - Resource links

#### `DEPLOYMENT_GUIDE.md`

- **Purpose**: Detailed Vercel deployment instructions
- **Covers**:
  - Environment variable setup
  - GitHub integration
  - Deployment process
  - Post-deployment verification
  - Custom domain setup

#### `IMPLEMENTATION_DETAILS.md`

- **Purpose**: Technical deep-dive
- **Covers**:
  - Architecture overview
  - Component interactions
  - Data flow diagrams
  - Code patterns used
  - Performance considerations

#### `PROJECT_SUMMARY.md`

- **Purpose**: High-level overview
- **Contains**:
  - Feature list with implementation status
  - Tech stack justification
  - File organization
  - Design patterns

#### `COMPLETE_SUMMARY.md`

- **Purpose**: Complete implementation summary
- **Includes**:
  - Architecture diagrams
  - Data flows
  - Security model
  - Feature implementations
  - Testing scenarios

#### `INDEX.md`

- **Purpose**: Documentation navigation
- **Lists**: All documentation files with descriptions

#### `FILE_REFERENCE.md` (This File)

- **Purpose**: Complete file structure and descriptions
- **For**: Understanding what each file does

## 🚀 Quick File Location Guide

**Need to...**

- Add a new page? → Create in `src/app/`
- Add a new component? → Create in `src/components/`
- Modify global state? → Edit `src/contexts/*.tsx`
- Add API route? → Create in `src/app/api/`
- Update styles? → Edit `src/app/globals.css`
- Change database? → Edit `supabase/migrations/001_*.sql`
- Configure environment? → Edit `.env.local`
- Deploy? → Follow `DEPLOYMENT_GUIDE.md`
- Learn the app? → Read `TUTORIAL.md` or `IMPLEMENTATION_DETAILS.md`
- Quick reference? → Check `QUICK_START.md`

## 📊 File Statistics

- **Total Files**: ~50+ files
- **Source Files**: 10 React/TypeScript files
- **Config Files**: 8 configuration files
- **Documentation**: 9+ guide files
- **Lines of Code**: ~2000+ lines (not including node_modules)
- **Build Size**: ~150KB (optimized)

## 🔄 File Dependencies

```
layout.tsx
  ├── AuthProvider (from AuthContext.tsx)
  └── BookmarkProvider (from BookmarkContext.tsx)

page.tsx (home)
  ├── useAuth() (from AuthContext.tsx)
  └── LoginButton (from components/)

dashboard/page.tsx
  ├── useAuth() (from AuthContext.tsx)
  ├── useBookmarks() (from BookmarkContext.tsx)
  ├── BookmarkForm (from components/)
  └── BookmarkList (from components/)

BookmarkContext.tsx
  ├── createClient() (from utils/supabase/client.ts)
  └── useAuth() (from AuthContext.tsx)

middleware.ts
  └── createClient() (from utils/supabase/server.ts)

Supabase Database
  └── RLS Policies (from migrations/001_*.sql)
```

## ✅ File Checklist

- ✅ All source files created
- ✅ All contexts configured
- ✅ All components implemented
- ✅ Database migration ready
- ✅ Configuration files complete
- ✅ Environment file set up
- ✅ Documentation comprehensive
- ✅ Project ready for development
- ✅ Project ready for deployment

---

**Total Project Files**: All accounted for and ready to use!
