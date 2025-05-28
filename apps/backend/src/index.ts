import { Hono } from "hono";

import products from "~/modules/products";

const app = new Hono();

app.get("/", c => {
  return c.text("Hello Hono!");
});

app.route("/products", products);

export default {
  port: 3200,
  fetch: app.fetch,
};
