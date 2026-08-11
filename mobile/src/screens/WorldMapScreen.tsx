import React, { useCallback } from "react";
import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AreaNode } from "../components/AreaNode";
import { PathConnector } from "../components/PathConnector";
import { CharacterBar } from "../components/CharacterBar";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import type { RootStackParamList } from "../navigation/RootNavigator";
import type { Area } from "../data/mockAreas";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "WorldMap">;

const SIDE_PATTERN: Array<"left" | "center" | "right"> = [
  "center",
  "right",
  "left",
  "right",
  "left",
];

function sideFor(index: number) {
  return SIDE_PATTERN[index % SIDE_PATTERN.length];
}

export default function WorldMapScreen({ navigation }: Props) {
  const { areas, character, inventory, isLoaded } = useWorldProgressContext();
  const equippedItems = inventory.filter((item) => item.isEquipped);

  const completedAreas = areas.filter((a) => a.status === "completed").length;
  const totalQuests = areas.reduce((sum, a) => sum + a.totalQuests, 0);
  const completedQuests = areas.reduce((sum, a) => sum + a.completedQuests, 0);
  const overallProgress = totalQuests === 0 ? 0 : completedQuests / totalQuests;

  const handleAreaPress = useCallback(
    (area: Area) => {
      if (area.status === "locked") {
        Alert.alert(
          "Area Terkunci 🔒",
          area.requiredAreaName
            ? `Selesaikan "${area.requiredAreaName}" dulu untuk membuka area ini.`
            : "Selesaikan area sebelumnya untuk membuka area ini."
        );
        return;
      }
      navigation.navigate("MissionList", { areaId: area.id });
    },
    [navigation]
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Peta Petualangan</Text>
              <Text style={styles.subtitle}>
                {completedAreas}/{areas.length} area · {completedQuests}/{totalQuests} quest selesai
              </Text>
            </View>
            <Pressable
              style={styles.practiceButton}
              onPress={() => navigation.navigate("DailyRewards")}
              accessibilityRole="button"
              accessibilityLabel="Buka Hadiah Harian"
            >
              <Text style={styles.practiceButtonIcon}>🎁</Text>
            </Pressable>
            <Pressable
              style={styles.practiceButton}
              onPress={() => navigation.navigate("AdaptivePractice")}
              accessibilityRole="button"
              accessibilityLabel="Buka Latihan Adaptif"
            >
              <Text style={styles.practiceButtonIcon}>🧠</Text>
              <Text style={styles.practiceButtonText}>Latihan</Text>
            </Pressable>
            <Pressable
              style={styles.practiceButton}
              onPress={() => navigation.navigate("Achievements")}
              accessibilityRole="button"
              accessibilityLabel="Buka Papan Prestasi"
            >
              <Text style={styles.practiceButtonIcon}>🏆</Text>
            </Pressable>
          </View>
          <View style={styles.overallTrack}>
            <View style={[styles.overallFill, { width: `${overallProgress * 100}%` }]} />
          </View>
        </View>

        <CharacterBar
          name={character.name}
          level={character.level}
          xp={character.xp}
          xpToNextLevel={character.xpToNextLevel}
          coins={character.coins}
          equippedItems={equippedItems}
          onPress={() => navigation.navigate("Character")}
        />

        {!isLoaded && (
          <Text style={styles.loadingText}>Memuat progress tersimpan…</Text>
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {areas.map((area, index) => (
            <View key={area.id} style={styles.nodeSlot}>
              {index > 0 && (
                <PathConnector
                  from={sideFor(index - 1)}
                  to={sideFor(index)}
                  dimmed={area.status === "locked"}
                />
              )}
              <AreaNode area={area} side={sideFor(index)} onPress={handleAreaPress} />
            </View>
          ))}

          <View style={styles.footerSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  practiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 12,
  },
  practiceButtonIcon: { fontSize: 16, marginRight: 6 },
  practiceButtonText: { color: colors.textLight, fontWeight: "800", fontSize: 12 },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.textLight,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: "600",
  },
  overallTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginTop: 10,
    overflow: "hidden",
  },
  overallFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.star,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
  },
  scrollContent: {
    paddingTop: 32,
    paddingHorizontal: 12,
  },
  nodeSlot: {
    position: "relative",
  },
  footerSpacer: { height: 40 },
});
