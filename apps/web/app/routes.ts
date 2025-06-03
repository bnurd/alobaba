import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

const moduleResolve = (module: string, page: string) => {
  return `./modules/${module}/pages/${page}.page.tsx`;
};

export default [
  layout("./layouts/base-layout.tsx", [
    // products routes
    index(moduleResolve("products", "product-list")),
    route("products/:slug", moduleResolve("products", "product-detail")),
    layout("./layouts/authorize-layout.tsx", [route("cart", moduleResolve("cart", "cart"))]),
  ]),
  layout("./layouts/unauthorize-layout.tsx", [
    route("/sign-in", moduleResolve("auth", "login")),
    route("/sign-up", moduleResolve("auth", "register")),
  ]),
] satisfies RouteConfig;
