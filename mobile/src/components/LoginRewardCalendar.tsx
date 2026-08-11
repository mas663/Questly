import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { loginRewardCycle, type LoginReward } from "../data/mockLoginRewards";

type Props = {
  currentDay: number;
  isClaimedToday: boolean;
  onClaimPress: (reward: LoginReward) => void;
};

export function LoginRewardCalendar({ currentDay, isClaimedToday, onClaimPress }: Props) {
  return (
    <View>
      <View style={styles.grid}>
        {loginRewardCycle.map((reward) => {
          // Hari-hari sebelum currentDay sudah diklaim di siklus ini; jika
          // currentDay sendiri sudah diklaim hari ini, ia ikut ditandai selesai.
          const isClaimed = reward.day < currentDay || (reward.day === currentDay && isClaimedToday);
          const isCurrent = reward.day === currentDay && !isClaimedToday;
          const isLocked = reward.day > currentDay;

          return (
            <View
              key={reward.day}
              style={[
                styles.cell,
                isClaimed && styles.cellClaimed,
                isCurrent && styles.cellCurrent,
                isLocked && styles.cellLocked,
              ]}
            >
              <Text style={styles.dayLabel}>Hari {reward.day}</Text>
              <Text style={[styles.icon, isLocked && styles.iconLocked]}>
                {isLocked ? "🔒" : reward.icon}
              </Text>
              <Text style={styles.rewardLabel} numberOfLines={2}>
                {reward.label}
              </Text>
              {isClaimed && <Text style={styles.claimedMark}>✓</Text>}
            </View>
          );
        })}
      </View>

      <Pressable
        style={[styles.claimButton, isClaimedToday && styles.claimButtonDisabled]}
        onPress={() => !isClaimedToday && onClaimPress(loginRewardCycle[currentDay - 1])}
        disabled={isClaimedToday}
        accessibilityRole="button"
      >
        <Text style={[styles.claimButtonText, isClaimedToday && styles.claimButtonTextDisabled]}>
          {isClaimedToday ? "Sudah diklaim — kembali besok!" : `Klaim Hadiah Hari ${currentDay}`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  cell: {
    width: "22%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "transparent",
    paddingVertical: 10,
    alignItems: "center",
    position: "relative",
  },
  cellClaimed: {
    backgroundColor: "rgba(61,220,132,0.12)",
    borderColor: "rgba(61,220,132,0.4)",
  },
  cellCurrent: {
    backgroundColor: "rgba(255,210,61,0.14)",
    borderColor: colors.star,
  },
  cellLocked: { opacity: 0.5 },
  dayLabel: { color: colors.textMuted, fontSize: 9, fontWeight: "700", marginBottom: 4 },
  icon: { fontSize: 22, marginBottom: 4 },
  iconLocked: { fontSize: 16 },
  rewardLabel: { color: colors.textLight, fontSize: 9, fontWeight: "700", textAlign: "center" },
  claimedMark: {
    position: "absolute",
    top: 4,
    right: 6,
    color: "#3DDC84",
    fontWeight: "900",
    fontSize: 12,
  },
  claimButton: {
    backgroundColor: colors.star,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  claimButtonDisabled: { backgroundColor: "rgba(255,255,255,0.12)" },
  claimButtonText: { color: colors.textDark, fontWeight: "900", fontSize: 13 },
  claimButtonTextDisabled: { color: colors.textMuted },
});
