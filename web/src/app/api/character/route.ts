import { NextResponse } from "next/server";
import { getOrCreateCharacter } from "@/lib/character";

export async function GET() {
  const character = await getOrCreateCharacter();
  return NextResponse.json({ character });
}
