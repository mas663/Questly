import React, { useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { AchievementCard } from "../components/AchievementCard";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import { achievements, type AchievementContext } from "../data/achievements";
import { mockOtherPlayers } from "../data/mockLeaderboard";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Achievements">;

type Tab = "achievement" | "leaderboard";

export default function AchievementsScreen({ navigation }: Props) {
  const [tab, setTab] = useState<Tab>("achievement");
  const { character, areas, inventory, dailyQuests, attendance } = useWorldProgressContext();

  const achievementCtx: AchievementContext = {
    character,
    areas,
    inventory,
    dailyQuests,
    attendanceStreak: attendance.streak,
  };
  const unlockedCount = achievements.filter((a) => a.isUnlocked(achievementCtx)).length;

  const leaderboard = [
    ...mockOtherPlayers,
    { id: "me", name: character.name, avatar: "🧑‍🚀", level: character.level, xp: character.xp },
  ].sort((a, b) => (b.level !== a.level ? b.level - a.level : b.xp - a.xp));
  const myRank = leaderboard.findIndex((p) => p.id === "me") + 1;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>Papan Prestasi</Text>
            {tab === "achievement" ? (
              <Text style={styles.headerSubtitle}>
                {unlockedCount}/{achievements.length} lencana diraih
              </Text>
            ) : (
              <Text style={styles.headerSubtitle}>Peringkatmu: #{myRank}</Text>
            )}
          </View>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.tabRow}>
          <Pressable
            style={[styles.tabButton, tab === "achievement" && styles.tabButtonActive]}
            onPress={() => setTab("achievement")}
            accessibilityRole="button"
          >
            <Text style={[styles.tabText, tab === "achievement" && styles.tabTextActive]}>
              🏅 Achievement
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tabButton, tab === "leaderboard" && styles.tabButtonActive]}
            onPress={() => setTab("leaderboard")}
            accessibilityRole="button"
          >
            <Text style={[styles.tabText, tab === "leaderboard" && styles.tabTextActive]}>
              📊 Peringkat
            </Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {tab === "achievement" ? (
            <View style={styles.achievementGrid}>
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  isUnlocked={achievement.isUnlocked(achievementCtx)}
                />
              ))}
            </View>
          ) : (
            <View>
              {leaderboard.map((player, index) => {
                const isMe = player.id === "me";
                return (
                  <View key={player.id} style={[styles.rankRow, isMe && styles.rankRowMe]}>
                    <Text style={[styles.rankNumber, isMe && styles.rankNumberMe]}>
                      #{index + 1}
                    </Text>
                    <Text style={styles.rankAvatar}>{player.avatar}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rankName} numberOfLines={1}>
                        {player.name}
                        {isMe ? " (Kamu)" : ""}
                      </Text>
                      <Text style={styles.rankLevel}>Level {player.level}</Text>
                    </View>
                    <Text style={styles.rankXp}>{player.xp} XP</Text>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  backText: { color: colors.textLight, fontSize: 20, fontWeight: "800" },
  headerTitle: { color: colors.textLight, fontSize: 17, fontWeight: "900", textAlign: "center" },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 2,
  },
  achievementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  tabButtonActive: { backgroundColor: colors.star },
  tabText: { color: colors.textMuted, fontWeight: "800", fontSize: 12 },
  tabTextActive: { color: colors.textDark },
  content: { paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  rankRowMe: {
    backgroundColor: "rgba(255,210,61,0.14)",
    borderColor: colors.star,
  },
  rankNumber: {
    color: colors.textMuted,
    fontWeight: "900",
    fontSize: 13,
    width: 32,
  },
  rankNumberMe: { color: colors.star },
  rankAvatar: { fontSize: 24, marginRight: 10 },
  rankName: { color: colors.textLight, fontWeight: "800", fontSize: 13 },
  rankLevel: { color: colors.textMuted, fontSize: 10, marginTop: 1, fontWeight: "600" },
  rankXp: { color: colors.textMuted, fontWeight: "800", fontSize: 12 },
});
