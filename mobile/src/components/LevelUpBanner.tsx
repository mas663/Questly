import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  newLevel: number;
};

const SPARKLES = ["✨", "⭐", "✨", "⭐"];

export function LevelUpBanner({ newLevel }: Props) {
  const scale = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const sparkleSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4, tension: 120 }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.06, duration: 500, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]),
        { iterations: 3 }
      ),
    ]).start();

    Animated.loop(
      Animated.timing(sparkleSpin, { toValue: 1, duration: 3000, useNativeDriver: true })
    ).start();
  }, []);

  const spin = sparkleSpin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <Animated.View style={[styles.banner, { transform: [{ scale: Animated.multiply(scale, pulse) }] }]}>
      <Animated.View style={[styles.sparkleRow, { transform: [{ rotate: spin }] }]}>
        {SPARKLES.map((s, i) => (
          <Text key={i} style={styles.sparkle}>
            {s}
          </Text>
        ))}
      </Animated.View>
      <Text style={styles.text}>NAIK LEVEL {newLevel}!</Text>
      <View style={styles.sparkleRowBottom}>
        {SPARKLES.map((s, i) => (
          <Text key={i} style={styles.sparkle}>
            {s}
          </Text>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2,
    borderColor: colors.star,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  sparkleRow: {
    position: "absolute",
    top: -14,
    flexDirection: "row",
    gap: 4,
  },
  sparkleRowBottom: {
    position: "absolute",
    bottom: -14,
    flexDirection: "row",
    gap: 4,
  },
  sparkle: { fontSize: 14 },
  text: {
    color: colors.star,
    fontWeight: "900",
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
