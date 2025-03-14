import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import { createContext, procedure, router } from "./trpc";
import { mediaRouter } from "./routers/mediaRouter";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { seed } from "./db/seed";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

const appRouter = router({
  media: mediaRouter,
  authStatus: procedure.query(({ ctx }) => {
    if (ctx.user) return ctx.user;
    return null;
  }),
});

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/seed", async (req, res) => {
  await seed();
  res.send("Done");
});

app.listen(3000);

export type AppRouter = typeof appRouter;
