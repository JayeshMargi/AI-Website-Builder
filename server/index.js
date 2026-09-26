import express from "express"
import dotenv from "dotenv"
dotenv.config()

import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

const app = express()

// Stripe Webhook
// Keep this BEFORE express.json()
app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
)

const port = process.env.PORT || 5000

// Middlewares
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "https://ai-website-builder-1-e851.onrender.com",
    credentials: true
}))

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/website", websiteRouter)
app.use("/api/billing", billingRouter)

// Start Server
app.listen(port, () => {
    console.log("server started")
    connectDb()
})
