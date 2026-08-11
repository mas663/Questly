export type Topic = {
  id: string;
  name: string;
  // Skor penguasaan 0-100 — data tiruan; analisis performa nyata menyusul
  // di task "ringkasan kekuatan dan kelemahan topik" & "pemilihan adaptif".
  masteryLevel: number;
};

export type SubjectGroup = {
  id: string;
  subject: string;
  icon: string;
  topics: Topic[];
};

// Kelas anak — placeholder sampai profil akun (fase Akun & Pengaturan) ada.
// Soal tetap harus selalu bisa menyebutkan kelas/mapel/topik/kesulitannya.
export const DEMO_GRADE = "SD Kelas 2";

export const mockSubjects: SubjectGroup[] = [
  {
    id: "subj-matematika",
    subject: "Matematika",
    icon: "🔢",
    topics: [
      { id: "t-mtk-1", name: "Penjumlahan & Pengurangan", masteryLevel: 78 },
      { id: "t-mtk-2", name: "Perkalian Dasar", masteryLevel: 45 },
      { id: "t-mtk-3", name: "Pengukuran", masteryLevel: 20 },
    ],
  },
  {
    id: "subj-bahasa",
    subject: "Bahasa Indonesia",
    icon: "📖",
    topics: [
      { id: "t-bin-1", name: "Kosakata", masteryLevel: 82 },
      { id: "t-bin-2", name: "Membaca Cepat", masteryLevel: 60 },
    ],
  },
  {
    id: "subj-sains",
    subject: "Sains",
    icon: "🔬",
    topics: [
      { id: "t-ipa-1", name: "Wujud Benda", masteryLevel: 55 },
      { id: "t-ipa-2", name: "Makhluk Hidup", masteryLevel: 30 },
    ],
  },
  {
    id: "subj-logika",
    subject: "Logika",
    icon: "🧩",
    topics: [
      { id: "t-log-1", name: "Pola dan Urutan", masteryLevel: 65 },
      { id: "t-log-2", name: "Sebab Akibat", masteryLevel: 40 },
    ],
  },
];

export function averageMastery(topics: Topic[]): number {
  if (topics.length === 0) return 0;
  return Math.round(topics.reduce((sum, t) => sum + t.masteryLevel, 0) / topics.length);
}

export function masteryLabel(mastery: number): "Kuat" | "Cukup" | "Perlu Latihan" {
  if (mastery >= 70) return "Kuat";
  if (mastery >= 40) return "Cukup";
  return "Perlu Latihan";
}
