import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Quest } from "../data/mockQuests";

type Props = {
  quest: Quest;
  onPress: (quest: Quest) => void;
};

const STATUS_STYLE: Record<Quest["status"], { icon: string; label: string }> = {
  completed: { icon: "✅", label: "Selesai" },
  available: { icon: "▶️", label: "Mulai" },
  locked: { icon: "🔒", label: "Terkunci" },
};

export function QuestCard({ quest, onPress }: Props) {
  const isLocked = quest.status === "locked";
  const isBoss = quest.kind === "boss";
  const statusInfo = STATUS_STYLE[quest.status];

  return (
    <Pressable
      onPress={() => onPress(quest)}
      style={({ pressed }) => [
        styles.card,
        isBoss && styles.cardBoss,
        isLocked && styles.cardLocked,
        pressed && !isLocked && styles.cardPressed,
      ]}
      accessibilityRole="button"
    >
      <View style={[styles.iconCircle, isLocked && styles.iconCircleLocked]}>
        <Text style={styles.iconText}>{isBoss ? "👑" : isLocked ? "🔒" : "📜"}</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, isLocked && styles.titleLocked]} numberOfLines={1}>
          {quest.title}
        </Text>

        {isLocked && quest.requiredQuestTitle ? (
          <Text style={styles.hint} numberOfLines={1}>
            Selesaikan "{quest.requiredQuestTitle}" dulu
          </Text>
        ) : (
          <View style={styles.rewardRow}>
            <Text style={styles.rewardText}>✨ {quest.xpReward} XP</Text>
            <Text style={styles.rewardText}>🪙 {quest.coinReward}</Text>
            {quest.itemReward && <Text style={styles.rewardText}>🎁 {quest.itemReward}</Text>}
          </View>
        )}
      </View>

      <View
        style={[
          styles.statusPill,
          quest.status === "completed" && styles.statusPillCompleted,
          quest.status === "available" && styles.statusPillAvailable,
        ]}
      >
        <Text style={styles.statusText}>
          {statusInfo.icon} {statusInfo.label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardBoss: {
    borderWidth: 2,
    borderColor: colors.star,
    backgroundColor: "#FFFBEA",
  },
  cardLocked: {
    opacity: 0.55,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFE9D6",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircleLocked: {
    backgroundColor: colors.lock,
  },
  iconText: { fontSize: 20 },
  body: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: "800", color: colors.textDark },
  titleLocked: { color: colors.textMuted },
  hint: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  rewardRow: { flexDirection: "row", marginTop: 4, gap: 10 },
  rewardText: { fontSize: 11, fontWeight: "700", color: colors.textMuted },
  statusPill: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#EEF0F8",
    marginLeft: 8,
  },
  statusPillCompleted: { backgroundColor: "#E1F7EA" },
  statusPillAvailable: { backgroundColor: "#FFE9D6" },
  statusText: { fontSize: 10, fontWeight: "800", color: colors.textDark },
});
