import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { mediaTable } from "../db/schema";
import { protectedProcedure } from "../middleware/protectedProcedure";
import { router } from "../trpc";
import { AddMediaSchema, addMediaSchema } from "@repo/utils/src/schemas/mediaSchema";
import { formatDate } from "@repo/utils/src/dateFunctions";

export const mediaRouter = router({
  getMedia: protectedProcedure.query(async ({ ctx }) => {
    return await getMedia(ctx.user.id);
  }),
  addMedia: protectedProcedure.input(addMediaSchema).query(async ({ ctx, input }) => {
    return await addMedia(ctx.user.id, input);
  }),
});

export async function getMedia(id: number) {
  try {
    const media = await db.select().from(mediaTable).where(eq(mediaTable.id, id));
    return media;
  } catch (err) {
    return `${err}`;
  }
}

export async function addMedia(id: number, media: AddMediaSchema) {
  try {
    const newMedia = await db
      .insert(mediaTable)
      .values({
        title: media.title,
        status: media.status,
        type: media.type,
        rating: media.rating,
        createdOn: formatDate(new Date()),
        updatedOn: formatDate(new Date()),
        startDate: media.startDate ? formatDate(media.startDate) : null,
        completedDate: media.completedDate ? formatDate(media.completedDate) : null,
        recommended: media.recommended,
        comments: media.comments,
        userId: id,
      })
      .returning();

    return newMedia[0];
  } catch (err) {
    console.log(err);
    return `${err}`;
  }
}
