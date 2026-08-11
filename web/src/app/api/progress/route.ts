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

  const statsByArea = new Map<number, { total: number; completed: number }>();
  for (const row of rows) {
    const entry = statsByArea.get(row.areaId) ?? { total: 0, completed: 0 };
    entry.total += 1;
    if (row.status === "completed") entry.completed += 1;
    statsByArea.set(row.areaId, entry);
  }

  const areaProgress = allAreas.map((area) => {
    const stats = statsByArea.get(area.id) ?? { total: 0, completed: 0 };
    return {
      id: area.id,
      name: area.name,
      icon: area.icon,
      totalQuests: stats.total,
      completedQuests: stats.completed,
      isFullyCompleted: stats.total > 0 && stats.completed === stats.total,
    };
  });

  const totalAreas = allAreas.length;
  const completedAreas = areaProgress.filter((a) => a.isFullyCompleted).length;
  const totalQuests = areaProgress.reduce((sum, a) => sum + a.totalQuests, 0);
  const completedQuests = areaProgress.reduce((sum, a) => sum + a.completedQuests, 0);
  const percentage = totalQuests === 0 ? 0 : Math.round((completedQuests / totalQuests) * 100);

  return NextResponse.json({
    overall: {
      totalAreas,
      completedAreas,
      totalQuests,
      completedQuests,
      percentage,
    },
    areas: areaProgress,
  });
}
