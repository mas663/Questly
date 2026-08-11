import { sqliteTable, integer, text, type AnySQLiteColumn } from "drizzle-orm/sqlite-core";

export const areas = sqliteTable("areas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  icon: text("icon").notNull(),
});

export const quests = sqliteTable("quests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  areaId: integer("area_id")
    .notNull()
    .references(() => areas.id),
  title: text("title").notNull(),
  type: text("type", { enum: ["main", "daily"] }).notNull(),
  requiredQuestId: integer("required_quest_id").references((): AnySQLiteColumn => quests.id),
  xpReward: integer("xp_reward").notNull().default(0),
  coinReward: integer("coin_reward").notNull().default(0),
  itemReward: integer("item_reward"),
  // Cerita pembuka singkat sebelum tantangan soal dimulai (opsional).
  story: text("story"),
});

// Belum ada tabel profil/akun (menyusul di fase Akun & Pengaturan), jadi
// progres di sini bersifat single-player sementara: satu baris per quest.
export const questProgress = sqliteTable("quest_progress", {
  questId: integer("quest_id")
    .primaryKey()
    .references(() => quests.id),
  status: text("status", { enum: ["locked", "available", "completed"] })
    .notNull()
    .default("locked"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

// Bank soal per misi. `topicId` (struktur kurikulum) menyusul di fase Soal
// Adaptif — untuk sekarang soal terhubung langsung ke quest.
export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questId: integer("quest_id")
    .notNull()
    .references(() => quests.id),
  difficulty: text("difficulty", { enum: ["mudah", "sedang", "sulit"] })
    .notNull()
    .default("sedang"),
  questionType: text("question_type", {
    enum: ["multiple_choice", "true_false", "input", "matching", "drag_drop"],
  }).notNull(),
  // Bentuk isi & kunci jawaban berbeda per questionType (lihat mobile
  // src/data/mockQuestions.ts untuk bentuk yang didukung tiap tipe).
  content: text("content", { mode: "json" }).notNull(),
  answer: text("answer", { mode: "json" }).notNull(),
  explanation: text("explanation").notNull(),
  isGenerated: integer("is_generated", { mode: "boolean" }).notNull().default(false),
  order: integer("order").notNull().default(1),
});

// Riwayat jawaban anak untuk tiap soal (progress di level pertanyaan).
// Belum terhubung ke profil (fase Akun & Pengaturan) — single-player sementara.
export const attempts = sqliteTable("attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  questId: integer("quest_id")
    .notNull()
    .references(() => quests.id),
  answer: text("answer", { mode: "json" }).notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
  timeSpent: integer("time_spent").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Belum ada tabel profil/akun (menyusul di fase Akun & Pengaturan), jadi
// untuk sekarang selalu ada tepat satu baris karakter (single-player).
export const characters = sqliteTable("characters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  level: integer("level").notNull().default(1),
  xp: integer("xp").notNull().default(0),
  xpToNextLevel: integer("xp_to_next_level").notNull().default(100),
  coins: integer("coins").notNull().default(0),
});

// Katalog item/kosmetik yang bisa dimiliki & dipakai karakter.
export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type", { enum: ["topi", "baju", "aksesori"] }).notNull(),
  rarity: text("rarity", { enum: ["umum", "langka", "epik"] }).notNull(),
  icon: text("icon").notNull(),
  price: integer("price").notNull().default(0),
});

// Item yang dimiliki karakter & status pakai/lepas-nya.
export const inventory = sqliteTable("inventory", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id),
  isEquipped: integer("is_equipped", { mode: "boolean" }).notNull().default(false),
  obtainedAt: integer("obtained_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
