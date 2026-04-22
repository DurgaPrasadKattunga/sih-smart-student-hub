# 🚀 Deployment Configuration Guide

Complete guide to configure Smart Student Hub for live deployment with proper URL management.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Environment Variables](#environment-variables)
3. [Development Setup](#development-setup)
4. [Production Setup](#production-setup)
5. [Deployment Checklist](#deployment-checklist)

---

## Overview

The application uses **environment variables** to manage different URLs for:
- ✅ **Development**: localhost (port 5000 backend, port 5173 frontend)
- ✅ **Production**: Your custom domain or cloud deployment URL

### Key Components

| Component | Default Dev | Needs Update |
|-----------|-------------|--------------|
| **Backend API** | `http://localhost:5000` | ✅ Your backend domain |
| **Frontend** | `http://localhost:5173` | ✅ Your frontend domain |
| **CORS Origins** | `localhost:5173` | ✅ Production frontend URL |
| **OAuth Callback** | `http://localhost:3000/...` | ✅ Your domain |

---

## Environment Variables

### Backend Configuration (`.env`)

```env
# ============================================
# Server Configuration
# ============================================
PORT=5000
NODE_ENV=production

# ============================================
# Frontend URL (for redirects & links)
# ============================================
FRONTEND_URL=https://your-frontend-domain.com

# ============================================
# CORS Origins (comma-separated)
# ============================================
# Multiple domains allowed:
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com,https://app.your-domain.com

# ============================================
# Microsoft OAuth Callback
# ============================================
MICROSOFT_CALLBACK_URL=https://your-backend-domain.com/auth/microsoft/callback

# ============================================
# Database
# ============================================
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# ============================================
# JWT & Security
# ============================================
JWT_SECRET=your-very-long-secure-random-string-min-32-chars
SESSION_SECRET=your-another-secure-random-string-min-32-chars

# ============================================
# Cloudinary (File Upload)
# ============================================
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend Configuration (`.env.local`)

```env
# ============================================
# Backend API URL
# ============================================
VITE_API_URL=https://your-backend-domain.com

# ============================================
# Environment
# ============================================
VITE_ENV=production
```

---

## Development Setup

### Step 1: Create Backend `.env`

```bash
cd Backend
cp .env.example .env
```

**Edit `.env`**:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=dev-secret-change-in-production
SESSION_SECRET=dev-session-secret-change-in-production
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
MICROSOFT_CLIENT_ID=your-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret
MICROSOFT_CALLBACK_URL=http://localhost:5000/auth/microsoft/callback
```

### Step 2: Create Frontend `.env.local`

```bash
cd Frontend/smart-student-hub
cp .env.example .env.local
```

**Edit `.env.local`**:
```env
VITE_API_URL=http://localhost:5000
VITE_ENV=development
```

### Step 3: Start Development Servers

**Terminal 1 - Backend**:
```bash
cd Backend
npm install
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend**:
```bash
cd Frontend/smart-student-hub
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Production Setup

### Step 1: Choose Your Hosting

#### Option A: Render.com (Recommended - Free tier available)

**Backend Deployment**:
1. Connect your GitHub repo
2. Create new Web Service
3. Set environment variables in Render dashboard
4. Backend URL: `https://your-app-name.onrender.com`

**Frontend Deployment**:
1. Connect your GitHub repo
2. Create new Static Site
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Frontend URL: `https://your-app-name.vercel.app` or `https://your-app-name.onrender.com`

#### Option B: Vercel (Frontend) + Any Backend (Backend)

**Frontend**:
```bash
npm run build
vercel deploy
# Frontend URL: https://your-project.vercel.app
```

**Backend**: Deploy to Render, Heroku, DigitalOcean, etc.

#### Option C: Custom Domain with Your Provider

### Step 2: Backend Environment Setup (Production)

**On your hosting platform, set these variables**:

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com

# CORS Origins - Your actual frontend domain
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com

# OAuth
MICROSOFT_CLIENT_ID=your-production-client-id
MICROSOFT_CLIENT_SECRET=your-production-client-secret
MICROSOFT_CALLBACK_URL=https://your-backend-domain.com/auth/microsoft/callback

# Database
MONGODB_URI=mongodb+srv://prod_user:prod_password@cluster.mongodb.net/prod_db

# Security (Generate new secure strings!)
JWT_SECRET=your-new-production-jwt-secret-min-32-chars-random
SESSION_SECRET=your-new-production-session-secret-min-32-chars-random

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 3: Frontend Environment Setup (Production)

**Create `.env.production` in Frontend/smart-student-hub**:

```env
VITE_API_URL=https://your-backend-domain.com
VITE_ENV=production
```

**Or set during build**:
```bash
VITE_API_URL=https://your-backend-domain.com npm run build
```

### Step 4: Build & Deploy Frontend

```bash
cd Frontend/smart-student-hub

# Build for production
npm run build

# Output: dist/ folder ready to deploy
```

---

## URL Mapping Examples

### Example 1: Render.com Deployment

**Backend**: `https://sih-backend.onrender.com`
**Frontend**: `https://sih-frontend.onrender.com`

```env
# Backend .env
ALLOWED_ORIGINS=https://sih-frontend.onrender.com
FRONTEND_URL=https://sih-frontend.onrender.com

# Frontend .env.production
VITE_API_URL=https://sih-backend.onrender.com
```

### Example 2: Custom Domain

**Backend**: `https://api.smart-student-hub.com`
**Frontend**: `https://app.smart-student-hub.com`

```env
# Backend .env
ALLOWED_ORIGINS=https://app.smart-student-hub.com,https://www.smart-student-hub.com
FRONTEND_URL=https://app.smart-student-hub.com
MICROSOFT_CALLBACK_URL=https://api.smart-student-hub.com/auth/microsoft/callback

# Frontend .env.production
VITE_API_URL=https://api.smart-student-hub.com
```

### Example 3: Subpath Deployment

**Backend**: `https://your-domain.com/api`
**Frontend**: `https://your-domain.com`

```env
# Backend .env
ALLOWED_ORIGINS=https://your-domain.com

# Frontend .env.production
VITE_API_URL=https://your-domain.com/api
```

---

## Deployment Checklist

### Pre-Deployment ✅

- [ ] All localhost references removed
- [ ] Environment variables set correctly
- [ ] Database connection string verified
- [ ] Cloudinary API keys configured
- [ ] Microsoft OAuth credentials updated
- [ ] JWT secrets are unique & secure
- [ ] CORS origins match your domains
- [ ] Frontend builds without errors: `npm run build`
- [ ] Backend runs without errors: `npm start`

### During Deployment ✅

- [ ] Set all environment variables on hosting platform
- [ ] Deploy backend first
- [ ] Test backend API: `https://your-backend.com/api/health` (if endpoint exists)
- [ ] Deploy frontend
- [ ] Test frontend loads correctly
- [ ] Test student login flow
- [ ] Test certificate upload
- [ ] Test teacher review workflow

### Post-Deployment ✅

- [ ] Monitor error logs
- [ ] Test all major features
- [ ] Verify CORS is working (check browser console for errors)
- [ ] Test OAuth authentication
- [ ] Verify file uploads work (Cloudinary)
- [ ] Monitor socket.io connections
- [ ] Set up SSL/HTTPS (should be automatic)

---

## Common Issues & Solutions

### Issue: "CORS error" in Browser Console

**Solution**: Update `ALLOWED_ORIGINS` to match your frontend domain

```env
# ❌ Wrong
ALLOWED_ORIGINS=http://localhost:5173

# ✅ Correct
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Issue: API Returns 404 (Cannot find routes)

**Solution**: Verify backend URL is correct in frontend

```env
# Check this in Frontend .env.production
VITE_API_URL=https://your-correct-backend-domain.com
```

### Issue: Socket.IO Connection Fails

**Solution**: Ensure Socket.IO CORS is configured (already done in app.js)

```javascript
// This is now in app.js
origin: allowedOrigins,  // Uses ALLOWED_ORIGINS env var
```

### Issue: OAuth Callback Error

**Solution**: Update Microsoft OAuth settings

1. Go to [Azure Portal](https://portal.azure.com)
2. Update **Redirect URI** to: `https://your-backend-domain.com/auth/microsoft/callback`
3. Update backend `.env`: 
```env
MICROSOFT_CALLBACK_URL=https://your-backend-domain.com/auth/microsoft/callback
```

### Issue: Cloudinary Upload Fails

**Solution**: Verify credentials in `.env`

```env
CLOUDINARY_CLOUD_NAME=your-exact-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Environment Variables Reference

| Variable | Backend | Frontend | Example | Notes |
|----------|---------|----------|---------|-------|
| `PORT` | ✅ | ❌ | `5000` | Backend server port |
| `NODE_ENV` | ✅ | ❌ | `production` | Node environment |
| `VITE_API_URL` | ❌ | ✅ | `https://api.domain.com` | Backend URL for frontend |
| `FRONTEND_URL` | ✅ | ❌ | `https://app.domain.com` | For redirects |
| `ALLOWED_ORIGINS` | ✅ | ❌ | `https://domain.com` | CORS origins (comma-separated) |
| `MONGODB_URI` | ✅ | ❌ | `mongodb+srv://...` | Database connection |
| `JWT_SECRET` | ✅ | ❌ | Random 32+ chars | Must be unique & secure |
| `CLOUDINARY_*` | ✅ | ❌ | From Cloudinary | File upload credentials |
| `MICROSOFT_*` | ✅ | ❌ | From Azure | OAuth credentials |

---

## Quick Deploy Commands

### Backend (Render.com example)
```bash
cd Backend
git add .
git commit -m "Production deployment"
git push origin main
# Render auto-deploys on push
```

### Frontend (Vercel example)
```bash
cd Frontend/smart-student-hub
npm run build
vercel deploy --prod
```

---

## Need Help?

Troubleshooting URLs:
1. Check browser console for CORS errors
2. Check backend logs for connection issues
3. Verify all environment variables are set
4. Test API directly: `curl https://your-backend-domain.com/api/health`
5. Check proxy configuration in vite.config.js

**Next Steps**:
- [ ] Create `.env` files with your actual URLs
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Test all features
- [ ] Monitor logs for errors
