export type LeaderboardPlayer = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
};

// Pemain lain bersifat tiruan — leaderboard multi-pemain sungguhan menyusul
// saat backend akun/profil (fase Akun & Pengaturan) tersedia.
export const mockOtherPlayers: LeaderboardPlayer[] = [
  { id: "p-1", name: "Sasa", avatar: "🧒", level: 5, xp: 40 },
  { id: "p-2", name: "Dimas", avatar: "👦", level: 4, xp: 80 },
  { id: "p-3", name: "Kirana", avatar: "👧", level: 3, xp: 60 },
  { id: "p-4", name: "Bagas", avatar: "🧑", level: 3, xp: 10 },
  { id: "p-5", name: "Nadia", avatar: "👩‍🦰", level: 2, xp: 90 },
  { id: "p-6", name: "Farel", avatar: "🧑‍🦱", level: 1, xp: 30 },
];
