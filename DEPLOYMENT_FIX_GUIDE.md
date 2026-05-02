# 🚀 Quick Deployment Guide - Fix Localhost Issues

## The Problem You're Experiencing
When deployed to live, the app sometimes routes to `localhost:3000` or `localhost:5173`, causing:
- ❌ Navigation failures after login
- ❌ API calls breaking  
- ❌ Page transitions not working
- ❌ 404 errors

## The Solution - 3 Steps

### STEP 1: Update Production Environment Variables

**Location:** `Frontend/smart-student-hub/.env.production`

Find this line:
```env
VITE_API_URL=https://YOUR_BACKEND_DOMAIN.com
```

Replace `YOUR_BACKEND_DOMAIN.com` with your ACTUAL backend URL:

**Examples:**
```env
# If using Heroku
VITE_API_URL=https://your-app-name-backend.herokuapp.com

# If using Render
VITE_API_URL=https://your-backend-name.onrender.com

# If using custom domain
VITE_API_URL=https://api.yourcompany.com

# If using same domain (backend at /api)
VITE_API_URL=https://yourcompany.com/api
```

### STEP 2: Build for Production

In your terminal, navigate to the frontend folder and run:

```bash
cd Frontend/smart-student-hub
npm run build
```

This creates an optimized `dist/` folder - this is what you deploy!

### STEP 3: Deploy to Live Server

**Option A: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Option B: Netlify**
- Go to https://app.netlify.com
- Drag and drop the `dist/` folder
- Done! ✅

**Option C: Traditional Hosting (Shared/VPS)**
1. FTP/SFTP into your server
2. Upload contents of `dist/` folder to `public_html/` or web root
3. Create `.htaccess` file in web root with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Verification Checklist

After deployment, verify these things work:

✅ **Before deploying:**
- [ ] Updated `.env.production` with correct backend URL
- [ ] Ran `npm run build` successfully
- [ ] `dist/` folder created without errors

✅ **After deploying:**
- [ ] Homepage loads correctly
- [ ] Login page works
- [ ] Can login successfully
- [ ] Dashboard loads after login
- [ ] Can navigate between pages
- [ ] No console errors about `localhost`
- [ ] API calls go to your live backend, not localhost

## Test Your Build Locally

Before deploying to live, test the production build:

```bash
# From Frontend/smart-student-hub directory
npm run build
npm run preview
```

This opens a preview of your production build at `http://localhost:4173`. Test all features here first!

## If It Still Goes to Localhost

1. **Check .env.production is actually being used:**
   - Verify you updated the file
   - Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear browser cache

2. **Check backend CORS is configured:**
   
   In your `Backend/app.js`, add:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
     credentials: true
   }));
   ```

3. **Verify backend .env:**
   ```
   FRONTEND_URL=https://your-frontend-domain.com
   ```

4. **Check backend is running on live:**
   - Test: `curl https://your-backend-domain.com/api/health`
   - Should return 200, not error

## Common Mistakes to Avoid

❌ **Don't:**
- Forget to update `.env.production`
- Deploy old code without running `npm run build`
- Use localhost URLs in production code
- Forget to set backend CORS

✅ **Do:**
- Always update `.env.production` with live backend URL
- Always run `npm run build` before deploying
- Test with `npm run preview` before deploying
- Verify CORS settings on backend

## Getting Your Backend URL

**If using Heroku:**
- Your backend URL: `https://your-app-name-backend.herokuapp.com`

**If using Render:**
- Your backend URL: `https://your-service-name.onrender.com`

**If using custom domain:**
- Your backend URL: `https://yourdomain.com` or `https://api.yourdomain.com`

---

**Need help?** Share the error message you're seeing and we'll fix it!
