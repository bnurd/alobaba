import { Hono } from "hono";

const app = new Hono();

app.get("/products", c => {
  return c.text("this is product!");
});

export default app;
