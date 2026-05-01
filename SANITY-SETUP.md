[SANITY-SETUP.md](https://github.com/user-attachments/files/24755073/SANITY-SETUP.md)
# Sanity CMS Integration - Setup Guide

## 🎉 What's Been Added

### New Files Created:
```
├── sanity.config.js          # Sanity configuration
├── sanity.cli.js             # Sanity CLI config
├── lib/
│   ├── sanity.js             # Sanity client
│   └── sanity.queries.js     # GROQ queries
├── sanity/
│   └── schemas/
│       ├── index.js          # Schema exports
│       ├── product.js        # Product schema (with variations & personalization!)
│       └── category.js       # Category schema
├── app/
│   └── studio/
│       └── [[...index]]/
│           ├── page.js       # Embedded Sanity Studio
│           └── layout.js     # Studio layout
├── data/
│   └── products.js           # Product data for migration
```

### Updated Files:
- `package.json` - Added Sanity dependencies
- `app/shop/page.js` - Now fetches from Sanity (with fallback)
- `app/shop/[slug]/page.js` - Supports variations & personalization

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Verify Environment Variables
Make sure these are in your Vercel project (already added per handoff doc):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `y8kpuglx`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `SANITY_API_TOKEN` = (your token)

### Step 3: Deploy to Vercel
```bash
git add .
git commit -m "Add Sanity CMS integration"
git push
```

Vercel will automatically redeploy.

### Step 4: Access Sanity Studio
After deployment, visit:
**https://www.boutiquelittlebits.com/studio**

This is your admin dashboard for managing products!

---

## 📦 Migrating Products to Sanity

### Option A: Manual Entry (Recommended for 31 products)
1. Go to `/studio`
2. Create Categories first:
   - Gift Sets
   - Accessories
   - Kids
   - Spa & Beauty
   - Home Decor
3. Then create Products one by one

### Option B: Bulk Import via CLI
```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Import from NDJSON file (you'd need to create this)
sanity documents create < products.ndjson
```

---

## 🔧 Product Schema Features

### Basic Fields:
- Title (max 140 chars)
- Slug (auto-generated)
- Description
- Images (multiple)
- Base Price
- Compare at Price (for sales)
- SKU

### Variations:
Enable "Has Variations" to add options like:
- 7 Letters - $38.50
- 10 Letters - $43.50
- 15 Letters - $47.50

Each variation has its own price and stock status.

### Personalization:
Enable "Requires Personalization" to add:
- Custom instructions
- Character limit
- Required/optional toggle

### Shipping & Processing:
- Shipping Profile (small-envelope / large-box)
- Processing Time (1-3 days, 5-7 days, custom, etc.)
- Weight & Dimensions

### Organization:
- Category (reference)
- Tags
- Inventory Quantity
- Featured (shows on homepage)
- Active (hide without deleting)

---

## 🎯 Products Needing Special Setup

These 6 products have variations and/or personalization:

1. **Jumbo Friendship Bracelet** (ACC-FBP-JMB)
   - Variations: 7/10/15 letters
   - Personalization: Required

2. **Teen/Woman Valentine Countdown** (GFT-VAL-TEEN)
   - Personalization: Required

3. **Teen & Tween Advent Calendar** (GFT-ADV-TEEN)
   - Variations: 12/24 days
   - Personalization: Required

4. **Kids Valentine Countdown** (GFT-VAL-KIDS)
   - Personalization: Required

5. **Christmas Countdown Advent Calendar** (GFT-ADV-KID)
   - Variations: 12/24 days
   - Personalization: Required

6. **Personalized Kids Sunglasses** (ACC-SUN-KID)
   - Variations: 8 styles
   - Personalization: Required

---

## 🔄 How It Works

The shop pages now:
1. Try to fetch from Sanity first
2. If Sanity has products → display those
3. If Sanity is empty or errors → fall back to hardcoded products

This means your site keeps working during migration!

---

## ✅ Testing Checklist

After setup, verify:
- [ ] Can access /studio
- [ ] Can create a category
- [ ] Can create a product
- [ ] Product appears on /shop
- [ ] Product detail page works
- [ ] Variations work (select option → price changes)
- [ ] Personalization works (can enter text)
- [ ] Add to cart works with variation/personalization data
- [ ] Checkout receives correct product info

---

## 📝 Notes

- **CORS**: Already configured for www.boutiquelittlebits.com and boutiquelittlebits.com
- **Images**: You can upload to Sanity OR keep using Etsy URLs (externalImageUrl field)
- **Old files**: Backed up as `page.old.js` in case you need to revert

---

## 🆘 Troubleshooting

### Studio won't load?
- Check browser console for errors
- Verify environment variables are set in Vercel
- Make sure you're logged into Sanity (it may prompt you)

### Products not showing?
- Check if products are marked as "Active"
- Verify category reference is set
- Check browser console for fetch errors

### Cart not working?
- Make sure shippingProfile is set on product
- For variations, ensure one is selected before adding to cart

---

Good luck with your Sanity journey! 🎉
