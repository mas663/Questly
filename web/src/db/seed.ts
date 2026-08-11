import { eq } from "drizzle-orm";
import { db } from "./client";
import {
  areas,
  quests,
  questProgress,
  questions,
  attempts,
  characters,
  items,
  inventory,
} from "./schema";

function buildStory(questTitle: string, areaName: string, isBoss: boolean): string {
  const intro = `Petualangan berlanjut di ${areaName}!`;
  if (isBoss) {
    return `${intro}\n\nPenjaga misi "${questTitle}" menghadang jalanmu.\n\nKumpulkan semua kemampuanmu — ini pertarungan terakhir di area ini!`;
  }
  return `${intro}\n\nUntuk melanjutkan, kamu harus menyelesaikan misi "${questTitle}".\n\nAyo tunjukkan kemampuanmu dan raih hadiahnya!`;
}

// Bank soal contoh (bentuk soal bervariasi) yang dipasang di quest pertama
// tiap area. Generate AI & kurikulum penuh menyusul di fase Soal Adaptif.
function sampleQuestionsFor(questId: number) {
  return [
    {
      questId,
      questionType: "multiple_choice" as const,
      content: { prompt: "Berapa hasil dari 3 + 4?", options: ["5", "6", "7", "8"] },
      answer: { correctIndex: 2 },
      explanation: "3 + 4 = 7. Coba hitung pakai jari kalau masih bingung, ya!",
      order: 1,
    },
    {
      questId,
      questionType: "true_false" as const,
      content: { prompt: "Matahari terbit dari sebelah barat." },
      answer: { correctAnswer: false },
      explanation: "Matahari sebenarnya terbit dari sebelah timur, bukan barat.",
      order: 2,
    },
    {
      questId,
      questionType: "input" as const,
      content: { prompt: "Tulis angka setelah 9." },
      answer: { correctAnswer: "10" },
      explanation: "Urutan angka setelah 9 adalah 10.",
      order: 3,
    },
    {
      questId,
      questionType: "matching" as const,
      content: {
        prompt: "Pasangkan hewan dengan suaranya!",
        left: ["Kucing", "Sapi", "Ayam"],
        right: ["Moo", "Kukuruyuk", "Meong"],
      },
      answer: {
        pairs: [
          { left: "Kucing", right: "Meong" },
          { left: "Sapi", right: "Moo" },
          { left: "Ayam", right: "Kukuruyuk" },
        ],
      },
      explanation: "Setiap hewan punya suara khasnya sendiri — kucing meong, sapi moo, ayam kukuruyuk.",
      order: 4,
    },
    {
      questId,
      questionType: "drag_drop" as const,
      content: {
        prompt: "Urutkan kegiatan pagi hari dengan benar!",
        items: ["Sarapan", "Bangun Tidur", "Berangkat Sekolah"],
      },
      answer: { correctOrder: ["Bangun Tidur", "Sarapan", "Berangkat Sekolah"] },
      explanation: "Urutan yang benar: bangun tidur dulu, lalu sarapan, baru berangkat sekolah.",
      order: 5,
    },
  ];
}

