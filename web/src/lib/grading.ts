export type QuestionType = "multiple_choice" | "true_false" | "input" | "matching" | "drag_drop";

export function isAnswerCorrect(
  questionType: QuestionType,
  storedAnswer: Record<string, unknown>,
  submitted: unknown
): boolean {
  switch (questionType) {
    case "multiple_choice":
      return submitted === storedAnswer.correctIndex;
    case "true_false":
      return submitted === storedAnswer.correctAnswer;
    case "input": {
      const correct = storedAnswer.correctAnswer;
      return (
        typeof submitted === "string" &&
        typeof correct === "string" &&
        submitted.trim().toLowerCase() === correct.trim().toLowerCase()
      );
    }
    case "matching": {
      if (typeof submitted !== "object" || submitted === null) return false;
      const submittedPairs = submitted as Record<string, string>;
      const pairs = storedAnswer.pairs as Array<{ left: string; right: string }>;
      return pairs.every((pair) => submittedPairs[pair.left] === pair.right);
    }
    case "drag_drop": {
      if (!Array.isArray(submitted)) return false;
      const correctOrder = storedAnswer.correctOrder as string[];
      return (
        submitted.length === correctOrder.length &&
        submitted.every((item, i) => item === correctOrder[i])
      );
    }
    default:
      return false;
  }
}

export function getCorrectAnswerText(
  questionType: QuestionType,
  content: Record<string, unknown>,
  storedAnswer: Record<string, unknown>
): string {
  switch (questionType) {
    case "multiple_choice": {
      const options = content.options as string[];
      return options[storedAnswer.correctIndex as number];
    }
    case "true_false":
      return storedAnswer.correctAnswer ? "Benar" : "Salah";
    case "input":
      return storedAnswer.correctAnswer as string;
    case "matching": {
      const pairs = storedAnswer.pairs as Array<{ left: string; right: string }>;
      return pairs.map((pair) => `${pair.left} → ${pair.right}`).join(", ");
    }
    case "drag_drop":
      return (storedAnswer.correctOrder as string[]).join(" → ");
    default:
      return "";
  }
}
