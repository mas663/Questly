import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { areas, quests, questProgress } from "@/db/schema";

export async function GET(
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
    return NextResponse.json({ error: "Misi tidak ditemukan" }, { status: 404 });
  }

  const [area] = await db.select().from(areas).where(eq(areas.id, quest.areaId));

  const [progress] = await db
    .select()
    .from(questProgress)
    .where(eq(questProgress.questId, questId));

  let requiredQuestTitle: string | null = null;
  if (quest.requiredQuestId) {
    const [requiredQuest] = await db
      .select({ title: quests.title })
      .from(quests)
      .where(eq(quests.id, quest.requiredQuestId));
    requiredQuestTitle = requiredQuest?.title ?? null;
  }

  return NextResponse.json({
    id: quest.id,
    title: quest.title,
    type: quest.type,
    story: quest.story,
    xpReward: quest.xpReward,
    coinReward: quest.coinReward,
    itemReward: quest.itemReward,
    status: progress?.status ?? "locked",
    requiredQuestTitle,
    area: area ? { id: area.id, name: area.name, icon: area.icon } : null,
  });
}
