import React, { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import type { Achievement } from "../data/achievements";

type Props = {
  achievement: Achievement | null;
  onDismiss: () => void;
};

export function AchievementUnlockedOverlay({ achievement, onDismiss }: Props) {
  const scale = useRef(new Animated.Value(0.4)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!achievement) return;
    scale.setValue(0.4);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 90 }),
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  }, [achievement]);

  if (!achievement) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onDismiss}>
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
          <LinearGradient colors={["#7C3AED", "#DB2777"]} style={styles.cardGradient}>
            <Text style={styles.badge}>LENCANA BARU!</Text>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>{achievement.icon}</Text>
            </View>
            <Text style={styles.name}>{achievement.name}</Text>
            <Text style={styles.description}>{achievement.description}</Text>

            <Pressable style={styles.button} onPress={onDismiss} accessibilityRole="button">
              <Text style={styles.buttonText}>Asyik!</Text>
            </Pressable>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(10,10,30,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 260,
    borderRadius: 26,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  cardGradient: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  badge: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
    opacity: 0.9,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginBottom: 12,
  },
  icon: { fontSize: 38 },
  name: { color: colors.textLight, fontSize: 18, fontWeight: "900", textAlign: "center" },
  description: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  buttonText: { color: "#7C3AED", fontWeight: "900", fontSize: 13 },
});
