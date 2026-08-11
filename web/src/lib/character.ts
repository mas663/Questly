import { db } from "@/db/client";
import { characters } from "@/db/schema";

// Belum ada akun/profil (fase Akun & Pengaturan), jadi selalu ada tepat
// satu karakter single-player yang dipakai di seluruh API.
export async function getOrCreateCharacter() {
  const [existing] = await db.select().from(characters).limit(1);
  if (existing) return existing;

  const [created] = await db
    .insert(characters)
    .values({ name: "Rangga", level: 1, xp: 0, xpToNextLevel: 100, coins: 0 })
    .returning();
  return created;
}
