export type DailyQuestStatus = "belum" | "selesai";

export type DailyQuest = {
  id: string;
  title: string;
  requirement: string;
  progressCurrent: number;
  progressTarget: number;
  status: DailyQuestStatus;
  xpReward: number;
  coinReward: number;
  isClaimed: boolean;
};

// 1-3 misi harian yang berganti tiap hari — sumber data & penjadwalan
// harian sesungguhnya menyusul saat backend Hadiah Harian dibangun.
export const mockDailyQuests: DailyQuest[] = [
  {
    id: "dq-jawab-soal",
    title: "Jawab 5 Soal",
    requirement: "Jawab 5 soal di misi atau latihan mana saja",
    progressCurrent: 5,
    progressTarget: 5,
    status: "selesai",
    xpReward: 20,
    coinReward: 15,
    isClaimed: false,
  },
  {
    id: "dq-selesaikan-misi",
    title: "Selesaikan 1 Misi",
    requirement: "Selesaikan 1 misi di area mana saja",
    progressCurrent: 0,
    progressTarget: 1,
    status: "belum",
    xpReward: 25,
    coinReward: 20,
    isClaimed: false,
  },
  {
    id: "dq-latihan-adaptif",
    title: "Coba Latihan Adaptif",
    requirement: "Selesaikan 1 sesi Latihan Adaptif",
    progressCurrent: 0,
    progressTarget: 1,
    status: "belum",
    xpReward: 15,
    coinReward: 10,
    isClaimed: false,
  },
];
