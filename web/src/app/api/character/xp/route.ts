import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { characters } from "@/db/schema";
import { getOrCreateCharacter } from "@/lib/character";

export async function POST(req: Request) {
  let body: { xpGained?: number; coinGained?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid" }, { status: 400 });
  }

  const xpGained = body.xpGained;
  const coinGained = body.coinGained ?? 0;

  if (typeof xpGained !== "number" || xpGained < 0) {
    return NextResponse.json({ error: "Field 'xpGained' wajib berupa angka >= 0" }, { status: 400 });
  }
  if (typeof coinGained !== "number" || coinGained < 0) {
    return NextResponse.json({ error: "Field 'coinGained' harus berupa angka >= 0" }, { status: 400 });
  }

  const character = await getOrCreateCharacter();

  // Tambahkan XP & koin, naikkan level selama XP sudah cukup (sisa dibawa ke level berikutnya).
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

  const [updated] = await db
    .update(characters)
    .set({ xp, level, xpToNextLevel, coins: character.coins + coinGained })
    .where(eq(characters.id, character.id))
    .returning();

  return NextResponse.json({
    character: updated,
    xpGained,
    coinGained,
    leveledUp,
    newLevel: level,
  });
}
