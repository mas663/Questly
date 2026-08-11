import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockAreas, type Area } from "../data/mockAreas";
import { mockQuests, type Quest } from "../data/mockQuests";
import { mockInventory, type InventoryItem } from "../data/mockInventory";
import { mockDailyQuests, type DailyQuest } from "../data/mockDailyQuests";
import { loginRewardCycle, type LoginReward } from "../data/mockLoginRewards";
import { achievements, type Achievement, type AchievementContext } from "../data/achievements";
import { applyReward, type CharacterState } from "../lib/characterProgress";

export type { CharacterState } from "../lib/characterProgress";

export type UnlockedAreaEvent = {
  id: string;
  name: string;
  icon: string;
};

export type QuestCompletionResult = {
  quest: Quest;
  xpGained: number;
  coinGained: number;
  itemGained: string | null;
  leveledUp: boolean;
  newLevel: number;
  unlockedArea: UnlockedAreaEvent | null;
};

export type DailyQuestClaimResult = {
  quest: DailyQuest;
  xpGained: number;
  coinGained: number;
  leveledUp: boolean;
  newLevel: number;
};

export type LoginRewardState = {
  currentDay: number;
  lastClaimedDate: string | null;
};

export type LoginRewardClaimResult = {
  reward: LoginReward;
  coinGained: number;
  leveledUp: boolean;
  newLevel: number;
};

export type AttendanceState = {
  streak: number;
  checkinDates: string[];
};

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

// Satu kunci untuk seluruh progres game (peta, karakter, inventori/penampilan,
// misi harian) karena belum ada akun/profil server-side — lihat fase Akun & Pengaturan.
const STORAGE_KEY = "questly:game-progress:v8";

const INITIAL_CHARACTER: CharacterState = {
  name: "Rangga",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  coins: 0,
};

const INITIAL_LOGIN_REWARD: LoginRewardState = {
  currentDay: 1,
  lastClaimedDate: null,
};

const INITIAL_ATTENDANCE: AttendanceState = {
  streak: 0,
  checkinDates: [],
};

type StoredProgress = {
  areas: Area[];
  quests: Quest[];
  character: CharacterState;
  inventory: InventoryItem[];
  dailyQuests: DailyQuest[];
  loginReward: LoginRewardState;
  attendance: AttendanceState;
  seenAchievementIds: string[];
};

