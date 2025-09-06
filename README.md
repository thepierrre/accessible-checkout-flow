# Accessible Checkout Flow

This is a small demo project showcasing an accessible checkout flow built with Next.js.
Instead of creating a full e-commerce site, I focused on a single but realistic use case - implementing an **accessible checkout process** with form handling and external payment integration.

**The project is deployed on Vercel:**
👉 [**CLICK HERE**](https://accessible-checkout-flow.vercel.app)

## Why I built this

I wanted to build a project that:

* Shows my ability to implement accessible forms
* Lets me practice building UI components supporting keyboard navigation, ARIA labels and event listeners instead of relying entirely on external libraries
* Integrates a third-party payment provider (Stripe) used in many production apps
* I also wanted to challenge myself to create a site that is not only functional but also usable by everyone, showing user empathy

## Features

* Address form built with React Hook Form
* Review page with order summary and discount code support.
  * Discount code: entering ``TIMEFORCOFFEE`` applies a 10% discount.

### Stripe integration:
  * **Express checkout** (with a disclaimer that no actual charge is made).
  * **Card payment** in the Stripe test mode. Use:
    * Card number: ```4242 4242 4242 4242```
    * Any valid future expiry date
    * Any 3-digit CVC

### Accessibility Focus

* Keyboard navigation support
* Custom components with ARIA labels and roles
* Focus management and form validation designed with screen readers in mind

Minimal reliance on accessibility libraries — most features are implemented manually to deepen my understanding.

### Tech Stack

* Next.js
* React Hook Form for form management
* Stripe API for payments

### Running locally

```bash
git clone <repo-url>
cd accessible-checkout-flow
npm install
npm run dev
```

The app will be available at http://localhost:3000 by default.

⚠️ **Note 1:** When running the app locally, **Stripe Express Checkout** may not be available because it requires a publicly accessible URL for redirect. 
If you want to test it, consider using a tunneling tool like [Anchor](https://anchor.dev/) to expose your local server.

⚠️ **Note 2:** Some buttons (_Login_, _Sign up_, _Edit card_, _Back to shop_) are mock elements that open a "It's just a demo" modal. For now, the focus is on checkout, but I may expand this into a full shopping flow later.