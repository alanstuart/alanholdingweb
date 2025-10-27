# Netlify Deployment Setup Guide

## Fix: Blog Not Showing Online

If your blog is not visible on your deployed site, it's most likely because **environment variables are missing in Netlify**.

### Quick Fix Steps

1. **Go to your Netlify dashboard**: https://app.netlify.com
2. **Select your site** (alanholding.co.uk)
3. **Navigate to**: Site Settings → Environment Variables
4. **Add these two variables**:

   ```
   VITE_SUPABASE_URL
   Value: https://ptsbcrvtcrdsqxoxkkhp.supabase.co
   ```

   ```
   VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0c2JjcnZ0Y3Jkc3F4b3hra2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTA0MjUsImV4cCI6MjA3NzE2NjQyNX0.XClHW9mhOYti40lL_D34Cvx5pARNxks1lw9MudpBD1k
   ```

5. **Redeploy your site**:
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"
   - Wait for the build to complete (~1-2 minutes)

6. **Test your blog**:
   - Visit: https://alanholding.co.uk/blog
   - You should now see 6 blog posts displayed

### Why This Happens

Environment variables in your local `.env` file are NOT automatically transferred to Netlify. You must manually add them to your Netlify site settings.

### Verification

After deployment, open your browser console (F12) and check for errors:
- ✅ No errors = Everything working
- ❌ See Supabase errors = Environment variables still not set correctly

### Current Blog Posts

Your Supabase database already has 6 published blog posts:
1. How Websites Can Improve Any Kind of Business
2. The Complete Guide to E-commerce Website Development
3. 5 Essential SEO Strategies for Small Businesses in 2025
4. Why Every Business Needs a Professional Website in 2025
5. Responsive Web Design: Best Practices for 2025
6. Digital Marketing Trends to Watch in 2025

These will appear automatically once the environment variables are configured.

### Build Settings (Should Already Be Correct)

If you need to verify your build settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 or higher

### Still Having Issues?

1. Check browser console (F12) for specific error messages
2. Check Netlify deploy logs for build errors
3. Verify environment variables are saved correctly (no extra spaces)
4. Try a hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
5. Clear browser cache and try again

### Screenshots for Help

If you need to see where to add environment variables in Netlify:
1. Netlify Dashboard → Your Site
2. Site Settings (top menu)
3. Environment Variables (left sidebar under "Build & deploy")
4. Click "Add a variable" button
5. Enter variable name and value
6. Click "Save"
7. Repeat for second variable
8. Go to Deploys and trigger a new deployment
