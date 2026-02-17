@echo off
REM Smart Bookmark App - Quick Commands for Windows

echo.
echo ================================================
echo Smart Bookmark App - Quick Reference
echo ================================================
echo.

echo LOCAL DEVELOPMENT:
echo   npm install              - Install dependencies
echo   npm run dev              - Start dev server (http://localhost:3000)
echo   npm run build            - Build for production
echo   npm run start            - Run production build locally
echo.

echo GIT & DEPLOYMENT:
echo   git init                 - Initialize git repo
echo   git add .                - Stage all files
echo   git commit -m "msg"      - Create commit
echo   git push                 - Push to GitHub
echo.

echo ENVIRONMENT SETUP:
echo   copy .env.example .env.local  - Create env file
echo   Edit .env.local and add your Supabase credentials
echo.

echo SUPABASE SETUP:
echo   1. Go to https://supabase.com and create project
echo   2. Get API URL and key from Settings ^> API
echo   3. Go to SQL Editor and run migrations from:
echo      supabase/migrations/001_create_bookmarks.sql
echo   4. Set up Google OAuth in Authentication ^> Providers
echo.

echo VERCEL DEPLOYMENT:
echo   1. Push code to GitHub
echo   2. Go to https://vercel.com
echo   3. Click "New Project" and import GitHub repo
echo   4. Add environment variables (SUPABASE_URL and KEY)
echo   5. Click "Deploy"
echo   6. Update redirect URIs in Google Cloud and Supabase
echo.

echo TESTING:
echo   Start dev: npm run dev
echo   Test login with Google
echo   Test adding/deleting bookmarks
echo   Test real-time sync in 2 browser tabs
echo.

echo TROUBLESHOOTING:
echo   Clear cache: rmdir /s .next
echo   Reinstall:  rmdir /s node_modules
echo               npm install
echo.

echo For detailed instructions, see:
echo   - README.md
echo   - DEPLOYMENT_GUIDE.md
echo   - IMPLEMENTATION_DETAILS.md
echo.
pause
