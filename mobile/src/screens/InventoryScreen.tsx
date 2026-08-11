import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import { RARITY_LABEL, TYPE_LABEL, type ItemRarity } from "../data/mockInventory";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Inventory">;

const RARITY_COLOR: Record<ItemRarity, string> = {
  umum: colors.rarityUmum,
  langka: colors.rarityLangka,
  epik: colors.rarityEpik,
};

export default function InventoryScreen({ navigation }: Props) {
  const { inventory, toggleEquipItem } = useWorldProgressContext();
  const equippedCount = inventory.filter((item) => item.isEquipped).length;

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
            <Text style={styles.headerTitle}>Inventori</Text>
            <Text style={styles.headerSubtitle}>
              {inventory.length} item · {equippedCount} dipakai
            </Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {inventory.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => toggleEquipItem(item.id)}
              style={[
                styles.card,
                { borderColor: RARITY_COLOR[item.rarity] },
                item.isEquipped && styles.cardEquipped,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${item.name}, ${item.isEquipped ? "sedang dipakai, ketuk untuk lepas" : "belum dipakai, ketuk untuk pakai"}`}
            >
              {item.isEquipped && (
                <View style={styles.equippedBadge}>
                  <Text style={styles.equippedBadgeText}>Dipakai</Text>
                </View>
              )}
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={[styles.rarityPill, { backgroundColor: RARITY_COLOR[item.rarity] }]}>
                <Text style={styles.rarityText}>{RARITY_LABEL[item.rarity]}</Text>
              </View>
              <Text style={styles.typeText}>{TYPE_LABEL[item.type]}</Text>

              <View style={[styles.actionPill, item.isEquipped && styles.actionPillEquipped]}>
                <Text
                  style={[styles.actionPillText, item.isEquipped && styles.actionPillTextEquipped]}
                >
                  {item.isEquipped ? "Lepas" : "Pakai"}
                </Text>
              </View>
            </Pressable>
          ))}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingBottom: 24,
    gap: 12,
    justifyContent: "center",
  },
  card: {
    width: "43%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: 18,
    alignItems: "center",
    position: "relative",
  },
  cardEquipped: {
    backgroundColor: "rgba(61,220,132,0.12)",
  },
  equippedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#3DDC84",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  equippedBadgeText: { fontSize: 9, fontWeight: "900", color: colors.textDark },
  icon: { fontSize: 40, marginBottom: 8 },
  name: { color: colors.textLight, fontWeight: "800", fontSize: 13, marginBottom: 6 },
  rarityPill: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 4 },
  rarityText: { color: "#FFFFFF", fontWeight: "900", fontSize: 10 },
  typeText: { color: colors.textMuted, fontSize: 10, fontWeight: "600" },
  actionPill: {
    marginTop: 12,
    backgroundColor: colors.star,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  actionPillEquipped: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  actionPillText: { color: colors.textDark, fontWeight: "900", fontSize: 11 },
  actionPillTextEquipped: { color: colors.textLight },
});
