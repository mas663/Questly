export type QuestStatus = "locked" | "available" | "completed";
export type QuestKind = "main" | "boss";

export type Quest = {
  id: string;
  areaId: string;
  title: string;
  kind: QuestKind;
  status: QuestStatus;
  requiredQuestTitle?: string;
  xpReward: number;
  coinReward: number;
  itemReward?: string;
};

export const mockQuests: Quest[] = [
  // Hutan Angka — selesai semua
  { id: "q1-1", areaId: "area-1", title: "Kenalan dengan Angka", kind: "main", status: "completed", xpReward: 20, coinReward: 10 },
  { id: "q1-2", areaId: "area-1", title: "Berhitung Sampai 10", kind: "main", status: "completed", xpReward: 20, coinReward: 10 },
  { id: "q1-3", areaId: "area-1", title: "Tambah Kurang Seru", kind: "main", status: "completed", xpReward: 25, coinReward: 15 },
  { id: "q1-4", areaId: "area-1", title: "Teka-teki Angka", kind: "main", status: "completed", xpReward: 25, coinReward: 15 },
  { id: "q1-5", areaId: "area-1", title: "Bos Hutan Angka", kind: "boss", status: "completed", xpReward: 50, coinReward: 30, itemReward: "Topi Petualang" },

  // Pantai Kata — sedang jalan
  { id: "q2-1", areaId: "area-2", title: "Huruf dan Bunyi", kind: "main", status: "completed", xpReward: 20, coinReward: 10 },
  { id: "q2-2", areaId: "area-2", title: "Rangkai Kata", kind: "main", status: "completed", xpReward: 20, coinReward: 10 },
  { id: "q2-3", areaId: "area-2", title: "Cari Sinonim", kind: "main", status: "completed", xpReward: 25, coinReward: 15 },
  { id: "q2-4", areaId: "area-2", title: "Susun Kalimat", kind: "main", status: "available", xpReward: 25, coinReward: 15 },
  { id: "q2-5", areaId: "area-2", title: "Baca Cepat", kind: "main", status: "locked", requiredQuestTitle: "Susun Kalimat", xpReward: 30, coinReward: 20 },
  { id: "q2-6", areaId: "area-2", title: "Bos Pantai Kata", kind: "boss", status: "locked", requiredQuestTitle: "Baca Cepat", xpReward: 60, coinReward: 35, itemReward: "Kacamata Baca" },

  // Gunung Sains — baru dibuka
  { id: "q3-1", areaId: "area-3", title: "Kenalan dengan Sains", kind: "main", status: "available", xpReward: 20, coinReward: 10 },
  { id: "q3-2", areaId: "area-3", title: "Wujud Benda", kind: "main", status: "locked", requiredQuestTitle: "Kenalan dengan Sains", xpReward: 25, coinReward: 15 },
  { id: "q3-3", areaId: "area-3", title: "Percobaan Seru", kind: "main", status: "locked", requiredQuestTitle: "Wujud Benda", xpReward: 25, coinReward: 15 },
  { id: "q3-4", areaId: "area-3", title: "Bos Gunung Sains", kind: "boss", status: "locked", requiredQuestTitle: "Percobaan Seru", xpReward: 60, coinReward: 35, itemReward: "Jubah Ilmuwan" },
];

export function getQuestsForArea(areaId: string): Quest[] {
  return mockQuests.filter((q) => q.areaId === areaId);
}
