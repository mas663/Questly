import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONFETTI_COLORS = ["#FF6B6B", "#FFD23D", "#3DDC84", "#4D9DE0", "#FF9A3D", "#C77DFF"];

type Particle = {
  id: number;
  left: number;
  color: string;
  size: number;
  isCircle: boolean;
  delay: number;
  duration: number;
  rotateTo: number;
  driftX: number;
};

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * SCREEN_WIDTH,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 6,
    isCircle: Math.random() > 0.5,
    delay: Math.random() * 500,
    duration: 2200 + Math.random() * 1400,
    rotateTo: Math.random() > 0.5 ? 360 : -360,
    driftX: (Math.random() - 0.5) * 100,
  }));
}

type Props = { count?: number };

export function ConfettiBurst({ count = 28 }: Props) {
  const particles = useMemo(() => makeParticles(count), [count]);
  const progressList = useRef(particles.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = particles.map((p, i) =>
      Animated.timing(progressList[i], {
        toValue: 1,
        duration: p.duration,
        delay: p.delay,
        useNativeDriver: true,
      })
    );
    Animated.parallel(animations).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => {
        const translateY = progressList[i].interpolate({
          inputRange: [0, 1],
          outputRange: [-20, SCREEN_HEIGHT + 40],
        });
        const translateX = progressList[i].interpolate({
          inputRange: [0, 1],
          outputRange: [0, p.driftX],
        });
        const rotate = progressList[i].interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", `${p.rotateTo}deg`],
        });
        const opacity = progressList[i].interpolate({
          inputRange: [0, 0.85, 1],
          outputRange: [1, 1, 0],
        });

        return (
          <Animated.View
            key={p.id}
            style={[
              styles.particle,
              {
                left: p.left,
                width: p.size,
                height: p.isCircle ? p.size : p.size * 1.6,
                borderRadius: p.isCircle ? p.size / 2 : 2,
                backgroundColor: p.color,
                opacity,
                transform: [{ translateY }, { translateX }, { rotate }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    top: 0,
  },
});
