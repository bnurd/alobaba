import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout } from "@react-router/dev/routes";

const moduuleResolve = (module: string, page: string) => {
  return `./modules/${module}/pages/${page}-page.tsx`;
};

export default [
  layout("./layouts/layout.tsx", [index(moduuleResolve("products", "product-list"))]),
] satisfies RouteConfig;
