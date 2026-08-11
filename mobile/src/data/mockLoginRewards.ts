export type LoginReward = {
  day: number;
  icon: string;
  label: string;
  coinReward: number;
  itemLabel?: string;
};

// Siklus hadiah login 7 hari — berulang setelah hari ke-7.
export const loginRewardCycle: LoginReward[] = [
  { day: 1, icon: "🪙", label: "10 Koin", coinReward: 10 },
  { day: 2, icon: "🪙", label: "15 Koin", coinReward: 15 },
  { day: 3, icon: "🧣", label: "Syal Hangat", coinReward: 0, itemLabel: "Syal Hangat" },
  { day: 4, icon: "🪙", label: "20 Koin", coinReward: 20 },
  { day: 5, icon: "🪙", label: "25 Koin", coinReward: 25 },
  { day: 6, icon: "👓", label: "Kacamata Baca", coinReward: 0, itemLabel: "Kacamata Baca" },
  { day: 7, icon: "🥼", label: "Jubah Ilmuwan + 50 Koin", coinReward: 50, itemLabel: "Jubah Ilmuwan" },
];
