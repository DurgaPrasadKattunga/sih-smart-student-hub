# ✅ Backend Configuration for Live Deployment

## Issue
Frontend can't connect to backend or routes to localhost in production.

## Backend .env Configuration

Create/Update `Backend/.env` with these variables:

```env
# ============================================
# Server Configuration
# ============================================
PORT=5000
NODE_ENV=production

# ============================================
# Frontend URL (your deployed frontend)
# ============================================
FRONTEND_URL=https://your-frontend-domain.com

# Examples:
# FRONTEND_URL=https://smart-student-hub.vercel.app
# FRONTEND_URL=https://smart-student-hub.netlify.app
# FRONTEND_URL=https://yourdomain.com

# ============================================
# Database
# ============================================
MONGODB_URI=your_production_mongodb_uri

# ============================================
# OAuth & Security
# ============================================
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
JWT_SECRET=your-jwt-secret

# ============================================
# API Settings
# ============================================
API_PORT=5000
```

## Backend app.js - CORS Configuration

In your `Backend/app.js`, ensure CORS is properly configured:

```javascript
const cors = require('cors');

// Production CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,  // Your deployed frontend
    'http://localhost:5173',    // Local development (remove in production)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

## Test Backend Endpoint

```bash
# Test if backend is accessible
curl https://your-backend-url.com/api/health

# Should return: { "status": "ok" }
```

## Environment Variable Examples

### For Vercel/Render Deployment

**Frontend (.env.production):**
```
VITE_API_URL=https://your-backend-name.onrender.com
```

**Backend (.env):**
```
FRONTEND_URL=https://your-frontend-name.vercel.app
```

### For Self-Hosted

**Frontend (.env.production):**
```
VITE_API_URL=https://api.yourdomain.com
```

**Backend (.env):**
```
FRONTEND_URL=https://yourdomain.com
```

## Deployment Checklist

- [ ] Backend .env has FRONTEND_URL set to your live frontend URL
- [ ] Frontend .env.production has VITE_API_URL set to your live backend URL
- [ ] Backend CORS includes your frontend domain
- [ ] Backend running on live server
- [ ] Frontend build (`npm run build`) completed successfully
- [ ] `dist/` folder deployed to live hosting
- [ ] Tested login flow on live site
- [ ] No console errors about localhost

## Quick Debug

If still getting localhost errors:

1. **Check what URL frontend is trying to use:**
   ```bash
   # In browser console
   console.log(import.meta.env.VITE_API_URL)
   ```
   Should show your live backend URL, not localhost

2. **Check backend is accessible:**
   ```bash
   curl -i https://your-backend-url.com/api/health
   ```
   Should return 200 status

3. **Check CORS headers:**
   ```bash
   curl -i -X OPTIONS https://your-backend-url.com/api/auth/login \
     -H "Origin: https://your-frontend-url.com"
   ```
   Should include `Access-Control-Allow-Origin` header
