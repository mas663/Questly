import type { Topic } from "../data/mockTopics";

export type Difficulty = "mudah" | "sedang" | "sulit";

export type AdaptiveSelection = {
  topic: Topic;
  difficulty: Difficulty;
};

// Skor penguasaan rendah → soal lebih mudah dulu untuk membangun rasa
// percaya diri; skor tinggi → tantangan lebih sulit agar tidak membosankan.
export function difficultyForMastery(mastery: number): Difficulty {
  if (mastery < 40) return "mudah";
  if (mastery < 70) return "sedang";
  return "sulit";
}

// Pilih topik yang paling perlu dilatih (skor penguasaan terendah) beserta
// tingkat kesulitan yang sesuai. Analisis performa nyata (dari riwayat
// jawaban) menyusul saat backend Soal Adaptif dibangun.
export function selectNextTopic(topics: Topic[]): AdaptiveSelection | null {
  if (topics.length === 0) return null;
  const weakest = [...topics].sort((a, b) => a.masteryLevel - b.masteryLevel)[0];
  return { topic: weakest, difficulty: difficultyForMastery(weakest.masteryLevel) };
}

// Pesan singkat & halus yang menjelaskan kenapa tingkat kesulitan dipilih,
// tanpa membingungkan anak dengan angka skor penguasaan mentah.
export function getAdaptationMessage(selection: AdaptiveSelection): string {
  switch (selection.difficulty) {
    case "mudah":
      return "Ayo mulai pelan-pelan dulu di topik ini — kamu pasti bisa! 💪";
    case "sedang":
      return "Soal sedikit lebih menantang, sesuai kemampuanmu sekarang! ⭐";
    case "sulit":
      return "Kamu hebat! Ini tantangan baru buat kamu 🔥";
  }
}