export function useWorldProgress() {
  const [areas, setAreas] = useState<Area[]>(() => mockAreas.map((a) => ({ ...a })));
  const [quests, setQuests] = useState<Quest[]>(() => mockQuests.map((q) => ({ ...q })));
  const [character, setCharacter] = useState<CharacterState>(() => ({ ...INITIAL_CHARACTER }));
  const [inventory, setInventory] = useState<InventoryItem[]>(() =>
    mockInventory.map((item) => ({ ...item }))
  );
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(() =>
    mockDailyQuests.map((q) => ({ ...q }))
  );
  const [loginReward, setLoginReward] = useState<LoginRewardState>(() => ({
    ...INITIAL_LOGIN_REWARD,
  }));
  const [attendance, setAttendance] = useState<AttendanceState>(() => ({
    ...INITIAL_ATTENDANCE,
  }));
  const [unlockedArea, setUnlockedArea] = useState<UnlockedAreaEvent | null>(null);
  const [seenAchievementIds, setSeenAchievementIds] = useState<string[]>([]);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasHydrated = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as StoredProgress;
          setAreas(saved.areas);
          setQuests(saved.quests);
          setCharacter(saved.character ?? INITIAL_CHARACTER);
          setInventory(saved.inventory ?? mockInventory);
          setDailyQuests(saved.dailyQuests ?? mockDailyQuests);
          setLoginReward(saved.loginReward ?? INITIAL_LOGIN_REWARD);
          setAttendance(saved.attendance ?? INITIAL_ATTENDANCE);
          setSeenAchievementIds(saved.seenAchievementIds ?? []);
        }
      } catch {
        // Data lokal rusak/tidak terbaca — lanjut dengan progress awal.
      } finally {
        hasHydrated.current = true;
        setIsLoaded(true);
      }
    })();
  }, []);

  // Catat kehadiran hari ini secara otomatis begitu progres selesai dimuat
  // (mewakili "anak membuka aplikasi"). Streak naik jika kemarin juga hadir,
  // reset ke 1 jika ada hari yang terlewat, dan tidak berubah jika hari ini
  // sudah tercatat sebelumnya.
  useEffect(() => {
    if (!isLoaded) return;
    setAttendance((prev) => {
      const today = todayString();
      if (prev.checkinDates.includes(today)) return prev;

      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = yesterdayDate.toISOString().slice(0, 10);

      const newStreak = prev.checkinDates.includes(yesterday) ? prev.streak + 1 : 1;
      const nextCheckinDates = [...prev.checkinDates, today].slice(-30);

      return { streak: newStreak, checkinDates: nextCheckinDates };
    });
  }, [isLoaded]);

  // Deteksi lencana yang baru terbuka dari progres terkini, lalu antrikan
  // pop-up notifikasinya. Ditandai "sudah dilihat" saat terdeteksi (bukan
  // saat ditutup) supaya tidak muncul dua kali walau app ditutup-buka lagi.
  useEffect(() => {
    if (!isLoaded) return;
    const ctx: AchievementContext = {
      character,
      areas,
      inventory,
      dailyQuests,
      attendanceStreak: attendance.streak,
    };
    const newlyUnlocked = achievements.filter(
      (a) => !seenAchievementIds.includes(a.id) && a.isUnlocked(ctx)
    );
    if (newlyUnlocked.length === 0) return;

    setSeenAchievementIds((prev) => [...prev, ...newlyUnlocked.map((a) => a.id)]);
    setAchievementQueue((prev) => [...prev, ...newlyUnlocked]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, character, areas, inventory, dailyQuests, attendance.streak]);

  useEffect(() => {
    if (!hasHydrated.current) return;
    const payload: StoredProgress = {
      areas,
      quests,
      character,
      inventory,
      dailyQuests,
      loginReward,
      attendance,
      seenAchievementIds,
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload)).catch(() => {
      // Gagal menyimpan progress lokal — diabaikan, tidak menghentikan gameplay.
    });
  }, [areas, quests, character, inventory, dailyQuests, loginReward, attendance, seenAchievementIds]);

  function completeQuest(questId: string): QuestCompletionResult | null {
    const target = quests.find((q) => q.id === questId);
    if (!target || target.status !== "available") return null;

    const completedQuest: Quest = { ...target, status: "completed" };

    const nextQuests = quests.map((q) => {
      if (q.id === questId) return completedQuest;
      if (q.areaId === target.areaId && q.status === "locked" && q.requiredQuestTitle === target.title) {
        return { ...q, status: "available" as const };
      }
      return q;
    });

    let justUnlocked: UnlockedAreaEvent | null = null;

    const nextAreas = areas.map((a) => {
      if (a.id !== target.areaId) return a;
      const completedCount = nextQuests.filter((q) => q.areaId === a.id && q.status === "completed").length;
      const isFullyDone = completedCount >= a.totalQuests;
      return { ...a, completedQuests: completedCount, status: isFullyDone ? "completed" : a.status };
    });

    const finishedArea = nextAreas.find((a) => a.id === target.areaId)!;
    const unlockedAreas = finishedArea.status === "completed"
      ? nextAreas.map((a) => {
          if (a.status === "locked" && a.requiredAreaName === finishedArea.name) {
            justUnlocked = { id: a.id, name: a.name, icon: a.icon };
            return { ...a, status: "open" as const };
          }
          return a;
        })
      : nextAreas;

    const { character: nextCharacter, leveledUp, newLevel } = applyReward(
      character,
      target.xpReward,
      target.coinReward
    );

    setQuests(nextQuests);
    setAreas(unlockedAreas);
    setCharacter(nextCharacter);
    if (justUnlocked) setUnlockedArea(justUnlocked);

    return {
      quest: completedQuest,
      xpGained: target.xpReward,
      coinGained: target.coinReward,
      itemGained: target.itemReward ?? null,
      leveledUp,
      newLevel,
      unlockedArea: justUnlocked,
    };
  }

  function claimDailyQuestReward(dailyQuestId: string): DailyQuestClaimResult | null {
    const target = dailyQuests.find((q) => q.id === dailyQuestId);
    if (!target || target.status !== "selesai" || target.isClaimed) return null;

    const { character: nextCharacter, leveledUp, newLevel } = applyReward(
      character,
      target.xpReward,
      target.coinReward
    );

    setCharacter(nextCharacter);
    setDailyQuests((prev) =>
      prev.map((q) => (q.id === dailyQuestId ? { ...q, isClaimed: true } : q))
    );

    return {
      quest: target,
      xpGained: target.xpReward,
      coinGained: target.coinReward,
      leveledUp,
      newLevel,
    };
  }

  function claimLoginReward(): LoginRewardClaimResult | null {
    const today = todayString();
    if (loginReward.lastClaimedDate === today) return null; // sudah klaim hari ini

    const reward = loginRewardCycle[(loginReward.currentDay - 1) % loginRewardCycle.length];
    const { character: nextCharacter, leveledUp, newLevel } = applyReward(
      character,
      0,
      reward.coinReward
    );

    const nextDay = loginReward.currentDay >= loginRewardCycle.length ? 1 : loginReward.currentDay + 1;

    setCharacter(nextCharacter);
    setLoginReward({ currentDay: nextDay, lastClaimedDate: today });

    return { reward, coinGained: reward.coinReward, leveledUp, newLevel };
  }

  function clearUnlockedArea() {
    setUnlockedArea(null);
  }

  function dismissAchievementNotification() {
    setAchievementQueue((prev) => prev.slice(1));
  }

  function toggleEquipItem(itemId: string) {
    const target = inventory.find((item) => item.id === itemId);
    if (!target) return;

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) return { ...item, isEquipped: !target.isEquipped };
        // Hanya satu item per jenis (topi/baju/aksesori) yang bisa dipakai sekaligus.
        if (!target.isEquipped && item.type === target.type && item.isEquipped) {
          return { ...item, isEquipped: false };
        }
        return item;
      })
    );
  }

  return {
    areas,
    quests,
    character,
    inventory,
    dailyQuests,
    loginReward,
    attendance,
    completeQuest,
    claimDailyQuestReward,
    claimLoginReward,
    toggleEquipItem,
    unlockedArea,
    clearUnlockedArea,
    newAchievement: achievementQueue[0] ?? null,
    dismissAchievementNotification,
    isLoaded,
  };
}
