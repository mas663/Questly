import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { areas, quests, questProgress } from "@/db/schema";

export async function GET() {
  const allAreas = await db.select().from(areas).orderBy(asc(areas.order));

  const rows = await db
    .select({
      areaId: quests.areaId,
      status: questProgress.status,
    })
    .from(quests)
    .leftJoin(questProgress, eq(questProgress.questId, quests.id));

  const statsByArea = new Map<number, { total: number; completed: number; started: boolean }>();
  for (const row of rows) {
    const entry = statsByArea.get(row.areaId) ?? { total: 0, completed: 0, started: false };
    entry.total += 1;
    if (row.status === "completed") entry.completed += 1;
    if (row.status === "completed" || row.status === "available") entry.started = true;
    statsByArea.set(row.areaId, entry);
  }

  const result = allAreas.map((area, index) => {
    const stats = statsByArea.get(area.id) ?? { total: 0, completed: 0, started: false };
    const status =
      stats.total > 0 && stats.completed === stats.total
        ? "completed"
        : stats.started
          ? "open"
          : "locked";

    return {
      id: area.id,
      name: area.name,
      order: area.order,
      icon: area.icon,
      totalQuests: stats.total,
      completedQuests: stats.completed,
      status,
      requiredAreaName: index === 0 ? null : (allAreas[index - 1]?.name ?? null),
    };
  });

  return NextResponse.json({ areas: result });
}
