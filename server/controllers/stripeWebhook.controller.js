import stripe from "../config/stripe.js";
import User from "../models/user.model.js";

export const stripeWebhook = async (req, res) => {

    // Stripe is not configured
    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
        return res.status(503).json({
            message: "Stripe is not configured"
        });
    }

    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Webhook error"
        });
    }

    if (event.type === "checkout.session.completed") {

        const session = event.data.object;

        const userId = session.metadata.userId;
        const credits = Number(session.metadata.credits);
        const plan = session.metadata.plan;

        await User.findByIdAndUpdate(userId, {
            $inc: { credits },
            plan
        });
    }

    return res.json({ received: true });
};