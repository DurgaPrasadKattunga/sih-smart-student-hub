# 🔧 Quick URL Configuration Guide

**IMPORTANT**: This guide shows you exactly how to fix all localhost URLs for live deployment.

---

## ⚡ 5-Minute Setup

### Step 1: Update Backend URLs

**File**: `Backend/.env`

Change this:
```env
ALLOWED_ORIGINS=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

To this (replace `your-domain.com` with YOUR actual domain):
```env
ALLOWED_ORIGINS=https://your-frontend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

### Step 2: Update Frontend URLs  

**File**: `Frontend/smart-student-hub/.env.production`

Change this:
```env
VITE_API_URL=http://localhost:5000
```

To this (replace `your-api.com` with YOUR actual backend domain):
```env
VITE_API_URL=https://your-backend-domain.com
```

### Step 3: Update OAuth URLs

**File**: `Backend/.env`

Change this:
```env
MICROSOFT_CALLBACK_URL=http://localhost:3000/auth/microsoft/callback
```

To this:
```env
MICROSOFT_CALLBACK_URL=https://your-backend-domain.com/auth/microsoft/callback
```

### Step 4: Build & Deploy

```bash
# Frontend
cd Frontend/smart-student-hub
npm run build
# Deploy the 'dist' folder

# Backend
cd Backend
npm start
# Deploy this folder with the .env file
```

---

## 📍 Common Domain Examples

### Render.com Deployment
```env
# Backend (app.onrender.com domain)
ALLOWED_ORIGINS=https://my-frontend.onrender.com
FRONTEND_URL=https://my-frontend.onrender.com
MICROSOFT_CALLBACK_URL=https://my-backend.onrender.com/auth/microsoft/callback

# Frontend
VITE_API_URL=https://my-backend.onrender.com
```

### Vercel + Custom Backend
```env
# Backend
ALLOWED_ORIGINS=https://my-app.vercel.app
FRONTEND_URL=https://my-app.vercel.app

# Frontend
VITE_API_URL=https://my-backend.herokuapp.com
```

### Custom Domain
```env
# Backend
ALLOWED_ORIGINS=https://app.mycompany.com
FRONTEND_URL=https://app.mycompany.com
MICROSOFT_CALLBACK_URL=https://api.mycompany.com/auth/microsoft/callback

# Frontend
VITE_API_URL=https://api.mycompany.com
```

---

## ❌ Common Mistakes

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `http://localhost:5173` | `https://your-domain.com` |
| `localhost:5000` | `https://your-api.com` |
| Missing `https://` | `https://your-domain.com` |
| `http://` (insecure) | `https://` (secure) |
| Multiple domains without comma | `https://app.com,https://www.app.com` |

---

## ✅ Verification Checklist

- [ ] Backend `.env` has `ALLOWED_ORIGINS=https://your-frontend.com`
- [ ] Frontend `.env.production` has `VITE_API_URL=https://your-backend.com`
- [ ] All URLs use `https://` (not http://)
- [ ] No `localhost` in production .env files
- [ ] OAuth callback URL updated to production domain
- [ ] Database connection string is correct
- [ ] Cloudinary credentials are set
- [ ] JWT and Session secrets are unique and secure

---

## 🚀 Deploy!

Once you've updated the URLs:

1. **Backend**: Push to your hosting (Render, Heroku, etc.)
2. **Frontend**: Run `npm run build` then deploy the `dist` folder
3. **Test**: Visit your frontend URL and try login/upload
4. **Check console** for any errors if something doesn't work

---

## 🐛 Troubleshooting

**Error**: "CORS error in browser console"
- **Fix**: Check `ALLOWED_ORIGINS` matches your frontend exact domain

**Error**: "Cannot connect to API"
- **Fix**: Check `VITE_API_URL` matches your backend exact domain  

**Error**: "OAuth fails"
- **Fix**: Update Azure portal OAuth redirect URI to match backend domain

**Error**: "Images not loading"
- **Fix**: Check Cloudinary credentials in backend `.env`

---

**Need the full guide?** See [DEPLOYMENT_CONFIGURATION.md](./DEPLOYMENT_CONFIGURATION.md)
