import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Context } from "hono";
import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";

import { verifyToken } from "~/utils/jwt";

// create trpc context
export const createContext = (opts: FetchCreateContextFnOptions, c: Context) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  const user = token ? verifyToken(token) : null;

  return {
    user,
  };
};

export type AppContext = Awaited<ReturnType<typeof createContext>>;

// init trpc
const t = initTRPC.context<AppContext>().create({ transformer: SuperJSON });

// define route for used in each module
export const router = t.router;

// public procedure (without auth)
export const publicProcedure = t.procedure;

// protected procedure (with auth)
export const protectedProcedure = t.procedure.use(opts => {
  const { ctx } = opts;

  // check if user is authenticated
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});
