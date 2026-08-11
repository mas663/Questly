import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import { CharacterAvatar } from "../components/CharacterAvatar";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Character">;

export default function CharacterScreen({ navigation }: Props) {
  const { character, areas, inventory } = useWorldProgressContext();
  const equippedItems = inventory.filter((item) => item.isEquipped);

  const progress = Math.min(1, character.xp / character.xpToNextLevel);
  const completedAreas = areas.filter((a) => a.status === "completed").length;
  const totalQuests = areas.reduce((sum, a) => sum + a.totalQuests, 0);
  const completedQuests = areas.reduce((sum, a) => sum + a.completedQuests, 0);

  const handleOpenInventory = () => {
    navigation.navigate("Inventory");
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
          <Text style={styles.headerTitle}>Karakter</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.avatarWrap}>
            <CharacterAvatar size={112} equippedItems={equippedItems} />
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Level {character.level}</Text>
            </View>
          </View>

          <Text style={styles.name}>{character.name}</Text>
          {equippedItems.length > 0 && (
            <Text style={styles.equippedHint} numberOfLines={1}>
              {equippedItems.map((item) => `${item.icon} ${item.name}`).join("  ·  ")}
            </Text>
          )}

          <View style={styles.xpCard}>
            <View style={styles.xpCardHeader}>
              <Text style={styles.xpCardTitle}>
                Menuju Level {character.level + 1}
              </Text>
              <Text style={styles.xpCardValue}>
                {character.xp}/{character.xpToNextLevel} XP
              </Text>
            </View>
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🪙</Text>
              <Text style={styles.statValue}>{character.coins}</Text>
              <Text style={styles.statLabel}>Koin</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🗺️</Text>
              <Text style={styles.statValue}>
                {completedAreas}/{areas.length}
              </Text>
              <Text style={styles.statLabel}>Area Selesai</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📜</Text>
              <Text style={styles.statValue}>
                {completedQuests}/{totalQuests}
              </Text>
              <Text style={styles.statLabel}>Quest Selesai</Text>
            </View>
          </View>

          <Pressable style={styles.inventoryButton} onPress={handleOpenInventory} accessibilityRole="button">
            <Text style={styles.inventoryIcon}>🎒</Text>
            <Text style={styles.inventoryText}>Ganti Penampilan & Inventori</Text>
            <Text style={styles.inventoryChevron}>→</Text>
          </Pressable>
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
  content: { alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },
  avatarWrap: { alignItems: "center", position: "relative", marginBottom: 12 },
  levelBadge: {
    position: "absolute",
    bottom: -10,
    backgroundColor: colors.star,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: colors.background,
  },
  levelBadgeText: { color: colors.textDark, fontWeight: "900", fontSize: 12 },
  name: { color: colors.textLight, fontSize: 22, fontWeight: "900", marginTop: 12 },
  equippedHint: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
    maxWidth: "100%",
  },
  xpCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: 16,
    marginTop: 24,
  },
  xpCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  xpCardTitle: { color: colors.textLight, fontWeight: "800", fontSize: 13 },
  xpCardValue: { color: colors.textMuted, fontWeight: "700", fontSize: 12 },
  xpTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
  },
  xpFill: { height: "100%", borderRadius: 5, backgroundColor: "#3DDC84" },
  statsRow: { flexDirection: "row", gap: 10, marginTop: 16, width: "100%" },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { color: colors.textLight, fontWeight: "900", fontSize: 15 },
  statLabel: { color: colors.textMuted, fontSize: 10, marginTop: 2, fontWeight: "600" },
  inventoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 24,
    width: "100%",
  },
  inventoryIcon: { fontSize: 20, marginRight: 10 },
  inventoryText: { color: colors.textLight, fontWeight: "800", fontSize: 14, flex: 1 },
  inventoryChevron: { color: colors.textMuted, fontSize: 16, fontWeight: "800" },
});
