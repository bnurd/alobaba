import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const envPath = path.resolve(process.cwd() + "../../../");
  process.env = { ...process.env, ...loadEnv(mode, envPath) };

  let alias = {};
  // this is needed to resolve error in production
  // issue: https://github.com/oven-sh/bun/issues/9949
  if (process.env.NODE_ENV === "production") {
    alias = { "react-dom/server": "react-dom/server.node" } as Record<string, string>;
  }

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    resolve: {
      alias: alias,
    },
    envDir: envPath,
  };
});
