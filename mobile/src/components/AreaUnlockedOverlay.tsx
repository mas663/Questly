import React, { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import type { UnlockedAreaEvent } from "../hooks/useWorldProgress";

type Props = {
  event: UnlockedAreaEvent | null;
  onDismiss: () => void;
};

const SPARKLES = ["✨", "🎉", "⭐", "🎊", "✨", "🎉"];

export function AreaUnlockedOverlay({ event, onDismiss }: Props) {
  const scale = useRef(new Animated.Value(0.4)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!event) return;
    scale.setValue(0.4);
    opacity.setValue(0);
    sparkleAnim.setValue(0);

    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 80 }),
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(sparkleAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, [event]);

  if (!event) return null;

  return (
    <Modal visible={!!event} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        {SPARKLES.map((emoji, i) => {
          const angle = (i / SPARKLES.length) * Math.PI * 2;
          const distance = 120;
          return (
            <Animated.Text
              key={i}
              style={[
                styles.sparkle,
                {
                  opacity: sparkleAnim,
                  transform: [
                    {
                      translateX: sparkleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, Math.cos(angle) * distance],
                      }),
                    },
                    {
                      translateY: sparkleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, Math.sin(angle) * distance],
                      }),
                    },
                    { scale: sparkleAnim.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 1.3, 1] }) },
                  ],
                },
              ]}
            >
              {emoji}
            </Animated.Text>
          );
        })}

        <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
          <LinearGradient colors={["#FF9A3D", "#FF6B6B"]} style={styles.cardGradient}>
            <Text style={styles.badge}>AREA BARU TERBUKA!</Text>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>{event.icon}</Text>
            </View>
            <Text style={styles.areaName}>{event.name}</Text>
            <Text style={styles.subtitle}>Ayo jelajahi area baru ini!</Text>

            <Pressable style={styles.button} onPress={onDismiss} accessibilityRole="button">
              <Text style={styles.buttonText}>Lanjutkan</Text>
            </Pressable>
          </LinearGradient>
        </Animated.View>
      </View>
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
  sparkle: {
    position: "absolute",
    fontSize: 26,
  },
  card: {
    width: 280,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  cardGradient: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  badge: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 14,
    opacity: 0.9,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginBottom: 14,
  },
  icon: { fontSize: 44 },
  areaName: { color: colors.textLight, fontSize: 22, fontWeight: "900", textAlign: "center" },
  subtitle: { color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 4, marginBottom: 20 },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: { color: colors.textDark, fontWeight: "900", fontSize: 14 },
});
