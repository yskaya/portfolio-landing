# Detailed GoDaddy DNS Setup Guide for skaya.me → Vercel

## Prerequisites
- ✅ Your website is deployed on Vercel
- ✅ You have added `skaya.me` in Vercel Settings → Domains
- ✅ You have your GoDaddy account login credentials

---

## Method 1: Update DNS Records (Keep GoDaddy Nameservers)

### Step 1: Get DNS Information from Vercel

1. Go to **https://vercel.com/dashboard**
2. Click on your **portfolio-landing** project
3. Click **Settings** (top navigation bar)
4. Click **Domains** (left sidebar)
5. Find `skaya.me` in the list
6. Click on `skaya.me` to see DNS configuration
7. **Write down these values:**
   - **A Record IP Address** (usually `76.76.21.21` or similar)
   - **CNAME value** (usually `cname.vercel-dns.com`)

---

### Step 2: Log into GoDaddy

1. Go to **https://www.godaddy.com**
2. Click **Sign In** (top right)
3. Enter your email and password
4. Click **Sign In**

---

### Step 3: Navigate to DNS Management

1. After logging in, you'll see the **My Products** page
2. If not, click **My Products** in the top navigation
3. Scroll down to find **Domains** section
4. Find **skaya.me** in the list
5. Click the **DNS** button next to `skaya.me`
   - OR click the **three dots (⋯)** menu → **Manage DNS**

---

### Step 4: View Current DNS Records

You'll see a table with DNS records. Common records you might see:
- **A** records (points to IP addresses)
- **CNAME** records (points to other domains)
- **MX** records (for email - **DO NOT DELETE THESE**)
- **TXT** records (for verification - **DO NOT DELETE THESE**)

**⚠️ IMPORTANT:**
- **DO NOT DELETE** MX records (email)
- **DO NOT DELETE** TXT records (verification/SPF)
- **ONLY MODIFY** A and CNAME records for the root domain and www

---

### Step 5: Remove/Update Existing A Records for Root Domain

1. Look for **A** records with:
   - **Name/Host:** `@` or blank or `skaya.me`
   - **Points to:** Any IP address (like `3.33.251.168` or `15.197.225.128`)

2. For each matching A record:
   - Click the **pencil icon (✏️)** or **Edit** button
   - **Option A:** Delete it (click **Delete** or trash icon)
   - **Option B:** Update it to Vercel's IP (change "Points to" to Vercel's IP, then Save)

3. If you deleted records, make sure to click **Save** or **Confirm**

---

### Step 6: Add New A Record for Root Domain (skaya.me)

1. Scroll to the **Records** section
2. Find the **A** records section
3. Click **Add** or **+ Add Record** button
4. Fill in the form:
   - **Type:** Select `A` from dropdown
   - **Name/Host:** Enter `@` (this represents the root domain)
   - **Value/Points to:** Enter Vercel's IP (from Step 1, usually `76.76.21.21`)
   - **TTL:** Select `600 seconds` or `1 hour` (or leave default)
5. Click **Save** or **Add Record**

---

### Step 7: Remove/Update Existing CNAME Records for www

1. Look for **CNAME** records with:
   - **Name/Host:** `www`
   - **Points to:** Any domain

2. For each matching CNAME record:
   - Click the **pencil icon (✏️)** or **Edit** button
   - **Option A:** Delete it
   - **Option B:** Update it to `cname.vercel-dns.com`

3. Click **Save** if you made changes

---

### Step 8: Add New CNAME Record for www

1. In the **Records** section, find **CNAME** records
2. Click **Add** or **+ Add Record** button
3. Fill in the form:
   - **Type:** Select `CNAME` from dropdown
   - **Name/Host:** Enter `www`
   - **Value/Points to:** Enter `cname.vercel-dns.com`
   - **TTL:** Select `600 seconds` or `1 hour` (or leave default)
4. Click **Save** or **Add Record**

---

### Step 9: Verify Your DNS Records

Your DNS records should now look like this:

