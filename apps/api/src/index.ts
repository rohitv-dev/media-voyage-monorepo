import express from "express";
import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions, createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";

const createContext = ({ req, res }: CreateExpressContextOptions) => ({});

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  media: t.procedure.query(() => {
    return [];
  }),
});

const app = express();
app.use(cors());

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3000);

export type AppRouter = typeof appRouter;
