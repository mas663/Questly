import type { Quest } from "./mockQuests";

export function getStoryLines(quest: Quest, areaName: string): string[] {
  const intro =
    areaName.length > 0
      ? `Petualangan berlanjut di ${areaName}!`
      : "Petualangan baru menantimu!";

  if (quest.kind === "boss") {
    return [
      intro,
      `Penjaga misi "${quest.title}" menghadang jalanmu.`,
      "Kumpulkan semua kemampuanmu — ini pertarungan terakhir di area ini!",
    ];
  }

  return [
    intro,
    `Untuk melanjutkan, kamu harus menyelesaikan misi "${quest.title}".`,
    "Ayo tunjukkan kemampuanmu dan raih hadiahnya!",
  ];
}
