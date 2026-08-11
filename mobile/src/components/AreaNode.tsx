import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import type { Area } from "../data/mockAreas";

const NODE_SIZE = 92;

type Props = {
  area: Area;
  side: "left" | "center" | "right";
  onPress: (area: Area) => void;
};

export function AreaNode({ area, side, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const isLocked = area.status === "locked";
  const isCompleted = area.status === "completed";

  const gradientColors = isLocked
    ? colors.areaLocked
    : isCompleted
      ? colors.areaComplete
      : colors.areaOpen;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 30 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }).start();
  };

  return (
    <View
      style={[
        styles.wrapper,
        side === "left" && styles.alignLeft,
        side === "right" && styles.alignRight,
        side === "center" && styles.alignCenter,
      ]}
    >
      <Pressable
        onPress={() => onPress(area)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Area ${area.name}, ${
          isLocked ? "terkunci" : isCompleted ? "selesai" : "terbuka"
        }`}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <LinearGradient
            colors={gradientColors as unknown as [string, string]}
            style={[styles.node, isLocked && styles.nodeLocked]}
          >
            {isCompleted && (
              <View style={styles.starBadge}>
                <Text style={styles.starText}>⭐</Text>
              </View>
            )}
            <Text style={[styles.icon, isLocked && styles.iconLocked]}>
              {isLocked ? "🔒" : area.icon}
            </Text>
          </LinearGradient>

          {!isLocked && (
            <View style={styles.progressPill}>
              <Text style={styles.progressText}>
                {area.completedQuests}/{area.totalQuests}
              </Text>
            </View>
          )}
        </Animated.View>
      </Pressable>

      <Text style={[styles.name, isLocked && styles.nameLocked]} numberOfLines={1}>
        {area.name}
      </Text>
      {isLocked && area.requiredAreaName && (
        <Text style={styles.lockedHint} numberOfLines={2}>
          Selesaikan {area.requiredAreaName} dulu
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 36,
  },
  alignLeft: { alignItems: "flex-start", paddingLeft: 24 },
  alignRight: { alignItems: "flex-end", paddingRight: 24 },
  alignCenter: { alignItems: "center" },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.85)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  nodeLocked: {
    opacity: 0.6,
    borderColor: "rgba(255,255,255,0.3)",
  },
  icon: { fontSize: 38 },
  iconLocked: { fontSize: 30 },
  starBadge: {
    position: "absolute",
    top: -14,
    zIndex: 2,
  },
  starText: { fontSize: 22 },
  progressPill: {
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: colors.star,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.textDark,
  },
  name: {
    marginTop: 18,
    fontSize: 15,
    fontWeight: "800",
    color: colors.textLight,
  },
  nameLocked: {
    color: colors.textMuted,
  },
  lockedHint: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: "center",
    maxWidth: 120,
    marginTop: 2,
  },
});
