import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { InventoryItem } from "../data/mockInventory";

type Props = {
  size?: number;
  equippedItems: InventoryItem[];
};

const BASE_EMOJI = "🧑‍🚀";

export function CharacterAvatar({ size = 48, equippedItems }: Props) {
  const topi = equippedItems.find((item) => item.type === "topi");
  const baju = equippedItems.find((item) => item.type === "baju");
  const aksesori = equippedItems.find((item) => item.type === "aksesori");

  const badgeSize = Math.round(size * 0.42);

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: baju ? colors.rarityLangka : "rgba(255,255,255,0.3)",
          },
        ]}
      >
        <Text style={{ fontSize: size * 0.52 }}>{BASE_EMOJI}</Text>
      </View>

      {topi && (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              top: -badgeSize * 0.35,
              left: size / 2 - badgeSize / 2,
            },
          ]}
        >
          <Text style={{ fontSize: badgeSize * 0.6 }}>{topi.icon}</Text>
        </View>
      )}

      {aksesori && (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              top: size * 0.32,
              right: -badgeSize * 0.25,
            },
          ]}
        >
          <Text style={{ fontSize: badgeSize * 0.55 }}>{aksesori.icon}</Text>
        </View>
      )}

      {baju && (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              bottom: -badgeSize * 0.3,
              left: size / 2 - badgeSize / 2,
            },
          ]}
        >
          <Text style={{ fontSize: badgeSize * 0.55 }}>{baju.icon}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    backgroundColor: colors.cardBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.background,
  },
});
