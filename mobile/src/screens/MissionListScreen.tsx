import React, { useCallback } from "react";
import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { QuestCard } from "../components/QuestCard";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import type { Quest } from "../data/mockQuests";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "MissionList">;

export default function MissionListScreen({ route, navigation }: Props) {
  const { areaId } = route.params;
  const { areas, quests } = useWorldProgressContext();

  const area = areas.find((a) => a.id === areaId) ?? null;
  const areaQuests = quests.filter((q) => q.areaId === areaId);

  const handleQuestPress = useCallback(
    (quest: Quest) => {
      if (quest.status === "locked") {
        Alert.alert(
          "Misi Terkunci 🔒",
          quest.requiredQuestTitle
            ? `Selesaikan "${quest.requiredQuestTitle}" dulu untuk membuka misi ini.`
            : "Selesaikan misi sebelumnya dulu."
        );
        return;
      }
      if (quest.status === "completed") {
        Alert.alert("Sudah Selesai ✅", `"${quest.title}" sudah kamu selesaikan.`);
        return;
      }
      navigation.navigate("MissionStory", { questId: quest.id });
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
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke peta"
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.areaIcon}>{area?.icon}</Text>
            <View>
              <Text style={styles.areaName}>{area?.name ?? "Area"}</Text>
              <Text style={styles.areaProgress}>
                {area?.completedQuests ?? 0}/{area?.totalQuests ?? 0} quest selesai
              </Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {areaQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} onPress={handleQuestPress} />
          ))}
          {areaQuests.length === 0 && (
            <Text style={styles.emptyText}>Belum ada misi di area ini.</Text>
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
  areaIcon: { fontSize: 32, marginRight: 10 },
  areaName: { color: colors.textLight, fontSize: 18, fontWeight: "900" },
  areaProgress: { color: colors.textMuted, fontSize: 12, marginTop: 2, fontWeight: "600" },
  list: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 4,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 40,
  },
});
