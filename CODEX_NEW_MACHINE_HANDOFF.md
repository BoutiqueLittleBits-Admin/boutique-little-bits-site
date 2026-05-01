# Codex New Machine Handoff - Boutique Little Bits

Use this file on the other computer to resume the project in Codex.

## Paste This Into Codex First

```text
We are continuing the Boutique Little Bits website project.

The GitHub repo is:
https://github.com/BoutiqueLittleBits-Admin/boutique-little-bits-site

Please read PROJECT_HANDOFF.md first, then inspect the repo before making changes.

Current priorities:
1. Get the project running locally.
2. Create/fill .env.local using this computer's logged-in dashboards for Vercel, Stripe, Shippo, Sanity, and Formspree.
3. Test product loading, add to cart, cart quantity/remove, shipping rates, and Stripe checkout handoff.
4. Do not redesign approved pages unless I specifically ask.
5. Keep changes controlled: one page or function at a time.

Important design direction:
- Polished watercolor boutique gift shop.
- Brand-first, centered, elegant Little Bits identity.
- No emoji-heavy/template look.
- Use the approved copy/style in PROJECT_HANDOFF.md.
- Avoid stepping backward on design.

Important technical note:
If localhost shows a red Next.js error like "Cannot find module './638.js'", stop dev server, delete the generated .next folder, and restart npm run dev. Do not delete source files.
```

## Setup On The Other Computer

Open PowerShell and check tools:

```powershell
git --version
node --version
npm --version
```

If those work, clone the repo:

```powershell
cd Downloads
git clone https://github.com/BoutiqueLittleBits-Admin/boutique-little-bits-site.git
cd boutique-little-bits-site
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment File Needed

Create:

```text
.env.local
```

Use this template:

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

Do not paste secret values into chat. Put them directly into `.env.local`.

## Where To Find Values

Vercel:

```text
https://vercel.com/boutique-little-bits-projects/~/settings/environment-variables
```

Stripe:

```text
https://dashboard.stripe.com/
```

Shippo:

```text
https://apps.goshippo.com/
```

Sanity:

```text
https://www.sanity.io/manage
```

Formspree:

```text
https://formspree.io/forms
```

## Current Status

Already committed and pushed from the first computer.

GitHub repo:

```text
https://github.com/BoutiqueLittleBits-Admin/boutique-little-bits-site
```

Included in Git:

- Website code
- Design work
- Product/cart/API fixes
- Brand assets
- PROJECT_HANDOFF.md
- This handoff file

Not included in Git:

- `.env.local`
- `node_modules`
- `.next`

## Known Blocker

Shipping rates cannot be fully tested until `SHIPPO_API_KEY` is present in `.env.local`.

Stripe checkout cannot be fully tested until Stripe keys are present in `.env.local`.

## Resume Checklist

1. Clone repo.
2. Run `npm install`.
3. Run `npm run dev`.
4. Create `.env.local`.
5. Fill environment values from dashboards.
6. Restart dev server.
7. Test:
   - Home page
   - Shop page
   - Product page
   - Add to Cart
   - Cart quantity/remove
   - Shipping rate calculation
   - Stripe checkout handoff
   - Contact form
8. Then continue matching remaining pages to the approved design.
