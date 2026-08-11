import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import type { MultipleChoiceQuestion } from "../../data/mockQuestions";

type Props = {
  question: MultipleChoiceQuestion;
  value: number | undefined;
  locked: boolean;
  onChange: (index: number) => void;
};

const LABELS = ["A", "B", "C", "D"];

export function MultipleChoiceView({ question, value, locked, onChange }: Props) {
  return (
    <View style={styles.container}>
      {question.options.map((option, index) => {
        const isSelected = value === index;
        return (
          <Pressable
            key={option}
            onPress={() => !locked && onChange(index)}
            style={[styles.option, isSelected && styles.optionSelected]}
            accessibilityRole="button"
          >
            <View style={[styles.badge, isSelected && styles.badgeSelected]}>
              <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>
                {LABELS[index]}
              </Text>
            </View>
            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    padding: 12,
  },
  optionSelected: {
    backgroundColor: "rgba(255,210,61,0.15)",
    borderColor: colors.star,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  badgeSelected: { backgroundColor: colors.star },
  badgeText: { color: colors.textLight, fontWeight: "800", fontSize: 13 },
  badgeTextSelected: { color: colors.textDark },
  optionText: { color: colors.textLight, fontSize: 15, fontWeight: "600", flex: 1 },
  optionTextSelected: { fontWeight: "800" },
});
