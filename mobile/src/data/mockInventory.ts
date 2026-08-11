export type ItemType = "topi" | "baju" | "aksesori";
export type ItemRarity = "umum" | "langka" | "epik";

export type InventoryItem = {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  icon: string;
  isEquipped: boolean;
};

// Data tiruan inventori — koneksi ke hadiah misi nyata & aksi pakai/lepas
// menyusul di task berikutnya.
export const mockInventory: InventoryItem[] = [
  {
    id: "item-topi-petualang",
    name: "Topi Petualang",
    type: "topi",
    rarity: "langka",
    icon: "🎩",
    isEquipped: true,
  },
  {
    id: "item-baju-default",
    name: "Kaos Petualang",
    type: "baju",
    rarity: "umum",
    icon: "👕",
    isEquipped: true,
  },
  {
    id: "item-kacamata-baca",
    name: "Kacamata Baca",
    type: "aksesori",
    rarity: "langka",
    icon: "👓",
    isEquipped: false,
  },
  {
    id: "item-syal-hangat",
    name: "Syal Hangat",
    type: "aksesori",
    rarity: "umum",
    icon: "🧣",
    isEquipped: false,
  },
  {
    id: "item-jubah-ilmuwan",
    name: "Jubah Ilmuwan",
    type: "baju",
    rarity: "epik",
    icon: "🥼",
    isEquipped: false,
  },
];

export const RARITY_LABEL: Record<ItemRarity, string> = {
  umum: "Umum",
  langka: "Langka",
  epik: "Epik",
};

export const TYPE_LABEL: Record<ItemType, string> = {
  topi: "Topi",
  baju: "Baju",
  aksesori: "Aksesori",
};
