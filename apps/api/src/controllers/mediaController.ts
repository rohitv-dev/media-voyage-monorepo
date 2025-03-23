import { formatDate } from "@repo/schemas/dateFunctions";
import { Media, mediaTable } from "../db/schemas/media";
import { AddMediaSchema, UpdateMediaSchema } from "@repo/schemas/mediaSchema";
import { Result } from "../types/api";
import { TRPCError } from "@trpc/server";
import { and, eq, ilike } from "drizzle-orm";
import { db } from "../db/db";

export const MediaController = {
  async getSingleMedia(userId: string, id: number) {
    try {
      const media = await db
        .select()
        .from(mediaTable)
        .where(and(eq(mediaTable.id, id), eq(mediaTable.userId, userId)));
      if (media.length === 0) throw new Error("Media Not Found");
      return { ok: true, data: media[0] };
    } catch (err) {
      return { ok: false, message: `${err}` };
    }
  },

  async getMedia(userId: string): Promise<Result<Media[]>> {
    try {
      const media = await db.select().from(mediaTable).where(eq(mediaTable.userId, userId));
      return { ok: true, data: media };
    } catch (err) {
      return { ok: false, message: `${err}` };
    }
  },

  async getMediaBy(userId: string, input: { title?: string; status?: string; type?: string }) {
    try {
      console.log(input);

      const queries = [];

      if (input.title && input.title !== "") queries.push(ilike(mediaTable.title, `%${input.title}%`));
      if (input.status && input.status !== "") queries.push(eq(mediaTable.status, input.status));
      if (input.type && input.type !== "") queries.push(eq(mediaTable.type, input.type));

      const media = await db
        .select()
        .from(mediaTable)
        .where(and(eq(mediaTable.userId, userId), ...queries));
      return { ok: true, data: media };
    } catch (err) {
      return { ok: false, message: `${err}` };
    }
  },

  async addMedia(userId: string, media: AddMediaSchema) {
    try {
      const newMedia = await db
        .insert(mediaTable)
        .values({
          title: media.title,
          status: media.status,
          type: media.type,
          rating: media.rating ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
          startDate: media.startDate,
          completedDate: media.completedDate,
          recommended: media.recommended ? (media.recommended === "Yes" ? true : false) : null,
          comments: media.comments ?? null,
          userId,
        })
        .returning();

      return { ok: true, data: newMedia[0] };
    } catch (err) {
      console.log(err);
      return { ok: false, message: `${err}` };
    }
  },

  async updateMedia(userId: string, media: UpdateMediaSchema) {
    try {
      if (userId !== media.userId.toString())
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to update this media",
        });

      const newMedia = await db
        .update(mediaTable)
        .set({
          title: media.title,
          status: media.status,
          type: media.type,
          rating: media.rating ?? null,
          updatedAt: new Date(),
          startDate: media.startDate,
          completedDate: media.completedDate,
          recommended: media.recommended ? (media.recommended === "Yes" ? true : false) : null,
          comments: media.comments ?? null,
        })
        .where(eq(mediaTable.id, media.id))
        .returning();

      return { ok: true, data: newMedia[0] };
    } catch (err) {
      if (err instanceof TRPCError) return { ok: false, message: err.message };
      return { ok: false, message: `${err}` };
    }
  },
};
