// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-06-20",
// });

// export async function POST(req: Request) {
//   const { planId, userId, email } = await req.json();

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     customer_email: email,
//     line_items: [
//       {
//         price_data: {
//           currency: "kes",
//           product_data: { name: "VacantSpaces Subscription" },
//           unit_amount: 50000, // KES 500 in cents
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
//     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?cancel=true`,
//     metadata: { userId, planId },
//   });

//   return NextResponse.json({ url: session.url });
// }
