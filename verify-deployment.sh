#!/bin/bash

echo "=========================================="
echo "🔍 Deployment Verification Script"
echo "=========================================="
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
  echo "❌ FAIL: dist folder not found"
  echo "   Run: npm run build"
  exit 1
fi
echo "✅ dist folder exists"

# Check for index.html
if [ ! -f "dist/index.html" ]; then
  echo "❌ FAIL: dist/index.html not found"
  exit 1
fi
echo "✅ index.html exists"

# Check for assets folder
if [ ! -d "dist/assets" ]; then
  echo "❌ FAIL: dist/assets folder not found"
  exit 1
fi
echo "✅ assets folder exists"

# Check for JavaScript bundle
if ! ls dist/assets/*.js &> /dev/null; then
  echo "❌ FAIL: No JavaScript bundles found in dist/assets"
  exit 1
fi
echo "✅ JavaScript bundle exists"

# Check for CSS file
if ! ls dist/assets/*.css &> /dev/null; then
  echo "❌ FAIL: No CSS files found in dist/assets"
  exit 1
fi
echo "✅ CSS file exists"

# Check for _redirects file
if [ ! -f "dist/_redirects" ]; then
  echo "⚠️  WARNING: _redirects file not found (needed for SPA routing)"
else
  echo "✅ _redirects file exists"
fi

# Check .env file
if [ ! -f ".env" ]; then
  echo "⚠️  WARNING: .env file not found"
  echo "   Create one using .env.example as template"
else
  echo "✅ .env file exists"

  # Check for required environment variables
  if grep -q "VITE_SUPABASE_URL" .env && grep -q "VITE_SUPABASE_ANON_KEY" .env; then
    echo "✅ Environment variables configured"
  else
    echo "❌ FAIL: Missing required environment variables in .env"
    echo "   Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY"
    exit 1
  fi
fi

# Check package.json scripts
if ! grep -q '"build":' package.json; then
  echo "❌ FAIL: build script not found in package.json"
  exit 1
fi
echo "✅ Build script configured"

# Get file sizes
INDEX_SIZE=$(wc -c < "dist/index.html")
JS_SIZE=$(du -ch dist/assets/*.js | grep total | awk '{print $1}')
CSS_SIZE=$(du -ch dist/assets/*.css | grep total | awk '{print $1}')

echo ""
echo "=========================================="
echo "📦 Build Output Summary"
echo "=========================================="
echo "index.html size: ${INDEX_SIZE} bytes"
echo "JavaScript size: ${JS_SIZE}"
echo "CSS size: ${CSS_SIZE}"
echo ""

# Final checks
echo "=========================================="
echo "🎯 Pre-Deployment Checklist"
echo "=========================================="
echo ""
echo "Before deploying, ensure your hosting platform has:"
echo ""
echo "1. Build Command: npm run build"
echo "2. Publish Directory: dist"
echo "3. Node Version: 18 or higher"
echo ""
echo "4. Environment Variables:"
echo "   VITE_SUPABASE_URL=https://gxohsuckrfwmzqnzvxjn.supabase.co"
echo "   VITE_SUPABASE_ANON_KEY=<your-key-here>"
echo ""
echo "=========================================="
echo "✅ All checks passed! Ready to deploy."
echo "=========================================="
