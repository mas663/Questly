import React from "react";
import type { Question } from "../../data/mockQuestions";
import { MultipleChoiceView } from "./MultipleChoiceView";
import { TrueFalseView } from "./TrueFalseView";
import { InputAnswerView } from "./InputAnswerView";
import { MatchingView } from "./MatchingView";
import { DragDropView } from "./DragDropView";

type Props = {
  question: Question;
  value: unknown;
  locked: boolean;
  onChange: (value: unknown) => void;
};

export function QuestionRenderer({ question, value, locked, onChange }: Props) {
  switch (question.type) {
    case "multiple_choice":
      return (
        <MultipleChoiceView
          question={question}
          value={value as number | undefined}
          locked={locked}
          onChange={onChange}
        />
      );
    case "true_false":
      return (
        <TrueFalseView value={value as boolean | undefined} locked={locked} onChange={onChange} />
      );
    case "input":
      return (
        <InputAnswerView value={value as string | undefined} locked={locked} onChange={onChange} />
      );
    case "matching":
      return (
        <MatchingView
          question={question}
          value={value as Record<string, string> | undefined}
          locked={locked}
          onChange={onChange}
        />
      );
    case "drag_drop":
      return (
        <DragDropView
          question={question}
          value={value as string[] | undefined}
          locked={locked}
          onChange={onChange}
        />
      );
  }
}
