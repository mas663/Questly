import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { inventory, items } from "@/db/schema";
import { getOrCreateCharacter } from "@/lib/character";

export async function GET() {
  const character = await getOrCreateCharacter();

  const rows = await db
    .select({
      id: inventory.id,
      itemId: items.id,
      name: items.name,
      type: items.type,
      rarity: items.rarity,
      icon: items.icon,
      isEquipped: inventory.isEquipped,
      obtainedAt: inventory.obtainedAt,
    })
    .from(inventory)
    .innerJoin(items, eq(items.id, inventory.itemId))
    .where(eq(inventory.characterId, character.id));

  return NextResponse.json({ inventory: rows });
}
