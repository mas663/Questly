import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { quests, questions } from "@/db/schema";

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

  const rows = await db
    .select({
      id: questions.id,
      questionType: questions.questionType,
      difficulty: questions.difficulty,
      content: questions.content,
      order: questions.order,
    })
    .from(questions)
    .where(eq(questions.questId, questId))
    .orderBy(asc(questions.order));

  // Kunci jawaban & penjelasan sengaja tidak disertakan di sini — baru
  // dikirim lewat endpoint jawab soal (task berikutnya) setelah anak menjawab.
  return NextResponse.json({
    quest: { id: quest.id, title: quest.title },
    questions: rows,
  });
}