| Type | Name/Host | Value/Points to | TTL |
|------|-----------|-----------------|-----|
| **A** | `@` | `76.76.21.21` (or Vercel's IP) | 600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 |
| **MX** | (your email records - don't touch) | ... | ... |
| **TXT** | (your verification records - don't touch) | ... | ... |

---

### Step 10: Wait for DNS Propagation

1. DNS changes can take **1-48 hours** to propagate globally
2. Usually works within **1-2 hours**
3. Check status in Vercel: **Settings → Domains → skaya.me**
   - Status will change from "Pending" → "Valid Configuration" → "Ready"

---

## Method 2: Use Vercel Nameservers (Easier, but changes all DNS)

### Step 1: Get Vercel Nameservers

1. In Vercel: **Settings → Domains → skaya.me**
2. Look for **Nameservers** section
3. Write down:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

---

### Step 2: Log into GoDaddy

1. Go to **https://www.godaddy.com**
2. Sign in

---

### Step 3: Navigate to Nameservers

1. Go to **My Products**
2. Find **skaya.me**
3. Click **DNS** button
4. Scroll down to **Nameservers** section
5. Click **Change** or **Edit** button

---

### Step 4: Update Nameservers

1. You'll see current nameservers (probably GoDaddy's)
2. Select **Custom** or **I'll use my own nameservers**
3. Enter:
   - **Nameserver 1:** `ns1.vercel-dns.com`
   - **Nameserver 2:** `ns2.vercel-dns.com`
4. Click **Save** or **Update**
5. Confirm the change

**⚠️ NOTE:** This method means Vercel manages ALL DNS records. You won't be able to add custom DNS records in GoDaddy anymore.

---

## Verification Steps

### Check DNS Propagation

1. Visit: **https://www.whatsmydns.net**
2. Enter: `skaya.me`
3. Select: **A Record**
4. Check if it shows Vercel's IP (`76.76.21.21` or similar)
5. Green checkmarks = propagated ✅
6. Red X = still propagating ⏳

### Check in Vercel Dashboard

1. Go to **Vercel → Settings → Domains**
2. Look at `skaya.me` status:
   - **⏳ Pending** = DNS is propagating (wait)
   - **✅ Valid Configuration** = DNS is correct, waiting for SSL
   - **✅ Ready** = Domain is live and working!

### Test Your Domain

1. Wait at least 1 hour after making changes
2. Open a new browser window (or incognito)
3. Visit: **https://skaya.me**
4. If it works, you're done! 🎉

---

## Troubleshooting

### Domain Still Not Working After 24 Hours?

#### Check 1: Verify DNS Records in GoDaddy
1. Go to **GoDaddy → My Products → skaya.me → DNS**
2. Verify:
   - A record for `@` points to Vercel's IP
   - CNAME for `www` points to `cname.vercel-dns.com`
   - No conflicting A/CNAME records

#### Check 2: Check for Conflicting Records
- Look for multiple A records for `@` - delete duplicates
- Look for multiple CNAME records for `www` - delete duplicates
- Make sure no other records point to old IPs

#### Check 3: Verify Vercel Configuration
1. In Vercel: **Settings → Domains**
2. Check for error messages
3. Click on `skaya.me` to see detailed status
4. Vercel will show specific errors if DNS is wrong

#### Check 4: Clear Your DNS Cache

**On Mac:**
```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**On Windows:**
```bash
ipconfig /flushdns
```

**On Linux:**
```bash
sudo systemd-resolve --flush-caches
```

#### Check 5: Use Different DNS Servers
Try using Google DNS:
- **8.8.8.8**
- **8.8.4.4**

Or Cloudflare DNS:
- **1.1.1.1**
- **1.0.0.1**

---

## Common Issues & Solutions

### Issue: "Domain not found" or "This site can't be reached"
**Solution:** DNS hasn't propagated yet. Wait 1-24 hours.

### Issue: Domain shows GoDaddy parking page
**Solution:** DNS records are still pointing to GoDaddy. Double-check your A record.

### Issue: "SSL Certificate Error" or "Not Secure"
**Solution:** Wait 1-2 hours. Vercel automatically provisions SSL after DNS is configured.

### Issue: www.skaya.me works but skaya.me doesn't (or vice versa)
**Solution:** You need BOTH records:
- A record for `@` (root domain)
- CNAME record for `www`

### Issue: Email stopped working
**Solution:** You accidentally deleted MX records. Add them back:
- Go to **GoDaddy → DNS → Add Record → MX**
- Add your email provider's MX records

---

## Final Checklist

Before contacting support, verify:

- [ ] Added `skaya.me` in Vercel Settings → Domains
- [ ] Removed old A records pointing to GoDaddy IPs
- [ ] Added new A record: `@` → Vercel's IP
- [ ] Added CNAME record: `www` → `cname.vercel-dns.com`
- [ ] Saved all changes in GoDaddy
- [ ] Waited at least 1 hour
- [ ] Checked DNS propagation on whatsmydns.net
- [ ] Verified status in Vercel dashboard
- [ ] Cleared browser cache
- [ ] Tried incognito/private browsing mode

---

## Need More Help?

### GoDaddy Support
- **Phone:** 1-480-505-8877
- **Live Chat:** Available in GoDaddy dashboard
- **Help Center:** https://www.godaddy.com/help

### Vercel Support
- **Documentation:** https://vercel.com/docs/concepts/projects/domains
- **Support:** Available in Vercel dashboard

### DNS Check Tools
- **whatsmydns.net** - Check DNS propagation globally
- **dnschecker.org** - Another DNS propagation checker
- **mxtoolbox.com** - Advanced DNS diagnostics

---

## Quick Reference: Exact Values to Use

**A Record (Root Domain):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (or IP from Vercel)
- TTL: `600`

**CNAME Record (WWW):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `600`

**⚠️ Important:** The IP address might be different. Always check Vercel dashboard for the exact IP to use!

