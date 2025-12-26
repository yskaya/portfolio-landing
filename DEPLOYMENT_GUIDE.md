# Deployment Guide for Portfolio Website

## Overview
This is a Next.js 15 application. The recommended deployment platform is **Vercel** (made by the Next.js team), but other options are available.

---

## Option 1: Deploy to Vercel (Recommended) ⭐

### Step 1: Prepare Your Code
1. Make sure your code is committed to Git (GitHub, GitLab, or Bitbucket)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login (free account works)
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js settings
5. Click **"Deploy"** (usually takes 2-3 minutes)
6. You'll get a URL like: `your-portfolio.vercel.app`

### Step 3: Connect Your GoDaddy Domain

#### In Vercel:
1. Go to your project dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `yulia.kanapatskaya.me`)
4. Click **"Add"**

#### In GoDaddy:
1. Log into your GoDaddy account
2. Go to **"My Products"** → **"DNS"** or **"Domain Manager"**
3. Find your domain and click **"DNS"** or **"Manage DNS"**
4. You'll see Vercel's DNS instructions. You need to add/edit these records:

   **Option A: Use CNAME (Easier - for subdomains like www or custom)**
   - Type: `CNAME`
   - Name: `@` (for root domain) or `www` (for www subdomain)
   - Value: `cname.vercel-dns.com`
   - TTL: `600` (or default)

   **Option B: Use A Record (For root domain)**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
   - TTL: `600`

   **Also add CNAME for www:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600`

5. **Remove conflicting records** (if you have other A or CNAME records pointing elsewhere)
6. Save changes

### Step 4: Wait for DNS Propagation
- DNS changes can take 24-48 hours, but usually work within 1-2 hours
- Check status in Vercel dashboard (it will show "Valid Configuration" when ready)

### Step 5: SSL Certificate
- Vercel automatically provides free SSL certificates (HTTPS)
- No action needed - it activates automatically once DNS is configured

---

## Option 2: Deploy to Netlify

### Step 1: Deploy
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git repository
4. Build settings:
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `.next` (but Netlify usually auto-detects Next.js)
5. Click **"Deploy site"**

### Step 2: Connect Domain
1. In Netlify: **Site settings** → **Domain management** → **Add custom domain**
2. Enter your domain
3. Follow Netlify's DNS instructions (similar to Vercel)

---

## Option 3: Deploy to GoDaddy Hosting (Not Recommended)

If you want to use GoDaddy's hosting:
1. You'll need to build the site locally: `npm run build`
2. Upload the `.next` folder and other files via FTP
3. Configure Node.js in GoDaddy hosting panel
4. This is more complex and not recommended for Next.js

---

## Quick Checklist

- [ ] Code is in Git repository (GitHub/GitLab/Bitbucket)
- [ ] Deployed to Vercel/Netlify
- [ ] Added custom domain in deployment platform
- [ ] Updated DNS records in GoDaddy
- [ ] Waited for DNS propagation (1-48 hours)
- [ ] Verified site works at your domain
- [ ] SSL certificate is active (automatic on Vercel/Netlify)

---

## Troubleshooting

### DNS Not Working?
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Verify DNS records match exactly what Vercel/Netlify shows
- Make sure no conflicting A/CNAME records exist
- Wait longer (can take up to 48 hours)

### Build Errors?
- Make sure all dependencies are in `package.json`
- Check build logs in deployment platform
- Test build locally: `npm run build`

### Domain Shows "Not Secure"?
- Wait for SSL certificate (automatic, usually 1-2 hours after DNS)
- Make sure you're using HTTPS, not HTTP

---

## Recommended: Use Vercel
- Free tier is generous
- Automatic SSL
- Perfect Next.js integration
- Easy domain management
- Fast global CDN
- Automatic deployments on Git push

---

## Need Help?
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- GoDaddy DNS Help: [godaddy.com/help](https://www.godaddy.com/help)
- Next.js Deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

