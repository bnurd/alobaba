import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { paymentWebhook } from "~/modules/payment/payment.router";
import { appRouter } from "~/root";
import { createContext } from "~/trpc";

const app = new Hono();
app.use(cors());

app.get("/", c => {
  return c.text("Hello Hono!");
});

app.post("/payment/callback", paymentWebhook);

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

export default {
  port: 3200,
  fetch: app.fetch,
};
