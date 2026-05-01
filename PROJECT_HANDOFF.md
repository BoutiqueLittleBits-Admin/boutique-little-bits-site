# Boutique Little Bits Project Handoff

## Current Goal

Finish and publish the Boutique Little Bits retail site so it keeps the brand warmth, matches the polished watercolor boutique direction, and supports real ecommerce flows: products, cart, shipping, checkout, contact, and policy pages.

## Current Local Project

Project folder:

```powershell
C:\Users\Legac\Downloads\littlebits-hub-main\littlebits-hub-main
```

Local preview:

```powershell
http://localhost:3000
```

Run locally:

```powershell
npm install
npm run dev
```

Important: if the Next.js red error appears saying `Cannot find module './638.js'`, stop the dev server, delete the generated `.next` folder, then restart `npm run dev`. This is a stale local cache issue, not source code.

## Design Direction Approved

The shop design became the visual anchor:

- Watercolor background/accent
- Purple script-style Little Bits/Boutique treatment
- Brand-first layout
- Polished gift boutique feel
- No emoji-heavy look
- Avoid generic blocks/cards that feel copied from a starter template
- Keep the brand centered and prominent

Preferred copy:

```text
Thoughtful little gifts, curated to spark joy.
Every item in our collection is carefully chosen to bring back happy memories, celebrate everyday moments, and make gifting feel personal.
```

Also work in the idea:

```text
The best gifts come in little bits.
```

Important: do not keep changing the logo/nav/homepage back and forth. Make changes one page/surface at a time.

## Recent Code Changes

Cart persistence was fixed in:

```text
app/components/CartContext.js
```

Cart now saves immediately to `localStorage` when items are added, removed, quantity changes, or cart is cleared.

Product data loading was moved behind internal API routes so the browser does not hit Sanity directly:

```text
app/api/products/route.js
app/api/products/[slug]/route.js
app/shop/page.js
app/page.js
app/shop/[slug]/page.js
```

Shipping API now gives a clearer local setup error when Shippo is not configured:

```text
app/api/shipping/route.js
```

If `SHIPPO_API_KEY` is missing, it returns:

```text
Shipping rates are not configured in this local environment.
```

## Verified Locally

Passed:

- Product page loads
- Add to Cart works
- Cart count updates
- Cart page keeps item
- Quantity plus/minus works
- Remove item returns cart to empty state
- `npm run build` completed successfully when run separately

Not fully tested:

- Shippo shipping rates
- Stripe checkout handoff
- Stripe webhook

Reason: local `.env.local` does not yet have the required secrets.

## Environment Variables Needed

Create or fill:

```text
.env.local
```

Required keys:

```env
SHIPPO_API_KEY=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

FORMSPREE_FORM_ID=
```

The following were visible in Vercel but some were marked "Needs Attention":

```text
SANITY_API_TOKEN
STRIPE_SECRET_KEY
SHIPPO_API_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

Do not paste secret values into chat. Put them directly into `.env.local`.

## Next Steps

1. Move project to wife's computer or clone the GitHub repo there.
2. Install Node, Git, VS Code, and Codex if needed.
3. Open the project folder.
4. Fill `.env.local` using values from Vercel, Stripe, Shippo, Sanity, and Formspree.
5. Run:

```powershell
npm install
npm run dev
```

6. Retest:

- Product add to cart
- Cart quantity/remove
- Shipping ZIP rate calculation
- Stripe checkout handoff
- Contact form

7. Make all pages match the approved visual direction:

- Home
- Shop
- Product pages
- Cart
- About
- Contact
- FAQ
- Shipping
- Returns
- Footer

8. Final build and deploy through GitHub/Vercel.

## Working Rule

Keep changes controlled:

1. One surface at a time.
2. Do not redesign already-approved pages without explicit request.
3. Preserve cart, checkout, shipping, and CMS behavior.
4. Test after each functional change.
5. Avoid running `npm run build` while the dev server is actively previewing unless prepared to clear `.next` afterward.
