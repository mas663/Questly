import type { Question } from "../../data/mockQuestions";

export function isAnswerValid(question: Question, answer: unknown): boolean {
  switch (question.type) {
    case "multiple_choice":
      return typeof answer === "number";
    case "true_false":
      return typeof answer === "boolean";
    case "input":
      return typeof answer === "string" && answer.trim().length > 0;
    case "matching":
      return (
        typeof answer === "object" &&
        answer !== null &&
        Object.keys(answer as Record<string, string>).length === question.pairs.length
      );
    case "drag_drop":
      return Array.isArray(answer) && answer.length === question.items.length;
    default:
      return false;
  }
}
