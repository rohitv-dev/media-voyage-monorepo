import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { Media, mediaTable } from "../db/schema";
import { protectedProcedure } from "../middleware/protectedProcedure";
import { router } from "../trpc";
import { AddMediaSchema, addMediaSchema } from "@repo/schemas/mediaSchema";
import { formatDate } from "@repo/schemas/dateFunctions";
import { z } from "zod";
import { Result } from "../types/api";
import { TRPCError } from "@trpc/server";

export const mediaRouter = router({
  getSingleMedia: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    return await getSingleMedia(input.id);
  }),
  getMedia: protectedProcedure.query(async ({ ctx }) => {
    const res = await getMedia(ctx.user.id);
    if (res.ok) return res.data;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: res.message,
    });
  }),
  addMedia: protectedProcedure.input(addMediaSchema).mutation(async ({ ctx, input }) => {
    return await addMedia(ctx.user.id, input);
  }),
});

export async function getSingleMedia(id: number) {
  try {
    const media = await db.select().from(mediaTable).where(eq(mediaTable.id, id));
    if (media.length === 0) throw new Error("Media Not Found");
    return media[0];
  } catch (err) {
    return `${err}`;
  }
}

export async function getMedia(id: string): Promise<Result<Media[]>> {
  try {
    const media = await db.select().from(mediaTable).where(eq(mediaTable.userId, id));
    return { ok: true, data: media };
  } catch (err) {
    return { ok: false, message: `${err}` };
  }
}

export async function addMedia(id: string, media: AddMediaSchema) {
  try {
    const newMedia = await db
      .insert(mediaTable)
      .values({
        title: media.title,
        status: media.status,
        type: media.type,
        rating: media.rating ?? null,
        createdOn: formatDate(new Date()),
        updatedOn: formatDate(new Date()),
        startDate: media.startDate ? formatDate(media.startDate) : null,
        completedDate: media.completedDate ? formatDate(media.completedDate) : null,
        recommended: media.recommended ?? null,
        comments: media.comments ?? null,
        userId: id,
      })
      .returning();

    return newMedia[0];
  } catch (err) {
    console.log(err);
    return `${err}`;
  }
}
