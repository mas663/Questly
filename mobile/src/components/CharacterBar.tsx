import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { CharacterAvatar } from "./CharacterAvatar";
import type { InventoryItem } from "../data/mockInventory";

type Props = {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  equippedItems?: InventoryItem[];
  onPress?: () => void;
};

export function CharacterBar({
  name,
  level,
  xp,
  xpToNextLevel,
  coins,
  equippedItems = [],
  onPress,
}: Props) {
  const progress = Math.min(1, xp / xpToNextLevel);

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={onPress ? "Lihat halaman karakter" : undefined}
    >
      <View style={styles.avatarWrap}>
        <CharacterAvatar size={48} equippedItems={equippedItems} />
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.xpTrack}>
          <View style={[styles.xpFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.xpLabel}>
          {xp}/{xpToNextLevel} XP
        </Text>
      </View>

      <View style={styles.coinWrap}>
        <Text style={styles.coinIcon}>🪙</Text>
        <Text style={styles.coinText}>{coins}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 16,
    marginTop: 8,
  },
  avatarWrap: { position: "relative" },
  levelBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: colors.star,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.background,
  },
  levelText: { fontSize: 11, fontWeight: "900", color: colors.textDark },
  info: { flex: 1, marginLeft: 10 },
  name: { color: colors.textLight, fontWeight: "800", fontSize: 14 },
  xpTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.25)",
    marginTop: 6,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#3DDC84",
  },
  xpLabel: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
  coinWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  coinIcon: { fontSize: 16, marginRight: 4 },
  coinText: { color: colors.textLight, fontWeight: "800", fontSize: 13 },
});
