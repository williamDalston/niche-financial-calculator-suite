# CalcEngine Launch Day Script

**Total time:** ~60 minutes  
**Prerequisites:** GitHub repo, Vercel account, Google account

---

## Phase 1: Deploy (10 minutes)

### 1.1 Create environment file

```bash
cd /Users/walston/Desktop/niche-financial-calculator-suite
cp .env.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://calcengine.org
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_VERIFICATION=
NEXT_PUBLIC_BING_VERIFICATION=
```

### 1.2 Push to GitHub

```bash
git add -A
git commit -m "Launch prep: trust signals, analytics, 404 page"
git push origin main
```

### 1.3 Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variable: `NEXT_PUBLIC_SITE_URL` = `https://calcengine.org`
4. Deploy
5. **Note your production URL**

### 1.4 Configure custom domain (if applicable)

1. Vercel Dashboard → Project → Settings → Domains
2. Add `calcengine.org`
3. Configure DNS as instructed
4. Wait for SSL certificate

---

## Phase 2: Analytics Setup (15 minutes)

### 2.1 Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Create → Property
3. Property name: `CalcEngine`
4. Time zone: Your timezone
5. Currency: USD
6. Create → Web → Enter your domain
7. **Copy Measurement ID** (starts with `G-`)

### 2.2 Add GA4 to Vercel

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
3. Redeploy (Deployments → ... → Redeploy)

### 2.3 Verify GA4 Events

1. Open your site in a new incognito window
2. Accept cookies when prompted
3. Navigate to a calculator, use it, click related calculators
4. GA4 → Admin → DebugView
5. Confirm events appear: `calculator_view`, `calculate`, `related_calculator_click`

---

## Phase 3: Search Console Setup (10 minutes)

### 3.1 Add Property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://calcengine.org`
3. Verify via HTML tag method:
   - Copy the `content` value from the meta tag
   - Add to Vercel: `NEXT_PUBLIC_GOOGLE_VERIFICATION` = `[content value]`
   - Redeploy
   - Click Verify in GSC

### 3.2 Submit Sitemap

1. GSC → Sitemaps (left sidebar)
2. Enter: `sitemap.xml`
3. Submit
4. Status should show "Success" within minutes

### 3.3 Request Indexing (Optional Fast-Track)

1. GSC → URL Inspection
2. Enter these URLs one by one and click "Request Indexing":
   - `https://calcengine.org/`
   - `https://calcengine.org/calculators/gs-pay-calculator`
   - `https://calcengine.org/calculators/military-pay-calculator`
   - `https://calcengine.org/calculators/mortgage-calculator`
   - `https://calcengine.org/editorial-policy`

---

## Phase 4: Bing Webmaster (5 minutes)

### 4.1 Import from GSC

1. Go to [bing.com/webmasters](https://bing.com/webmasters)
2. Sign in with Microsoft account
3. Import from Google Search Console (easiest)
4. Or add manually and verify via meta tag

### 4.2 Submit Sitemap

1. Bing Webmaster → Sitemaps
2. Submit: `https://calcengine.org/sitemap.xml`

---

## Phase 5: AdSense Application (15 minutes)

### 5.1 Apply

1. Go to [adsense.google.com](https://adsense.google.com)
2. Sign in with Google account
3. Enter site URL: `https://calcengine.org`
4. Complete application

### 5.2 After Approval (do later when approved)

```bash
# Update .env.local
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXXX

# Update public/ads.txt - replace the placeholder line with:
google.com, pub-XXXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0

# Commit and push
git add -A
git commit -m "Add AdSense publisher ID"
git push origin main
```

Vercel will auto-deploy. Verify ads appear (accept cookies first).

---

## Phase 6: Post-Deploy QA Checklist (20 minutes)

Run through this checklist on the **live production site**:

### Critical Path
- [ ] Homepage loads at production URL
- [ ] No console errors in browser DevTools
- [ ] Calculator works (test mortgage with $400k, 20% down, 7%, 30yr)

### SEO Verification
- [ ] `https://calcengine.org/robots.txt` accessible, sitemap URL correct
- [ ] `https://calcengine.org/sitemap.xml` accessible, all URLs use production domain
- [ ] View source on homepage: canonical tag points to production domain
- [ ] View source on mortgage calculator: canonical is `/calculators/mortgage-calculator` (no query params)
- [ ] No `noindex` meta tags anywhere

### Trust Pages
- [ ] `/about` loads correctly
- [ ] `/contact` loads correctly
- [ ] `/privacy` loads correctly
- [ ] `/terms` loads correctly
- [ ] `/editorial-policy` loads correctly
- [ ] Footer links to all trust pages work

### Functionality
- [ ] Cookie consent banner appears on first visit
- [ ] After accepting cookies, banner doesn't reappear
- [ ] Calculator URL updates with query params when values change
- [ ] Share button copies URL with params
- [ ] Related calculator links work
- [ ] 404 page works (visit `/nonexistent-page`)

### Mobile
- [ ] Site is responsive on phone (or Chrome DevTools mobile view)
- [ ] Calculator inputs are usable on mobile
- [ ] No horizontal scroll

### Structured Data
- [ ] Test homepage at [validator.schema.org](https://validator.schema.org)
- [ ] Test mortgage calculator at validator
- [ ] Test editorial policy at validator

### Analytics Verification
- [ ] GA4 DebugView shows events after accepting cookies
- [ ] `calculator_view` event fires on page load
- [ ] `calculate` event fires when using calculator

---

## Quick Reference: Environment Variables

| Variable | Where to Get | When |
|----------|-------------|------|
| `NEXT_PUBLIC_SITE_URL` | Your domain | Before deploy |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Admin | Phase 2 |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | GSC HTML tag | Phase 3 |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster | Phase 4 |
| `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` | AdSense dashboard | After approval |

---

## Post-Launch: First Week Checks

### Day 2
- [ ] Check GSC for indexing status
- [ ] Check GA4 for any traffic

### Day 7
- [ ] GSC: How many pages indexed?
- [ ] GSC: Any crawl errors?
- [ ] GA4: Which pages getting traffic?
- [ ] AdSense: Application status?

---

## Troubleshooting

### "Sitemap couldn't be read" in GSC
- Wait 24 hours and resubmit
- Verify `sitemap.xml` is accessible in browser

### No events in GA4 DebugView
- Confirm cookies were accepted
- Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Vercel
- Confirm redeploy completed

### AdSense rejection
- Common reasons: not enough content, missing trust pages, new domain
- Reapply after 2 weeks with no changes (sometimes just timing)
- Ensure all pages have substantial content beyond calculator UI

---

*You're ready. Ship it.* 🚀
