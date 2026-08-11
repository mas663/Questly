export type QuestionType = "multiple_choice" | "true_false" | "input" | "matching" | "drag_drop";

type BaseQuestion = {
  id: string;
  prompt: string;
  type: QuestionType;
  explanation: string;
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple_choice";
  options: string[];
  correctIndex: number;
};

export type TrueFalseQuestion = BaseQuestion & {
  type: "true_false";
  correctAnswer: boolean;
};

export type InputQuestion = BaseQuestion & {
  type: "input";
  correctAnswer: string;
};

export type MatchingPair = { left: string; right: string };

export type MatchingQuestion = BaseQuestion & {
  type: "matching";
  pairs: MatchingPair[];
};

export type DragDropQuestion = BaseQuestion & {
  type: "drag_drop";
  items: string[];
  correctOrder: string[];
};

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | InputQuestion
  | MatchingQuestion
  | DragDropQuestion;

// Bank soal generik untuk menguji alur gameplay (bentuk soal bervariasi).
// Konten kurikulum & generate AI menyusul di fase Soal Adaptif.
const QUESTION_POOL: Question[] = [
  {
    id: "q-mc",
    type: "multiple_choice",
    prompt: "Berapa hasil dari 3 + 4?",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
    explanation: "3 + 4 = 7. Coba hitung pakai jari kalau masih bingung, ya!",
  },
  {
    id: "q-tf",
    type: "true_false",
    prompt: "Matahari terbit dari sebelah barat.",
    correctAnswer: false,
    explanation: "Matahari sebenarnya terbit dari sebelah timur, bukan barat.",
  },
  {
    id: "q-input",
    type: "input",
    prompt: "Tulis angka setelah 9.",
    correctAnswer: "10",
    explanation: "Urutan angka setelah 9 adalah 10.",
  },
  {
    id: "q-match",
    type: "matching",
    prompt: "Pasangkan hewan dengan suaranya!",
    pairs: [
      { left: "Kucing", right: "Meong" },
      { left: "Sapi", right: "Moo" },
      { left: "Ayam", right: "Kukuruyuk" },
    ],
    explanation: "Setiap hewan punya suara khasnya sendiri — kucing meong, sapi moo, ayam kukuruyuk.",
  },
  {
    id: "q-dnd",
    type: "drag_drop",
    prompt: "Urutkan kegiatan pagi hari dengan benar!",
    items: ["Sarapan", "Bangun Tidur", "Berangkat Sekolah"],
    correctOrder: ["Bangun Tidur", "Sarapan", "Berangkat Sekolah"],
    explanation: "Urutan yang benar: bangun tidur dulu, lalu sarapan, baru berangkat sekolah.",
  },
];

export function getQuestionsForQuest(_questId: string): Question[] {
  return QUESTION_POOL;
}
