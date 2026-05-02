# 🔧 Live Deployment Fix - Localhost URL Issues

## Problem
Application routes to localhost instead of production domain, causing navigation failures after login and page transitions in live environment.

## Root Cause
1. Hardcoded localhost in API calls
2. Missing production environment configuration
3. Incorrect .env.production setup

## Solution

### Step 1: Update .env.production

Replace `https://YOUR_BACKEND_DOMAIN.com` with your actual backend URL:

```env
# For example, if your backend is at:
VITE_API_URL=https://your-backend-domain.com
# Or
VITE_API_URL=https://your-app-backend.onrender.com
```

### Step 2: Build for Production

```bash
# From Frontend/smart-student-hub directory
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 3: Deploy Frontend

Upload the `dist/` folder to your hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **Traditional hosting**: FTP/SSH upload to web root

### Step 4: Verify Routing

The app uses React Router with proper SPA routing:
- ✅ All navigation uses React Router (navigate function)
- ✅ No hardcoded localhost URLs
- ✅ API calls use environment variables

### Step 5: Environment Variables Checklist

**Backend (.env):**
```
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
MONGODB_URI=your-production-mongodb
```

**Frontend (.env.production):**
```
VITE_API_URL=https://your-backend-domain.com
VITE_ENV=production
```

### Step 6: CORS Configuration

Ensure backend CORS allows your frontend domain:

```javascript
// Backend app.js
const cors = require('cors');

app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'], // Add production URL
  credentials: true
}));
```

## Common Issues & Fixes

### Issue: Still going to localhost after deploy
- ❌ You didn't update .env.production
- ✅ **Fix**: Update `VITE_API_URL` with your actual backend URL

### Issue: Login works but dashboard is blank
- ❌ API endpoint configuration is wrong
- ✅ **Fix**: Verify VITE_API_URL matches your backend domain

### Issue: Page navigation broken after login
- ❌ React Router configuration issue
- ✅ **Fix**: Ensure your hosting is configured for SPA (redirect 404s to index.html)

**For Vercel/Netlify:**
- Already configured for SPA, no action needed

**For Traditional Hosting:**
Create `.htaccess` in web root:
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

## Testing Before Deploy

```bash
# Build locally
npm run build

# Test build (install serve)
npx serve -s dist

# Visit http://localhost:3000 and test all routes
```

## File Locations to Check

- ✅ `Frontend/smart-student-hub/.env.production` - Update VITE_API_URL
- ✅ `Backend/.env` - Set FRONTEND_URL
- ✅ `Backend/app.js` - Check CORS configuration

## Production Checklist

- [ ] .env.production has correct VITE_API_URL
- [ ] Backend CORS includes frontend domain
- [ ] Backend .env has FRONTEND_URL set
- [ ] `npm run build` completes without errors
- [ ] dist/ folder created successfully
- [ ] Hosting configured for SPA routing
- [ ] Environment variables loaded in production
- [ ] Test all routes after deployment
