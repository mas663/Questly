import { useState } from "react";
import type { Question } from "../data/mockQuestions";
import { isAnswerValid } from "../components/questions/answer";

// Mengelola siklus soal (index, jawaban per soal, status submit) supaya
// layar Misi Quest & Latihan Adaptif bisa berbagi logika yang sama.
export function useQuestionSession(questions: Question[]) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());

  const question = questions[index] ?? null;
  const isLast = index === questions.length - 1;
  const isSubmitted = question ? submittedIds.has(question.id) : false;
  const currentAnswer = question ? answers[question.id] : undefined;
  const canSubmit = question ? isAnswerValid(question, currentAnswer) : false;

  function handleAnswerChange(value: unknown) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function handleSubmit() {
    if (!question) return;
    setSubmittedIds((prev) => new Set(prev).add(question.id));
  }

  function goNext() {
    setIndex((i) => Math.min(i + 1, questions.length - 1));
  }

  return {
    index,
    total: questions.length,
    question,
    isLast,
    isSubmitted,
    currentAnswer,
    canSubmit,
    handleAnswerChange,
    handleSubmit,
    goNext,
  };
}
