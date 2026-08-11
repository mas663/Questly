import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { mockSubjects, averageMastery, masteryLabel, type Topic } from "../data/mockTopics";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "TopicSummary">;

const MASTERY_COLOR: Record<ReturnType<typeof masteryLabel>, string> = {
  Kuat: "#3DDC84",
  Cukup: colors.star,
  "Perlu Latihan": "#FF6B6B",
};

const MASTERY_ICON: Record<ReturnType<typeof masteryLabel>, string> = {
  Kuat: "💪",
  Cukup: "🙂",
  "Perlu Latihan": "📌",
};

export default function TopicSummaryScreen({ route, navigation }: Props) {
  const { subjectId } = route.params;
  const subject = mockSubjects.find((s) => s.id === subjectId) ?? null;

  if (!subject) {
    return (
      <View style={styles.root}>
        <Text style={styles.missingText}>Mata pelajaran tidak ditemukan.</Text>
      </View>
    );
  }

  const sortedTopics = [...subject.topics].sort((a, b) => a.masteryLevel - b.masteryLevel);
  const overallMastery = averageMastery(subject.topics);
  const weakestTopic: Topic | undefined = sortedTopics[0];

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
          <View style={styles.headerInfo}>
            <Text style={styles.subjectIcon}>{subject.icon}</Text>
            <View>
              <Text style={styles.subjectName}>{subject.subject}</Text>
              <Text style={styles.subjectMastery}>Rata-rata penguasaan: {overallMastery}%</Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {weakestTopic && (
            <View style={styles.tipCard}>
              <Text style={styles.tipEmoji}>📌</Text>
              <Text style={styles.tipText}>
                Fokus latihan berikutnya: <Text style={styles.tipBold}>{weakestTopic.name}</Text>{" "}
                — topik ini paling perlu latihan tambahan.
              </Text>
            </View>
          )}

          {sortedTopics.map((topic) => {
            const label = masteryLabel(topic.masteryLevel);
            return (
              <View key={topic.id} style={styles.topicCard}>
                <View style={styles.topicHeader}>
                  <Text style={styles.topicName} numberOfLines={1}>
                    {topic.name}
                  </Text>
                  <View style={[styles.labelBadge, { backgroundColor: MASTERY_COLOR[label] }]}>
                    <Text style={styles.labelBadgeText}>
                      {MASTERY_ICON[label]} {label}
                    </Text>
                  </View>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${topic.masteryLevel}%`, backgroundColor: MASTERY_COLOR[label] },
                    ]}
                  />
                </View>
                <Text style={styles.percentText}>{topic.masteryLevel}%</Text>
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
  missingText: { color: colors.textLight, textAlign: "center", marginTop: 80 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  backText: { color: colors.textLight, fontSize: 20, fontWeight: "800" },
  headerInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  subjectIcon: { fontSize: 30, marginRight: 10 },
  subjectName: { color: colors.textLight, fontSize: 17, fontWeight: "900" },
  subjectMastery: { color: colors.textMuted, fontSize: 12, marginTop: 2, fontWeight: "600" },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,107,107,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.35)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  tipEmoji: { fontSize: 24, marginRight: 10 },
  tipText: { color: colors.textLight, fontSize: 12, flex: 1, lineHeight: 17, fontWeight: "600" },
  tipBold: { fontWeight: "900" },
  topicCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  topicHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  topicName: { color: colors.textLight, fontWeight: "800", fontSize: 14, flex: 1, marginRight: 8 },
  labelBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  labelBadgeText: { color: colors.textDark, fontWeight: "900", fontSize: 10 },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
    marginBottom: 4,
  },
  fill: { height: "100%", borderRadius: 4 },
  percentText: { color: colors.textMuted, fontSize: 10, fontWeight: "600", textAlign: "right" },
});
