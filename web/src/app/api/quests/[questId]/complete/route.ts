import { NextResponse } from "next/server";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { areas, quests, questProgress } from "@/db/schema";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ questId: string }> }
) {
  const { questId: questIdParam } = await params;
  const questId = Number(questIdParam);

  if (!Number.isInteger(questId)) {
    return NextResponse.json({ error: "questId tidak valid" }, { status: 400 });
  }

  const [quest] = await db.select().from(quests).where(eq(quests.id, questId));
  if (!quest) {
    return NextResponse.json({ error: "Quest tidak ditemukan" }, { status: 404 });
  }

  const [progress] = await db
    .select()
    .from(questProgress)
    .where(eq(questProgress.questId, questId));

  if (!progress || progress.status !== "available") {
    return NextResponse.json(
      { error: "Quest belum bisa diselesaikan (belum terbuka atau sudah selesai)." },
      { status: 409 }
    );
  }

  await db
    .update(questProgress)
    .set({ status: "completed", completedAt: new Date() })
    .where(eq(questProgress.questId, questId));

  // Buka quest berikutnya yang mensyaratkan quest ini.
  const nextQuests = await db.select().from(quests).where(eq(quests.requiredQuestId, questId));
  for (const nextQuest of nextQuests) {
    await db
      .update(questProgress)
      .set({ status: "available" })
      .where(and(eq(questProgress.questId, nextQuest.id), eq(questProgress.status, "locked")));
  }

  // Cek apakah semua quest di area ini sudah selesai → buka area berikutnya.
  const areaQuestRows = await db
    .select({ status: questProgress.status })
    .from(quests)
    .leftJoin(questProgress, eq(questProgress.questId, quests.id))
    .where(eq(quests.areaId, quest.areaId));

  const totalInArea = areaQuestRows.length;
  const completedInArea = areaQuestRows.filter((r) => r.status === "completed").length;

  let unlockedArea: { id: number; name: string; icon: string } | null = null;

  if (totalInArea > 0 && completedInArea === totalInArea) {
    const [currentArea] = await db.select().from(areas).where(eq(areas.id, quest.areaId));

    if (currentArea) {
      const [nextArea] = await db
        .select()
        .from(areas)
        .where(eq(areas.order, currentArea.order + 1));

      if (nextArea) {
        const [firstQuestOfNextArea] = await db
          .select()
          .from(quests)
          .where(eq(quests.areaId, nextArea.id))
          .orderBy(asc(quests.id))
          .limit(1);

        if (firstQuestOfNextArea) {
          const [firstProgress] = await db
            .select()
            .from(questProgress)
            .where(eq(questProgress.questId, firstQuestOfNextArea.id));

          if (firstProgress?.status === "locked") {
            await db
              .update(questProgress)
              .set({ status: "available" })
              .where(eq(questProgress.questId, firstQuestOfNextArea.id));

            unlockedArea = { id: nextArea.id, name: nextArea.name, icon: nextArea.icon };
          }
        }
      }
    }
  }

  return NextResponse.json({
    quest: {
      id: quest.id,
      title: quest.title,
      xpReward: quest.xpReward,
      coinReward: quest.coinReward,
      itemReward: quest.itemReward,
      status: "completed",
    },
    unlockedArea,
  });
}
