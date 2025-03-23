import { protectedProcedure } from "../middleware/protectedProcedure";
import { router } from "../trpc";
import { addMediaSchema, updateMediaSchema } from "@repo/schemas/mediaSchema";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { MediaController } from "../controllers/mediaController";

export const mediaRouter = router({
  getSingleMedia: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    const res = await MediaController.getSingleMedia(ctx.user.id, input.id);
    if (res.ok) return res.data;
    throw new TRPCError({
      code: "NOT_FOUND",
      message: res.message,
    });
  }),

  getMedia: protectedProcedure.query(async ({ ctx }) => {
    const res = await MediaController.getMedia(ctx.user.id);
    if (res.ok) return res.data;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: res.message,
    });
  }),

  getMediaBy: protectedProcedure
    .input(z.object({ title: z.string().optional(), status: z.string().optional(), type: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const res = await MediaController.getMediaBy(ctx.user.id, input);
      if (res.ok) return res.data;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: res.message,
      });
    }),

  addMedia: protectedProcedure.input(addMediaSchema).mutation(async ({ ctx, input }) => {
    console.log(input);
    const res = await MediaController.addMedia(ctx.user.id, input);
    if (res.ok) return res.data;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: res.message,
    });
  }),

  updateMedia: protectedProcedure.input(updateMediaSchema).mutation(async ({ ctx, input }) => {
    const res = await MediaController.updateMedia(ctx.user.id, input);
    if (res.ok) return res.data;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: res.message,
    });
  }),
});
