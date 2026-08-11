import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type Props = {
  isCorrect: boolean;
  correctAnswerText: string;
  explanation: string;
  buttonLabel: string;
  onNext: () => void;
};

export function FeedbackPanel({ isCorrect, correctAnswerText, explanation, buttonLabel, onNext }: Props) {
  const slide = useRef(new Animated.Value(24)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slide, { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.panel,
        isCorrect ? styles.panelCorrect : styles.panelWrong,
        { opacity, transform: [{ translateY: slide }] },
      ]}
    >
      <View style={styles.titleRow}>
        <Text style={styles.icon}>{isCorrect ? "✅" : "❌"}</Text>
        <Text style={[styles.title, isCorrect ? styles.titleCorrect : styles.titleWrong]}>
          {isCorrect ? "Benar!" : "Belum Tepat"}
        </Text>
      </View>

      {!isCorrect && (
        <Text style={styles.correctAnswer}>
          Jawaban yang benar: <Text style={styles.correctAnswerValue}>{correctAnswerText}</Text>
        </Text>
      )}

      <Text style={styles.explanation}>{explanation}</Text>

      <Pressable
        style={[styles.button, isCorrect ? styles.buttonCorrect : styles.buttonWrong]}
        onPress={onNext}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 16,
  },
  panelCorrect: {
    backgroundColor: "rgba(61,220,132,0.14)",
    borderColor: "#3DDC84",
  },
  panelWrong: {
    backgroundColor: "rgba(255,107,107,0.14)",
    borderColor: "#FF6B6B",
  },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  icon: { fontSize: 22, marginRight: 8 },
  title: { fontSize: 17, fontWeight: "900" },
  titleCorrect: { color: "#3DDC84" },
  titleWrong: { color: "#FF6B6B" },
  correctAnswer: { color: colors.textLight, fontSize: 13, marginBottom: 6, fontWeight: "600" },
  correctAnswerValue: { fontWeight: "900" },
  explanation: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: 14 },
  button: {
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonCorrect: { backgroundColor: "#3DDC84" },
  buttonWrong: { backgroundColor: colors.star },
  buttonText: { color: colors.textDark, fontWeight: "900", fontSize: 14 },
});