async function seed() {
  // Urutan hapus mengikuti arah foreign key: anak dulu, baru induk.
  await db.delete(attempts);
  await db.delete(inventory);
  await db.delete(questions);
  await db.delete(questProgress);
  await db.delete(quests);
  await db.delete(areas);
  await db.delete(items);
  await db.delete(characters);

  const [hutanAngka, pantaiKata, gunungSains, kastilSejarah, pulauLogika] = await db
    .insert(areas)
    .values([
      { name: "Hutan Angka", order: 1, icon: "🌳" },
      { name: "Pantai Kata", order: 2, icon: "🏖️" },
      { name: "Gunung Sains", order: 3, icon: "🌋" },
      { name: "Kastil Sejarah", order: 4, icon: "🏰" },
      { name: "Pulau Logika", order: 5, icon: "🏝️" },
    ])
    .returning();

  const questsByArea = [
    {
      area: hutanAngka,
      quests: [
        { title: "Kenalan dengan Angka", xpReward: 20, coinReward: 10 },
        { title: "Berhitung Sampai 10", xpReward: 20, coinReward: 10 },
        { title: "Tambah Kurang Seru", xpReward: 25, coinReward: 15 },
        { title: "Teka-teki Angka", xpReward: 25, coinReward: 15 },
        { title: "Bos Hutan Angka", xpReward: 50, coinReward: 30 },
      ],
    },
    {
      area: pantaiKata,
      quests: [
        { title: "Huruf dan Bunyi", xpReward: 20, coinReward: 10 },
        { title: "Rangkai Kata", xpReward: 20, coinReward: 10 },
        { title: "Cari Sinonim", xpReward: 25, coinReward: 15 },
        { title: "Susun Kalimat", xpReward: 25, coinReward: 15 },
        { title: "Baca Cepat", xpReward: 30, coinReward: 20 },
        { title: "Bos Pantai Kata", xpReward: 60, coinReward: 35 },
      ],
    },
    {
      area: gunungSains,
      quests: [
        { title: "Kenalan dengan Sains", xpReward: 20, coinReward: 10 },
        { title: "Wujud Benda", xpReward: 25, coinReward: 15 },
        { title: "Percobaan Seru", xpReward: 25, coinReward: 15 },
        { title: "Bos Gunung Sains", xpReward: 60, coinReward: 35 },
      ],
    },
    {
      area: kastilSejarah,
      quests: [
        { title: "Jejak Sejarah", xpReward: 20, coinReward: 10 },
        { title: "Tokoh dan Peristiwa", xpReward: 25, coinReward: 15 },
        { title: "Garis Waktu", xpReward: 25, coinReward: 15 },
        { title: "Bos Kastil Sejarah", xpReward: 60, coinReward: 35 },
      ],
    },
    {
      area: pulauLogika,
      quests: [
        { title: "Pola dan Urutan", xpReward: 20, coinReward: 10 },
        { title: "Teka-teki Logika", xpReward: 25, coinReward: 15 },
        { title: "Sebab Akibat", xpReward: 25, coinReward: 15 },
        { title: "Bos Pulau Logika", xpReward: 60, coinReward: 35 },
      ],
    },
  ];

  let isVeryFirstQuest = true;

  for (const { area, quests: questDefs } of questsByArea) {
    const inserted = await db
      .insert(quests)
      .values(
        questDefs.map((q) => ({
          ...q,
          areaId: area.id,
          type: "main" as const,
          story: buildStory(q.title, area.name, q.title.startsWith("Bos")),
        }))
      )
      .returning();

    // Rantai required_quest_id: quest ke-N butuh quest ke-(N-1) di area yang sama.
    for (let i = 1; i < inserted.length; i++) {
      await db
        .update(quests)
        .set({ requiredQuestId: inserted[i - 1].id })
        .where(eq(quests.id, inserted[i].id));
    }

    await db.insert(questProgress).values(
      inserted.map((q, i) => ({
        questId: q.id,
        // Hanya quest pertama di area pertama yang terbuka di awal permainan;
        // sisanya terkunci sampai quest/area sebelumnya diselesaikan.
        status: isVeryFirstQuest && i === 0 ? ("available" as const) : ("locked" as const),
      }))
    );

    // Contoh bank soal dipasang di quest pertama tiap area saja.
    await db.insert(questions).values(sampleQuestionsFor(inserted[0].id));

    isVeryFirstQuest = false;
  }

  const [character] = await db
    .insert(characters)
    .values({
      name: "Rangga",
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      coins: 0,
    })
    .returning();

  const insertedItems = await db
    .insert(items)
    .values([
      { name: "Topi Petualang", type: "topi", rarity: "langka", icon: "🎩", price: 150 },
      { name: "Kaos Petualang", type: "baju", rarity: "umum", icon: "👕", price: 50 },
      { name: "Kacamata Baca", type: "aksesori", rarity: "langka", icon: "👓", price: 120 },
      { name: "Syal Hangat", type: "aksesori", rarity: "umum", icon: "🧣", price: 40 },
      { name: "Jubah Ilmuwan", type: "baju", rarity: "epik", icon: "🥼", price: 300 },
    ])
    .returning();

  // Setiap karakter mulai dengan baju dasar terpakai (starter outfit).
  const starterOutfit = insertedItems.find((item) => item.name === "Kaos Petualang");
  if (starterOutfit) {
    await db.insert(inventory).values({
      characterId: character.id,
      itemId: starterOutfit.id,
      isEquipped: true,
    });
  }

  console.log(
    "Seed selesai: 5 area, 23 quest, 25 soal contoh, 1 karakter, 5 item katalog ditambahkan."
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
