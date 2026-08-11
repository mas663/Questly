import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { DailyQuest } from "../data/mockDailyQuests";

type Props = {
  quest: DailyQuest;
  onPress: (quest: DailyQuest) => void;
  onClaim: (quest: DailyQuest) => void;
};

export function DailyQuestCard({ quest, onPress, onClaim }: Props) {
  const isDone = quest.status === "selesai";
  const progress = Math.min(1, quest.progressCurrent / quest.progressTarget);

  return (
    <Pressable
      onPress={() => onPress(quest)}
      style={[styles.card, isDone && styles.cardDone]}
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {quest.title}
        </Text>
        <View style={[styles.statusBadge, isDone && styles.statusBadgeDone]}>
          <Text style={styles.statusBadgeText}>{isDone ? "✅ Selesai" : "⏳ Belum"}</Text>
        </View>
      </View>

      <Text style={styles.requirement} numberOfLines={2}>
        {quest.requirement}
      </Text>

      <View style={styles.track}>
        <View
          style={[styles.fill, { width: `${progress * 100}%` }, isDone && styles.fillDone]}
        />
      </View>
      <Text style={styles.progressText}>
        {quest.progressCurrent}/{quest.progressTarget}
      </Text>

      <View style={styles.footerRow}>
        <View style={styles.rewardRow}>
          <Text style={styles.rewardText}>✨ {quest.xpReward} XP</Text>
          <Text style={styles.rewardText}>🪙 {quest.coinReward}</Text>
        </View>

        {isDone && (
          <Pressable
            onPress={() => onClaim(quest)}
            disabled={quest.isClaimed}
            style={[styles.claimButton, quest.isClaimed && styles.claimButtonDisabled]}
            accessibilityRole="button"
            accessibilityLabel={quest.isClaimed ? "Hadiah sudah diklaim" : "Klaim hadiah misi harian"}
          >
            <Text
              style={[styles.claimButtonText, quest.isClaimed && styles.claimButtonTextDisabled]}
            >
              {quest.isClaimed ? "🎉 Diklaim" : "Klaim Hadiah"}
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardDone: {
    borderColor: "rgba(61,220,132,0.4)",
    backgroundColor: "rgba(61,220,132,0.1)",
  },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  title: { color: colors.textLight, fontWeight: "800", fontSize: 14, flex: 1, marginRight: 8 },
  statusBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusBadgeDone: { backgroundColor: "rgba(61,220,132,0.25)" },
  statusBadgeText: { color: colors.textLight, fontWeight: "800", fontSize: 10 },
  requirement: { color: colors.textMuted, fontSize: 11, fontWeight: "600", marginBottom: 8 },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
    marginBottom: 4,
  },
  fill: { height: "100%", borderRadius: 3, backgroundColor: colors.star },
  fillDone: { backgroundColor: "#3DDC84" },
  progressText: { color: colors.textMuted, fontSize: 10, fontWeight: "600", marginBottom: 8 },
  footerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rewardRow: { flexDirection: "row", gap: 12 },
  rewardText: { color: colors.textMuted, fontSize: 11, fontWeight: "700" },
  claimButton: {
    backgroundColor: colors.star,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  claimButtonDisabled: { backgroundColor: "rgba(255,255,255,0.12)" },
  claimButtonText: { color: colors.textDark, fontWeight: "900", fontSize: 11 },
  claimButtonTextDisabled: { color: colors.textLight },
});
