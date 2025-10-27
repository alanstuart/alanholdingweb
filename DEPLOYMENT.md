# Website Deployment Troubleshooting Guide

## Quick Fix Checklist

If your website appears blank online, follow this checklist in order:

### 1. Environment Variables (MOST COMMON ISSUE)
**Problem:** Missing environment variables cause the app to crash silently.

**How to Check:**
- Open browser developer console (F12)
- Look for error messages mentioning "Supabase" or "environment variables"

**How to Fix:**
```bash
# Your hosting platform needs these environment variables:
VITE_SUPABASE_URL=https://ptsbcrvtcrdsqxoxkkhp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0c2JjcnZ0Y3Jkc3F4b3hra2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTA0MjUsImV4cCI6MjA3NzE2NjQyNX0.XClHW9mhOYti40lL_D34Cvx5pARNxks1lw9MudpBD1k
```

**Platform-Specific Instructions:**

**Netlify:**
1. Go to Site Settings > Environment Variables
2. Add both variables above
3. Redeploy your site

**Vercel:**
1. Go to Project Settings > Environment Variables
2. Add both variables above
3. Redeploy from Deployments tab

**GitHub Pages:**
- Not recommended for this app (doesn't support environment variables at build time)
- Use Netlify or Vercel instead

---

### 2. Build Files Missing
**Problem:** The dist folder wasn't deployed or built correctly.

**How to Check:**
```bash
# Local check - verify dist folder has these files:
ls -la dist/
# Should see: index.html, assets/ folder, _redirects
```

**How to Fix:**
```bash
# Run build command locally
npm run build

# Verify output
ls -la dist/

# Deploy the dist folder contents
```

**Hosting Platform Setup:**
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18 or higher

---

### 3. Single Page Application (SPA) Routing
**Problem:** Routes like /blog or /thank-you show 404 errors.

**How to Check:**
- Navigate to https://yoursite.com/blog directly
- If you get a 404, SPA redirects aren't working

**How to Fix:**
The `_redirects` file should exist in your dist folder with:
```
/*    /index.html   200
```

**Platform-Specific:**

**Netlify:**
- Automatically reads `_redirects` file (already included)

**Vercel:**
- Create `vercel.json` in project root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### 4. JavaScript Console Errors
**Problem:** JavaScript errors prevent React from rendering.

**How to Check:**
1. Open browser (Chrome/Firefox)
2. Press F12 to open Developer Tools
3. Click "Console" tab
4. Refresh the page
5. Look for red error messages

**Common Errors and Fixes:**

**"Failed to fetch" errors:**
- Check if Supabase URL is correct
- Verify network connectivity
- Check CORS settings

**"Uncaught ReferenceError":**
- Check if all imports are correct
- Verify package.json dependencies are installed

---

### 5. CSS/Visual Issues
**Problem:** Content exists but is hidden or invisible.

**How to Check:**
1. Open Developer Tools (F12)
2. Click "Elements" or "Inspector" tab
3. Look for `<div id="root">`
4. Check if it has child elements inside

**How to Fix:**
```css
/* If text is invisible, check color contrast */
/* Look for issues in src/index.css */

body {
  color: #ffffff; /* Ensure text is visible */
}
```

---

### 6. Domain/DNS Issues
**Problem:** Domain doesn't resolve or shows wrong content.

**How to Check:**
```bash
# Check DNS resolution
nslookup alanholding.co.uk

# Check what's being served
curl -I https://alanholding.co.uk
```

**How to Fix:**
1. Verify DNS records point to hosting provider
2. Check CNAME file contains correct domain: `alanholding.co.uk`
3. Wait 24-48 hours for DNS propagation

**Cloudflare Users:**
- Set SSL/TLS to "Full" not "Flexible"
- Enable "Always Use HTTPS"

---

### 7. Browser Cache
**Problem:** Old version is cached, showing blank page.

**How to Check:**
- Try in Incognito/Private window
- If it works there, it's a cache issue

**How to Fix:**
```bash
# Clear cache shortcuts:
# Chrome/Edge: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
# Safari: Cmd+Option+E

# Or use hard refresh:
# Windows: Ctrl+F5
# Mac: Cmd+Shift+R
```

---

## Deployment Steps (Start to Finish)

### Prerequisites
```bash
# 1. Install dependencies
npm install

# 2. Create .env file with your credentials
cp .env.example .env
# Edit .env with your actual values
```

### Local Testing
```bash
# 1. Test development build
npm run dev
# Visit http://localhost:5173

# 2. Test production build
npm run build
npm run preview
# Visit http://localhost:4173
```

### Deploy to Netlify (Recommended)
```bash
# Option 1: Drag and Drop
1. Run: npm run build
2. Drag the 'dist' folder to https://app.netlify.com/drop

# Option 2: Git Integration
1. Push code to GitHub
2. Connect repository in Netlify
3. Set build settings:
   - Build command: npm run build
   - Publish directory: dist
4. Add environment variables (see section 1)
5. Deploy
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redeploy
vercel --prod
```

---

## Diagnostic Commands

Run these to gather information if stuck:

```bash
# Check build output
npm run build 2>&1 | tee build.log

# Check node/npm versions
node --version
npm --version

# Verify environment variables are loaded
npm run build -- --debug

# Test production build locally
npm run preview
```

---

## Getting Help

If you're still experiencing issues, gather this information:

1. **Browser Console Screenshot** (F12 > Console tab)
2. **Network Tab Screenshot** (F12 > Network tab, then refresh)
3. **Build Log** (from your hosting platform)
4. **URL** where the site is deployed
5. **Hosting Platform** (Netlify, Vercel, etc.)

Then check:
- Browser console for errors
- Hosting platform logs
- Network requests (are they reaching Supabase?)

---

## Prevention / Best Practices

1. **Always test production builds locally:**
   ```bash
   npm run build && npm run preview
   ```

2. **Use .env.example for documentation:**
   - Never commit .env to git
   - Document required variables in .env.example

3. **Monitor deployment:**
   - Check build logs after each deploy
   - Test the live site immediately after deployment

4. **Set up monitoring:**
   - Use Sentry or similar for error tracking
   - Set up uptime monitoring (UptimeRobot, etc.)

---

## Common Pitfalls

1. **Forgetting environment variables** - Most common cause
2. **Not running build command** - Deploying source instead of dist
3. **Missing _redirects file** - SPA routing breaks
4. **Wrong publish directory** - Should be 'dist', not root
5. **Node version mismatch** - Use Node 18+
