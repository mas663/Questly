import React from "react";
import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { DailyQuestCard } from "../components/DailyQuestCard";
import { LoginRewardCalendar } from "../components/LoginRewardCalendar";
import { AttendanceCalendar } from "../components/AttendanceCalendar";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import type { DailyQuest } from "../data/mockDailyQuests";
import type { LoginReward } from "../data/mockLoginRewards";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "DailyRewards">;

export default function DailyRewardsScreen({ navigation }: Props) {
  const { dailyQuests, claimDailyQuestReward, loginReward, claimLoginReward, attendance } =
    useWorldProgressContext();
  const completedCount = dailyQuests.filter((q) => q.status === "selesai").length;
  const isClaimedToday = loginReward.lastClaimedDate === new Date().toISOString().slice(0, 10);

  const handleDailyQuestPress = (quest: DailyQuest) => {
    if (quest.status === "selesai") {
      Alert.alert(
        quest.isClaimed ? `${quest.title} 🎉` : `${quest.title} ✅`,
        quest.isClaimed
          ? "Kamu sudah mengklaim hadiah misi ini."
          : "Ketuk tombol \"Klaim Hadiah\" untuk mengambil hadiahmu!"
      );
      return;
    }
    Alert.alert(quest.title, quest.requirement);
  };

  const handleClaim = (quest: DailyQuest) => {
    const result = claimDailyQuestReward(quest.id);
    if (!result) return;
    Alert.alert(
      "Hadiah Diklaim! 🎉",
      `✨ +${result.xpGained} XP  🪙 +${result.coinGained}${
        result.leveledUp ? `\n\n⭐ Naik ke Level ${result.newLevel}!` : ""
      }`
    );
  };

  const handleClaimLoginReward = (_reward: LoginReward) => {
    const result = claimLoginReward();
    if (!result) {
      Alert.alert("Sudah Diklaim 🎁", "Kamu sudah mengambil hadiah hari ini. Kembali besok, ya!");
      return;
    }
    const parts = [`🪙 +${result.coinGained} Koin`];
    if (result.reward.itemLabel) parts.push(`🎁 ${result.reward.itemLabel}`);
    if (result.leveledUp) parts.push(`⭐ Naik ke Level ${result.newLevel}!`);
    Alert.alert(`Hadiah Hari ${result.reward.day} Diklaim! 🎉`, parts.join("\n"));
  };

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
          <Text style={styles.headerTitle}>Hadiah Harian</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.streakCard}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.streakTitle}>{attendance.streak} hari beruntun</Text>
              <Text style={styles.streakSubtitle}>Main tiap hari biar streak-mu naik!</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📋</Text>
              <Text style={styles.sectionTitle}>
                Misi Harian ({completedCount}/{dailyQuests.length})
              </Text>
            </View>
            {dailyQuests.map((quest) => (
              <DailyQuestCard
                key={quest.id}
                quest={quest}
                onPress={handleDailyQuestPress}
                onClaim={handleClaim}
              />
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🎁</Text>
              <Text style={styles.sectionTitle}>Klaim Hadiah Harian</Text>
            </View>
            <LoginRewardCalendar
              currentDay={loginReward.currentDay}
              isClaimedToday={isClaimedToday}
              onClaimPress={handleClaimLoginReward}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📅</Text>
              <Text style={styles.sectionTitle}>Catatan Kehadiran</Text>
            </View>
            <AttendanceCalendar checkinDates={attendance.checkinDates} />
          </View>
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
  headerTitle: { color: colors.textLight, fontSize: 17, fontWeight: "900" },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  streakCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,210,61,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,210,61,0.4)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
  },
  streakEmoji: { fontSize: 34, marginRight: 12 },
  streakTitle: { color: colors.textLight, fontWeight: "900", fontSize: 16 },
  streakSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2, fontWeight: "600" },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  sectionIcon: { fontSize: 20, marginRight: 8 },
  sectionTitle: { color: colors.textLight, fontWeight: "900", fontSize: 15 },
});
