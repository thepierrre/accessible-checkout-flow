import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const { amount, paymentIntentId } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid purchase amount: it must be greater than 0." },
        { status: 400 },
      );
    }

    let paymentIntent: Stripe.PaymentIntent;

    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount,
      });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur",
        automatic_payment_methods: { enabled: true },
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (e: unknown) {
    if (e instanceof Stripe.errors.StripeError) {
      console.error("Stripe error:", {
        type: e.type,
        code: e.code,
        param: e.param,
        message: e.message,
      });
      return NextResponse.json(
        { error: `Payment failed: ${e.message}` },
        { status: 400 },
      );
    }

    console.error("Internal server error: ", e);
    return NextResponse.json(
      {
        error: `Internal server error: ${e}`,
      },
      { status: 500 },
    );
  }
}
