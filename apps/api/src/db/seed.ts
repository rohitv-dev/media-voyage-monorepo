import { mediaTypeTable, statusTable } from "./schema";
import { db } from "./db";

export async function seed() {
  try {
    const statuses: (typeof statusTable.$inferInsert)[] = [
      {
        status: "Completed",
      },
      { status: "In Progress" },
      { status: "Planned" },
      { status: "Dropped" },
    ];

    const mediaTypes: (typeof mediaTypeTable.$inferInsert)[] = [
      { type: "Movie" },
      { type: "Game" },
      { type: "Book" },
      { type: "Show" },
    ];

    await db
      .insert(statusTable)
      .values([...statuses])
      .onConflictDoNothing();
    await db
      .insert(mediaTypeTable)
      .values([...mediaTypes])
      .onConflictDoNothing();
  } catch (err) {
    console.log(err);
  }
}
