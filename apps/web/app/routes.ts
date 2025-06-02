import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

const moduleResolve = (module: string, page: string) => {
  return `./modules/${module}/pages/${page}.page.tsx`;
};

export default [
  layout("./layouts/layout.tsx", [
    // products routes
    index(moduleResolve("products", "product-list")),
    route("products/:id", moduleResolve("products", "product-detail")),
  ]),
  layout("./layouts/login-layout.tsx", [route("/sign-in", moduleResolve("auth", "login"))]),
] satisfies RouteConfig;
