import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { areas, quests, questProgress } from "@/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ areaId: string }> }
) {
  const { areaId: areaIdParam } = await params;
  const areaId = Number(areaIdParam);

  if (!Number.isInteger(areaId)) {
    return NextResponse.json({ error: "areaId tidak valid" }, { status: 400 });
  }

  const [area] = await db.select().from(areas).where(eq(areas.id, areaId));
  if (!area) {
    return NextResponse.json({ error: "Area tidak ditemukan" }, { status: 404 });
  }

  const rows = await db
    .select({
      id: quests.id,
      areaId: quests.areaId,
      title: quests.title,
      type: quests.type,
      requiredQuestId: quests.requiredQuestId,
      xpReward: quests.xpReward,
      coinReward: quests.coinReward,
      itemReward: quests.itemReward,
      status: questProgress.status,
    })
    .from(quests)
    .leftJoin(questProgress, eq(questProgress.questId, quests.id))
    .where(eq(quests.areaId, areaId))
    .orderBy(asc(quests.id));

  const titleById = new Map(rows.map((r) => [r.id, r.title]));

  const result = rows.map((quest) => ({
    id: quest.id,
    areaId: quest.areaId,
    title: quest.title,
    type: quest.type,
    xpReward: quest.xpReward,
    coinReward: quest.coinReward,
    itemReward: quest.itemReward,
    status: quest.status ?? "locked",
    requiredQuestTitle: quest.requiredQuestId ? (titleById.get(quest.requiredQuestId) ?? null) : null,
  }));

  return NextResponse.json({
    area: { id: area.id, name: area.name, icon: area.icon },
    quests: result,
  });
}
