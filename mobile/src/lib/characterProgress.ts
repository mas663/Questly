export type CharacterState = {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
};

export type RewardApplication = {
  character: CharacterState;
  leveledUp: boolean;
  newLevel: number;
};

// Tambahkan XP & koin ke karakter, naikkan level selama XP mencukupi
// (sisa dibawa ke level berikutnya). Dipakai bersama oleh alur selesaikan
// quest & klaim hadiah harian supaya perhitungannya konsisten.
export function applyReward(
  character: CharacterState,
  xpGained: number,
  coinGained: number
): RewardApplication {
  let xp = character.xp + xpGained;
  let level = character.level;
  let xpToNextLevel = character.xpToNextLevel;
  let leveledUp = false;

  while (xp >= xpToNextLevel) {
    xp -= xpToNextLevel;
    level += 1;
    xpToNextLevel = Math.round(xpToNextLevel * 1.2);
    leveledUp = true;
  }

  return {
    character: { ...character, xp, level, xpToNextLevel, coins: character.coins + coinGained },
    leveledUp,
    newLevel: level,
  };
}
