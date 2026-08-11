import React from "react";
import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { mockSubjects, averageMastery, masteryLabel, type SubjectGroup } from "../data/mockTopics";
import { selectNextTopic } from "../lib/adaptiveSelection";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "AdaptivePractice">;

const MASTERY_COLOR: Record<ReturnType<typeof masteryLabel>, string> = {
  Kuat: "#3DDC84",
  Cukup: colors.star,
  "Perlu Latihan": "#FF6B6B",
};

export default function AdaptivePracticeScreen({ navigation }: Props) {
  const handleStartPractice = (subject: SubjectGroup) => {
    const selection = selectNextTopic(subject.topics);
    if (!selection) {
      Alert.alert("Belum Ada Topik", "Mata pelajaran ini belum punya topik latihan.");
      return;
    }
    navigation.navigate("PracticeSession", { subjectId: subject.id });
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
          <Text style={styles.headerTitle}>Latihan Adaptif</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.introCard}>
            <Text style={styles.introEmoji}>🧠</Text>
            <Text style={styles.introText}>
              Soal di sini menyesuaikan kemampuanmu — makin sering latihan, makin pas
              tantangannya buat kamu!
            </Text>
          </View>

          {mockSubjects.map((subject) => {
            const mastery = averageMastery(subject.topics);
            const label = masteryLabel(mastery);
            return (
              <View key={subject.id} style={styles.subjectCard}>
                <Pressable
                  style={styles.subjectHeader}
                  onPress={() => navigation.navigate("TopicSummary", { subjectId: subject.id })}
                  accessibilityRole="button"
                  accessibilityLabel={`Lihat ringkasan topik ${subject.subject}`}
                >
                  <Text style={styles.subjectIcon}>{subject.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subjectName}>{subject.subject}</Text>
                    <Text style={styles.subjectTopicCount}>{subject.topics.length} topik · lihat detail ›</Text>
                  </View>
                  <View style={[styles.masteryBadge, { backgroundColor: MASTERY_COLOR[label] }]}>
                    <Text style={styles.masteryBadgeText}>{label}</Text>
                  </View>
                </Pressable>

                <View style={styles.masteryTrack}>
                  <View
                    style={[
                      styles.masteryFill,
                      { width: `${mastery}%`, backgroundColor: MASTERY_COLOR[label] },
                    ]}
                  />
                </View>
                <Text style={styles.masteryText}>Penguasaan rata-rata: {mastery}%</Text>

                <Pressable
                  style={styles.startButton}
                  onPress={() => handleStartPractice(subject)}
                  accessibilityRole="button"
                >
                  <Text style={styles.startButtonText}>Mulai Latihan</Text>
                </Pressable>
              </View>
            );
          })}
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
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  introEmoji: { fontSize: 32, marginRight: 12 },
  introText: { color: colors.textMuted, fontSize: 12, flex: 1, lineHeight: 17, fontWeight: "600" },
  subjectCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  subjectHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  subjectIcon: { fontSize: 30, marginRight: 12 },
  subjectName: { color: colors.textLight, fontWeight: "900", fontSize: 15 },
  subjectTopicCount: { color: colors.textMuted, fontSize: 11, marginTop: 2, fontWeight: "600" },
  masteryBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  masteryBadgeText: { color: colors.textDark, fontWeight: "900", fontSize: 10 },
  masteryTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
    marginBottom: 6,
  },
  masteryFill: { height: "100%", borderRadius: 4 },
  masteryText: { color: colors.textMuted, fontSize: 11, fontWeight: "600", marginBottom: 12 },
  startButton: {
    backgroundColor: colors.star,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  startButtonText: { color: colors.textDark, fontWeight: "900", fontSize: 14 },
});
