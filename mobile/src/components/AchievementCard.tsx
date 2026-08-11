import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Achievement } from "../data/achievements";

type Props = {
  achievement: Achievement;
  isUnlocked: boolean;
};

export function AchievementCard({ achievement, isUnlocked }: Props) {
  return (
    <View style={[styles.card, isUnlocked && styles.cardUnlocked]}>
      <View style={[styles.iconCircle, !isUnlocked && styles.iconCircleLocked]}>
        <Text style={styles.icon}>{isUnlocked ? achievement.icon : "🔒"}</Text>
      </View>
      <Text style={[styles.name, !isUnlocked && styles.nameLocked]} numberOfLines={2}>
        {achievement.name}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {isUnlocked ? achievement.description : "Terkunci"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "31%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  cardUnlocked: {
    backgroundColor: "rgba(255,210,61,0.12)",
    borderColor: "rgba(255,210,61,0.4)",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircleLocked: { opacity: 0.5 },
  icon: { fontSize: 24 },
  name: { color: colors.textLight, fontWeight: "800", fontSize: 11, textAlign: "center", marginBottom: 2 },
  nameLocked: { color: colors.textMuted },
  description: { color: colors.textMuted, fontSize: 9, textAlign: "center", fontWeight: "600" },
});
