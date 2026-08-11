import type { CharacterState } from "../hooks/useWorldProgress";
import type { Area } from "./mockAreas";
import type { InventoryItem } from "./mockInventory";
import type { DailyQuest } from "./mockDailyQuests";

export type AchievementContext = {
  character: CharacterState;
  areas: Area[];
  inventory: InventoryItem[];
  dailyQuests: DailyQuest[];
  attendanceStreak: number;
};

export type Achievement = {
  id: string;
  icon: string;
  name: string;
  description: string;
  isUnlocked: (ctx: AchievementContext) => boolean;
};

function totalCompletedQuests(areas: Area[]): number {
  return areas.reduce((sum, a) => sum + a.completedQuests, 0);
}

// Semua lencana dihitung langsung dari progres anak (level, quest, area,
// item, streak) — tidak ada status yang diisi manual.
export const achievements: Achievement[] = [
  {
    id: "ach-langkah-pertama",
    icon: "🥾",
    name: "Langkah Pertama",
    description: "Selesaikan misi pertamamu",
    isUnlocked: (ctx) => totalCompletedQuests(ctx.areas) >= 1,
  },
  {
    id: "ach-rajin-berlatih",
    icon: "📚",
    name: "Rajin Berlatih",
    description: "Selesaikan 5 misi",
    isUnlocked: (ctx) => totalCompletedQuests(ctx.areas) >= 5,
  },
  {
    id: "ach-penjelajah",
    icon: "🗺️",
    name: "Penjelajah",
    description: "Buka area kedua di peta petualangan",
    isUnlocked: (ctx) => ctx.areas.filter((a) => a.status !== "locked").length >= 2,
  },
  {
    id: "ach-naik-level",
    icon: "⭐",
    name: "Naik Level",
    description: "Capai level 2",
    isUnlocked: (ctx) => ctx.character.level >= 2,
  },
  {
    id: "ach-master-area",
    icon: "🏆",
    name: "Penakluk Area",
    description: "Selesaikan semua misi di satu area",
    isUnlocked: (ctx) => ctx.areas.some((a) => a.status === "completed"),
  },
  {
    id: "ach-kolektor",
    icon: "🎒",
    name: "Kolektor",
    description: "Miliki 3 item di inventori",
    isUnlocked: (ctx) => ctx.inventory.length >= 3,
  },
  {
    id: "ach-kaya-raya",
    icon: "💰",
    name: "Kaya Raya",
    description: "Kumpulkan 100 koin",
    isUnlocked: (ctx) => ctx.character.coins >= 100,
  },
  {
    id: "ach-misi-harian",
    icon: "🎯",
    name: "Misi Harian Pertama",
    description: "Klaim hadiah dari satu misi harian",
    isUnlocked: (ctx) => ctx.dailyQuests.some((q) => q.isClaimed),
  },
  {
    id: "ach-api-semangat",
    icon: "🔥",
    name: "Api Semangat",
    description: "Aktif 3 hari berturut-turut",
    isUnlocked: (ctx) => ctx.attendanceStreak >= 3,
  },
  {
    id: "ach-pemain-setia",
    icon: "👑",
    name: "Pemain Setia",
    description: "Aktif 7 hari berturut-turut",
    isUnlocked: (ctx) => ctx.attendanceStreak >= 7,
  },
];
