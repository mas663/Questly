import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import type { QuestCompletionResult } from "../hooks/useWorldProgress";
import { ConfettiBurst } from "../components/ConfettiBurst";
import { LevelUpBanner } from "../components/LevelUpBanner";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "MissionReward">;

export default function MissionRewardScreen({ route, navigation }: Props) {
  const { questId } = route.params;
  const { quests, areas, completeQuest, clearUnlockedArea } = useWorldProgressContext();

  const resultRef = useRef<QuestCompletionResult | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true;
      const result = completeQuest(questId);
      resultRef.current = result;
      // Hadiah sudah ditampilkan di layar ini, jadi jangan tumpuk dengan
      // overlay "Area Baru Terbuka" global — cukup satu perayaan.
      if (result?.unlockedArea) {
        clearUnlockedArea();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trophyScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef([0, 1, 2, 3].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(trophyScale, { toValue: 1, useNativeDriver: true, friction: 4, tension: 90 }),
      Animated.timing(titleOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.stagger(
        120,
        cardAnims.map((v) =>
          Animated.spring(v, { toValue: 1, useNativeDriver: true, friction: 5, tension: 80 })
        )
      ),
    ]).start();
  }, []);

  const quest = quests.find((q) => q.id === questId) ?? null;
  const area = quest ? (areas.find((a) => a.id === quest.areaId) ?? null) : null;
  const result = resultRef.current;

  if (!quest) {
    return (
      <View style={styles.root}>
        <Text style={styles.missingText}>Misi tidak ditemukan.</Text>
      </View>
    );
  }

  const xpGained = result?.xpGained ?? quest.xpReward;
  const coinGained = result?.coinGained ?? quest.coinReward;
  const itemGained = result?.itemGained ?? quest.itemReward ?? null;
  const leveledUp = result?.leveledUp ?? false;
  const newLevel = result?.newLevel;
  const unlockedArea = result?.unlockedArea ?? null;

  const rewardCards = [
    { key: "xp", icon: "✨", label: `+${xpGained} XP`, sub: "Poin Pengalaman" },
    { key: "coin", icon: "🪙", label: `+${coinGained}`, sub: "Koin" },
    ...(itemGained ? [{ key: "item", icon: "🎁", label: itemGained, sub: "Item Baru" }] : []),
    ...(unlockedArea
      ? [{ key: "area", icon: unlockedArea.icon, label: unlockedArea.name, sub: "Area Terbuka!" }]
      : []),
  ];

  const handleClose = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#7C3AED", "#DB2777", "#F97316"]} style={StyleSheet.absoluteFill} />
      <ConfettiBurst />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.Text style={[styles.trophy, { transform: [{ scale: trophyScale }] }]}>
            🏆
          </Animated.Text>

          <Animated.View style={{ opacity: titleOpacity, alignItems: "center" }}>
            <Text style={styles.title}>MISI SELESAI!</Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {area?.icon} {quest.title}
            </Text>
          </Animated.View>

          {leveledUp && newLevel !== undefined && <LevelUpBanner newLevel={newLevel} />}

          <View style={styles.cardGrid}>
            {rewardCards.map((card, i) => {
              const anim = cardAnims[i] ?? cardAnims[cardAnims.length - 1];
              return (
                <Animated.View
                  key={card.key}
                  style={[
                    styles.card,
                    {
                      opacity: anim,
                      transform: [
                        {
                          scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }),
                        },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.cardIcon}>{card.icon}</Text>
                  <Text style={styles.cardLabel} numberOfLines={1}>
                    {card.label}
                  </Text>
                  <Text style={styles.cardSub}>{card.sub}</Text>
                </Animated.View>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.closeButton} onPress={handleClose} accessibilityRole="button">
            <Text style={styles.closeButtonText}>Kembali ke Peta</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#7C3AED" },
  safeArea: { flex: 1 },
  missingText: { color: colors.textLight, textAlign: "center", marginTop: 80 },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  trophy: { fontSize: 88, marginBottom: 8 },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
    textAlign: "center",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 28,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    minWidth: 110,
  },
  cardIcon: { fontSize: 30, marginBottom: 6 },
  cardLabel: { color: "#FFFFFF", fontWeight: "900", fontSize: 15 },
  cardSub: { color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 2, fontWeight: "600" },
  footer: { paddingHorizontal: 24, paddingBottom: 12 },
  closeButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  closeButtonText: { color: "#7C3AED", fontWeight: "900", fontSize: 16 },
});
