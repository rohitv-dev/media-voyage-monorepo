import { TRPCError } from "@trpc/server";
import { procedure } from "../trpc";

export const protectedProcedure = procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
