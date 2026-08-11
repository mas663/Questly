import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import { getStoryLines } from "../data/mockStories";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "MissionStory">;

export default function MissionStoryScreen({ route, navigation }: Props) {
  const { questId } = route.params;
  const { areas, quests } = useWorldProgressContext();

  const quest = quests.find((q) => q.id === questId) ?? null;
  const area = quest ? (areas.find((a) => a.id === quest.areaId) ?? null) : null;
  const lines = quest ? getStoryLines(quest, area?.name ?? "") : [];

  const [lineIndex, setLineIndex] = useState(0);
  const isStoryDone = lineIndex >= lines.length;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, [lineIndex]);

  if (!quest) {
    return (
      <View style={styles.root}>
        <Text style={styles.missingText}>Misi tidak ditemukan.</Text>
      </View>
    );
  }

  const handleNext = () => setLineIndex((i) => i + 1);
  const handleSkip = () => setLineIndex(lines.length);
  const handleStartChallenge = () => {
    navigation.replace("MissionQuestion", { questId: quest.id });
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
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Tutup cerita"
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
          <Text style={styles.questTitle} numberOfLines={1}>
            {quest.title}
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.stage}>
          <Text style={styles.narratorEmoji}>{quest.kind === "boss" ? "👑" : "🧙"}</Text>

          <View style={styles.storyBox}>
            <Animated.Text style={[styles.storyText, { opacity: fade }]}>
              {isStoryDone ? "Semua siap? Ayo mulai!" : lines[lineIndex]}
            </Animated.Text>
          </View>

          {!isStoryDone && (
            <View style={styles.dotsRow}>
              {lines.map((_, i) => (
                <View key={i} style={[styles.dot, i === lineIndex && styles.dotActive]} />
              ))}
            </View>
          )}
        </View>

        <View style={styles.footer}>
          {isStoryDone ? (
            <Pressable style={styles.primaryButton} onPress={handleStartChallenge} accessibilityRole="button">
              <Text style={styles.primaryButtonText}>⚔️ Mulai Tantangan</Text>
            </Pressable>
          ) : (
            <View style={styles.buttonRow}>
              <Pressable style={styles.secondaryButton} onPress={handleSkip} accessibilityRole="button">
                <Text style={styles.secondaryButtonText}>Lewati</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={handleNext} accessibilityRole="button">
                <Text style={styles.primaryButtonText}>Lanjut</Text>
              </Pressable>
            </View>
          )}
        </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: { color: colors.textLight, fontSize: 16, fontWeight: "800" },
  questTitle: {
    flex: 1,
    textAlign: "center",
    color: colors.textLight,
    fontSize: 15,
    fontWeight: "800",
    marginHorizontal: 8,
  },
  stage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  narratorEmoji: {
    fontSize: 72,
    marginBottom: 24,
  },
  storyBox: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    padding: 20,
    minHeight: 100,
    justifyContent: "center",
    width: "100%",
  },
  storyText: {
    color: colors.textLight,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  dotsRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: {
    backgroundColor: colors.star,
    width: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.star,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: { color: colors.textDark, fontWeight: "900", fontSize: 15 },
  secondaryButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  secondaryButtonText: { color: colors.textLight, fontWeight: "800", fontSize: 15 },
});
