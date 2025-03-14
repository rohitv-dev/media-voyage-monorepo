import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { auth } from "./auth";
import { fromNodeHeaders } from "better-auth/node";
import superjson from "superjson";

export const createContext = async ({ req, info }: CreateExpressContextOptions) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (session?.user) {
    return {
      user: session.user,
    };
  }

  return {};
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
