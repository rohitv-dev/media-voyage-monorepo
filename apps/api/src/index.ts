import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import session from "express-session";
import connect from "connect-pg-simple";
import { createContext, router } from "./trpc";
import { mediaRouter } from "./routers/mediaRouter";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { eq } from "drizzle-orm";
import { db } from "./db/db";
import { userTable } from "./db/schema";
import crypto from "crypto";
import { authRouter } from "./routers/authRouter";

const app = express();

const PgSession = connect(session);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    name: "voyage",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 },
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      errorLog: console.error,
    }),
  })
);

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
    await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, username))
      .then((users) => {
        if (users.length === 0) {
          return done(null, false, { message: "Incorrect Email or Password" });
        }

        const user = users[0];
        const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 64, "sha512").toString("base64");
        const equal = crypto.timingSafeEqual(Buffer.from(user.password), Buffer.from(hash));

        if (!equal) done("Incorrect Email or Password", false);

        done(null, {
          id: user.id,
          email: user.email,
          username: user.username,
          createdOn: user.createdOn,
          updatedOn: user.updatedOn,
        });
      })
      .catch((err) => {
        done(err);
      });
  })
);

passport.serializeUser((user: Express.User, done) => {
  console.log("Serialize user: ", user);
  return done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  console.log("Deserialize user: ", user, "\n-------------------");
  return done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const appRouter = router({
  media: mediaRouter,
});

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3000);

export type AppRouter = typeof appRouter;
