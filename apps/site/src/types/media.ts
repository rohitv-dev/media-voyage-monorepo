import { inferInput, inferOutput } from "@trpc/tanstack-react-query";
import { trpc } from "../utils/trpc";

export type Media = NonNullable<inferOutput<typeof trpc.media.getSingleMedia>>;
export type MediaArray = inferOutput<typeof trpc.media.getMediaBy>;
export type UpdateMedia = inferInput<typeof trpc.media.updateMedia>;
