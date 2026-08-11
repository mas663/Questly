import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { inventory, items } from "@/db/schema";
import { getOrCreateCharacter } from "@/lib/character";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ inventoryId: string }> }
) {
  const { inventoryId: inventoryIdParam } = await params;
  const inventoryId = Number(inventoryIdParam);

  if (!Number.isInteger(inventoryId)) {
    return NextResponse.json({ error: "inventoryId tidak valid" }, { status: 400 });
  }

  const character = await getOrCreateCharacter();

  const [target] = await db
    .select({
      id: inventory.id,
      characterId: inventory.characterId,
      isEquipped: inventory.isEquipped,
      itemType: items.type,
    })
    .from(inventory)
    .innerJoin(items, eq(items.id, inventory.itemId))
    .where(eq(inventory.id, inventoryId));

  if (!target || target.characterId !== character.id) {
    return NextResponse.json({ error: "Item inventori tidak ditemukan" }, { status: 404 });
  }

  if (target.isEquipped) {
    await db.update(inventory).set({ isEquipped: false }).where(eq(inventory.id, inventoryId));
  } else {
    // Hanya satu item per jenis (topi/baju/aksesori) yang bisa dipakai sekaligus.
    const sameTypeEquipped = await db
      .select({ id: inventory.id })
      .from(inventory)
      .innerJoin(items, eq(items.id, inventory.itemId))
      .where(
        and(
          eq(inventory.characterId, character.id),
          eq(items.type, target.itemType),
          eq(inventory.isEquipped, true)
        )
      );

    for (const row of sameTypeEquipped) {
      await db.update(inventory).set({ isEquipped: false }).where(eq(inventory.id, row.id));
    }

    await db.update(inventory).set({ isEquipped: true }).where(eq(inventory.id, inventoryId));
  }

  const updatedInventory = await db
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

  return NextResponse.json({ inventory: updatedInventory });
}
