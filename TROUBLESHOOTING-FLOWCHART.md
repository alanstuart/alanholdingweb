# 🔧 Blank Website Troubleshooting Flowchart

```
START: Website is blank
         |
         v
    Open Browser
    Console (F12)
         |
         v
  Do you see errors?
    /            \
  YES            NO
   |              |
   v              v
Check error     Is page
message type    loading?
   |              |
   |              v
   |         Check Network
   |         Tab (F12)
   |              |
   v              v
┌──────────────┐ Are there
│ ERROR TYPES  │ requests?
└──────────────┘   |
                   |
                   v
1. "Missing Supabase environment variables"
   → FIX: Add environment variables to hosting platform
   → Go to: DEPLOYMENT.md Section 1

2. "Failed to fetch" / Network errors
   → FIX: Check Supabase URL is correct
   → FIX: Verify internet connectivity
   → Go to: DEPLOYMENT.md Section 4

3. "404 Not Found" on routes (/blog, etc.)
   → FIX: SPA routing not configured
   → Verify _redirects file exists
   → Go to: DEPLOYMENT.md Section 3

4. "Cannot read property" / JavaScript errors
   → FIX: Dependencies issue
   → Run: npm install && npm run build
   → Go to: DEPLOYMENT.md Section 2

5. No errors, but blank page
   → FIX: CSS hiding content
   → Check body.dark-theme in DevTools
   → Go to: DEPLOYMENT.md Section 5

6. No dist folder or missing files
   → FIX: Build not completed
   → Run: npm run build
   → Go to: DEPLOYMENT.md Section 2

┌────────────────────────────────┐
│  DEPLOYMENT PLATFORM CHECKS    │
└────────────────────────────────┘

Netlify:
  ✓ Build Command: npm run build
  ✓ Publish Directory: dist
  ✓ Environment Variables set
  ✓ Node Version: 18+

Vercel:
  ✓ Build Command: npm run build
  ✓ Output Directory: dist
  ✓ Environment Variables set
  ✓ Node Version: 18+

┌────────────────────────────────┐
│     QUICK DIAGNOSTIC TESTS     │
└────────────────────────────────┘

Test 1: Local Build
  $ npm run build
  $ npm run preview
  → If works locally but not online = Environment variable issue

Test 2: Incognito Mode
  → If works in incognito = Cache issue
  → Fix: Hard refresh (Ctrl+Shift+R)

Test 3: Different Browser
  → If works in another browser = Browser-specific issue
  → Fix: Clear cache and cookies

Test 4: Direct URL Test
  → Try: yoursite.com/blog
  → If 404 = SPA routing issue
  → Fix: Add _redirects file

┌────────────────────────────────┐
│      PRIORITY ORDER FIX        │
└────────────────────────────────┘

Priority 1 (Most Common):
  → Missing environment variables
  → Fix: Add to hosting platform

Priority 2:
  → Build files missing/outdated
  → Fix: Run npm run build

Priority 3:
  → SPA routing not configured
  → Fix: Verify _redirects file

Priority 4:
  → Cache issues
  → Fix: Hard refresh / Incognito

Priority 5:
  → DNS/Domain issues
  → Fix: Check DNS records

┌────────────────────────────────┐
│     VERIFICATION COMMAND       │
└────────────────────────────────┘

Run this before every deployment:

  $ ./verify-deployment.sh

This checks:
  ✓ dist folder exists
  ✓ All required files present
  ✓ Environment variables set
  ✓ Build output sizes
  ✓ Configuration correct

┌────────────────────────────────┐
│      EMERGENCY RESET           │
└────────────────────────────────┘

If nothing works, complete reset:

  $ rm -rf node_modules dist
  $ npm install
  $ npm run build
  $ ./verify-deployment.sh
  $ [Deploy to hosting]

Then verify:
  1. Check browser console
  2. Test all routes
  3. Verify database connectivity

┌────────────────────────────────┐
│      SUCCESS INDICATORS        │
└────────────────────────────────┘

Website is working if:
  ✓ Homepage loads with content
  ✓ No console errors
  ✓ Routes work (/blog, /thank-you)
  ✓ Images display
  ✓ Forms submit correctly
  ✓ Database queries succeed

┌────────────────────────────────┐
│      MONITORING SETUP          │
└────────────────────────────────┘

Prevent future issues:

1. Uptime Monitoring
   → UptimeRobot (free)
   → Pingdom
   → StatusCake

2. Error Tracking
   → Sentry (free tier)
   → LogRocket
   → Rollbar

3. Performance
   → Google Lighthouse
   → WebPageTest
   → GTmetrix

4. Deploy Notifications
   → Slack integration
   → Email alerts
   → Discord webhooks
```

## Quick Reference Commands

```bash
# Build for production
npm run build

# Test production locally
npm run preview

# Verify deployment readiness
./verify-deployment.sh

# Clean rebuild
rm -rf node_modules dist && npm install && npm run build

# Check environment
cat .env

# View build output
ls -lh dist/
```

## Platform-Specific URLs

**Netlify:**
- Dashboard: https://app.netlify.com
- Build logs: Site → Deploys → [Latest] → Deploy log
- Environment: Site Settings → Build & deploy → Environment

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Build logs: Project → Deployments → [Latest] → Build Logs
- Environment: Project → Settings → Environment Variables

## Support Resources

1. **Full Guide:** DEPLOYMENT.md
2. **Quick Fix:** QUICK-FIX.md
3. **This Flowchart:** TROUBLESHOOTING-FLOWCHART.md
4. **Verification:** ./verify-deployment.sh
