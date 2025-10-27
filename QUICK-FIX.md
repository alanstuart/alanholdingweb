# 🚨 BLANK WEBSITE QUICK FIX

## 1️⃣ FIRST: Check Browser Console

Press **F12** → Click **Console** tab → Look for errors

### If you see "Missing Supabase environment variables":
→ **Go to Step 2** (Environment Variables)

### If you see "404" or "Failed to load":
→ **Go to Step 3** (Build Files)

### If you see nothing at all:
→ **Go to Step 4** (Complete Rebuild)

---

## 2️⃣ Fix Environment Variables

### Netlify:
1. Go to: **Site Settings → Environment Variables**
2. Add these two variables:
```
VITE_SUPABASE_URL=https://gxohsuckrfwmzqnzvxjn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4b2hzdWNrcmZ3bXpxbnp2eGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MTc5MTMsImV4cCI6MjA3NzA5MzkxM30.apGis9krTyPZGC-QQpwPhw-ZsKV7jxJzIG7apgPeBBw
```
3. Click: **Deploys → Trigger Deploy → Deploy Site**

### Vercel:
1. Go to: **Settings → Environment Variables**
2. Add the same two variables above
3. Go to: **Deployments → Click latest → Redeploy**

---

## 3️⃣ Rebuild & Redeploy

```bash
# Run these commands in your terminal:

npm install
npm run build
```

Then deploy the **dist** folder to your hosting platform.

---

## 4️⃣ Nuclear Option (Complete Reset)

```bash
# Delete everything and start fresh:

rm -rf node_modules dist
npm install
npm run build
npm run preview
```

If it works locally (http://localhost:4173), then redeploy.

---

## 5️⃣ Still Broken? Check These:

- [ ] Did you wait 2-3 minutes after deployment?
- [ ] Did you hard refresh? (Ctrl+Shift+R or Cmd+Shift+R)
- [ ] Try in Incognito/Private window
- [ ] Check hosting platform build logs for errors
- [ ] Verify your hosting platform's "Publish Directory" is set to: **dist**
- [ ] Verify "Build Command" is set to: **npm run build**

---

## 🆘 Emergency Contact

If nothing works, gather:
1. Screenshot of browser console (F12)
2. URL of your deployed site
3. Hosting platform name

And review the full DEPLOYMENT.md guide.
