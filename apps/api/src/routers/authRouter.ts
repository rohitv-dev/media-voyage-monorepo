import passport from "passport";
import { loginSchema, registerSchema } from "@repo/schemas/authSchema";
import { validateData } from "../middleware/validateData";
import express from "express";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { userTable } from "../db/schema";

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      username: string;
      createdOn: string;
      updatedOn: string;
    }
  }
}

export const authRouter = express.Router();

authRouter.post("/register", validateData(registerSchema), async (req, res, next) => {
  try {
    const users = await db.select().from(userTable).where(eq(userTable.email, req.body.email));

    if (users.length > 0) {
      res.send("User already exists");
      return;
    }

    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512").toString("base64");

    const newUsers = await db
      .insert(userTable)
      .values({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        salt,
      })
      .returning();

    const newUser = newUsers[0];

    req.login(
      {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        createdOn: newUser.createdOn,
        updatedOn: newUser.updatedOn,
      },
      (err) => {
        if (err) return next(err);
      }
    );

    res.send("User registered");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

authRouter.post(
  "/login",
  validateData(loginSchema),
  passport.authenticate("local", { failWithError: true }),
  (req, res) => {
    if (!req.user) {
      res.status(400).json({ ok: false, message: "User not found" });
      return;
    }

    res.status(200).json({ ok: true, data: req.user, message: "Logged in Successfully" });
  }
);

authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send("Logged out");
  });
});

authRouter.get("/status", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.json({ ok: true, data: req.user });
  } else {
    res.status(400).json({ ok: false, message: "User not authenticated" });
  }
});
