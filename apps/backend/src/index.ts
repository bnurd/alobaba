import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { appRouter } from "~/root";

const app = new Hono();
app.use(cors());

app.get("/", c => {
  return c.text("Hello Hono!");
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

export default {
  port: 3200,
  fetch: app.fetch,
};
