import type { Question } from "../../data/mockQuestions";

export function isAnswerCorrect(question: Question, answer: unknown): boolean {
  switch (question.type) {
    case "multiple_choice":
      return answer === question.correctIndex;
    case "true_false":
      return answer === question.correctAnswer;
    case "input":
      return (
        typeof answer === "string" &&
        answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
      );
    case "matching": {
      if (typeof answer !== "object" || answer === null) return false;
      const matches = answer as Record<string, string>;
      return question.pairs.every((pair) => matches[pair.left] === pair.right);
    }
    case "drag_drop": {
      if (!Array.isArray(answer)) return false;
      return (
        answer.length === question.correctOrder.length &&
        answer.every((item, i) => item === question.correctOrder[i])
      );
    }
    default:
      return false;
  }
}

export function getCorrectAnswerText(question: Question): string {
  switch (question.type) {
    case "multiple_choice":
      return question.options[question.correctIndex];
    case "true_false":
      return question.correctAnswer ? "Benar" : "Salah";
    case "input":
      return question.correctAnswer;
    case "matching":
      return question.pairs.map((pair) => `${pair.left} → ${pair.right}`).join(", ");
    case "drag_drop":
      return question.correctOrder.join(" → ");
    default:
      return "";
  }
}
