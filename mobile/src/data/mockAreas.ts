export type AreaStatus = "locked" | "open" | "completed";

export type Area = {
  id: string;
  name: string;
  order: number;
  icon: string;
  status: AreaStatus;
  totalQuests: number;
  completedQuests: number;
  requiredAreaName?: string;
};

export const mockAreas: Area[] = [
  {
    id: "area-1",
    name: "Hutan Angka",
    order: 1,
    icon: "🌳",
    status: "completed",
    totalQuests: 5,
    completedQuests: 5,
  },
  {
    id: "area-2",
    name: "Pantai Kata",
    order: 2,
    icon: "🏖️",
    status: "open",
    totalQuests: 6,
    completedQuests: 3,
  },
  {
    id: "area-3",
    name: "Gunung Sains",
    order: 3,
    icon: "🌋",
    status: "open",
    totalQuests: 4,
    completedQuests: 0,
  },
  {
    id: "area-4",
    name: "Kastil Sejarah",
    order: 4,
    icon: "🏰",
    status: "locked",
    totalQuests: 5,
    completedQuests: 0,
    requiredAreaName: "Gunung Sains",
  },
  {
    id: "area-5",
    name: "Pulau Logika",
    order: 5,
    icon: "🏝️",
    status: "locked",
    totalQuests: 6,
    completedQuests: 0,
    requiredAreaName: "Kastil Sejarah",
  },
];
