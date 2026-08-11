import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { questions, attempts } from "@/db/schema";
import { isAnswerCorrect, getCorrectAnswerText } from "@/lib/grading";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ questionId: string }> }
) {
  const { questionId: questionIdParam } = await params;
  const questionId = Number(questionIdParam);

  if (!Number.isInteger(questionId)) {
    return NextResponse.json({ error: "questionId tidak valid" }, { status: 400 });
  }

  let body: { answer?: unknown; timeSpent?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid" }, { status: 400 });
  }

  if (body.answer === undefined) {
    return NextResponse.json({ error: "Field 'answer' wajib diisi" }, { status: 400 });
  }

  const [question] = await db.select().from(questions).where(eq(questions.id, questionId));
  if (!question) {
    return NextResponse.json({ error: "Soal tidak ditemukan" }, { status: 404 });
  }

  const storedAnswer = question.answer as Record<string, unknown>;
  const content = question.content as Record<string, unknown>;
  const isCorrect = isAnswerCorrect(question.questionType, storedAnswer, body.answer);

  await db.insert(attempts).values({
    questionId: question.id,
    questId: question.questId,
    answer: body.answer,
    isCorrect,
    timeSpent: typeof body.timeSpent === "number" ? body.timeSpent : 0,
  });

  return NextResponse.json({
    isCorrect,
    explanation: question.explanation,
    correctAnswer: getCorrectAnswerText(question.questionType, content, storedAnswer),
  });
}
