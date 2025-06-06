import path from "path";
import { trpcServer } from "@hono/trpc-server";
import dotenv from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { paymentWebhook } from "~/modules/payment/payment.router";
import { appRouter } from "~/root";
import { createContext } from "~/trpc";

// define env path location
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const app = new Hono();

app.use(cors());
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

app.get("/", c => c.text("Hello Hono!"));
app.post("/payment/callback", paymentWebhook);

export default {
  port: 3200,
  fetch: app.fetch,
};
