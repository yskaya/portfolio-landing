# Domain Setup Guide: skaya.me → Vercel

## Step 1: Add Domain in Vercel

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Click on your **portfolio-landing** project
3. Go to **Settings** → **Domains**
4. In the "Add Domain" field, enter: `skaya.me`
5. Click **Add**
6. Vercel will show you DNS configuration instructions

## Step 2: Configure DNS in GoDaddy

### Option A: Use Vercel's Nameservers (Recommended - Easier)

1. Log into **GoDaddy** → https://www.godaddy.com
2. Go to **My Products** → Find `skaya.me` → Click **DNS** (or **Manage DNS**)
3. Scroll down to **Nameservers** section
4. Click **Change** or **Edit**
5. Select **Custom** nameservers
6. Replace with Vercel's nameservers (Vercel will show these in the domain settings):
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
7. Click **Save**
8. Wait 24-48 hours for DNS propagation

### Option B: Keep GoDaddy Nameservers (Use DNS Records)

If you want to keep GoDaddy's nameservers, you need to add DNS records:

1. Log into **GoDaddy** → **My Products** → `skaya.me` → **DNS**
2. Go to **DNS Records** section
3. **Delete conflicting records** (any existing A or CNAME for root domain)
4. Add these records:

   **For Root Domain (skaya.me):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (or the IP Vercel shows you)
   - TTL: `600` (or `Automatic`)

   **For WWW (www.skaya.me):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600` (or `Automatic`)

5. Click **Save**
6. Wait 1-24 hours for DNS propagation

## Step 3: Verify Configuration

### In Vercel:
- Go to **Settings** → **Domains**
- You should see `skaya.me` with status:
  - ⏳ **Pending** = DNS is propagating (wait 1-48 hours)
  - ✅ **Valid Configuration** = DNS is correct, waiting for SSL
  - ✅ **Ready** = Domain is live!

### Check DNS Propagation:
- Visit: https://www.whatsmydns.net
- Enter: `skaya.me`
- Check if A record points to Vercel's IP

## Step 4: SSL Certificate (Automatic)

- Vercel automatically provisions SSL certificates
- Takes 1-2 hours after DNS is configured
- No action needed from you

## Troubleshooting

### Domain Not Working After 24 Hours?

1. **Check DNS Records:**
   - Make sure no conflicting A/CNAME records exist
   - Verify records match exactly what Vercel shows

2. **Clear DNS Cache:**
   ```bash
   # On Mac/Linux:
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Or use Google DNS:
   # 8.8.8.8 and 8.8.4.4
   ```

3. **Verify in Vercel:**
   - Settings → Domains → Check for error messages
   - Vercel will show specific errors if DNS is misconfigured

4. **Common Issues:**
   - ❌ Wrong IP address in A record
   - ❌ Conflicting DNS records
   - ❌ DNS not propagated yet (can take up to 48 hours)
   - ❌ Nameservers not updated (if using Option A)

### Domain Shows "Not Secure"?
- Wait 1-2 hours after DNS is configured
- SSL certificate is automatic but takes time

## Quick Checklist

- [ ] Added `skaya.me` in Vercel domain settings
- [ ] Updated DNS records in GoDaddy (Option A or B)
- [ ] Removed conflicting DNS records
- [ ] Waited for DNS propagation (1-48 hours)
- [ ] Verified domain status in Vercel dashboard
- [ ] SSL certificate is active (automatic)

## Secondary Domain: kanapatskaya.me

If you want to also use `kanapatskaya.me`:

1. Add it in Vercel: **Settings** → **Domains** → Add `kanapatskaya.me`
2. Configure DNS in GoDaddy the same way as `skaya.me`
3. Both domains will point to the same Vercel deployment

---

## Need Help?

- Vercel Domain Docs: https://vercel.com/docs/concepts/projects/domains
- GoDaddy DNS Help: https://www.godaddy.com/help
- Check DNS: https://www.whatsmydns.net

