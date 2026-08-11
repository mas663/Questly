import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";

const SIDE_OFFSET: Record<"left" | "center" | "right", number> = {
  left: 22,
  center: 50,
  right: 78,
};

type Props = {
  from: "left" | "center" | "right";
  to: "left" | "center" | "right";
  dimmed?: boolean;
};

const DOT_COUNT = 6;

export function PathConnector({ from, to, dimmed }: Props) {
  const fromX = SIDE_OFFSET[from];
  const toX = SIDE_OFFSET[to];

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: DOT_COUNT }).map((_, i) => {
        const t = (i + 1) / (DOT_COUNT + 1);
        const x = fromX + (toX - fromX) * t;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              { left: `${x}%`, top: `${t * 100}%` },
              dimmed && styles.dotDimmed,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -18,
    left: 0,
    right: 0,
    height: 36,
  },
  dot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: -4,
    marginTop: -4,
    backgroundColor: colors.pathLine,
    opacity: 0.9,
  },
  dotDimmed: {
    backgroundColor: colors.lock,
    opacity: 0.35,
  },
});
