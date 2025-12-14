// import 'server-only'

// import Stripe from 'stripe'

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getStripeInstance() {
  if (typeof window !== "undefined") {
    throw new Error("stripe must be used on the server only");
  }

  // cache on global to prevent multiple instances during hot-reload in dev
  const g = globalThis;
  if (!g.__stripe) {
    // require instead of import so bundlers won't try to include it in client code
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Stripe = require("stripe");
    g.__stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
  }
  return g.__stripe;
}

export { getStripeInstance };