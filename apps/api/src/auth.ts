import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db";
import { account, session, user, verification } from "./db/schemas/auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.FRONTEND_URL!],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
});
