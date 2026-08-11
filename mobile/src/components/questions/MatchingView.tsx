import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import type { MatchingQuestion } from "../../data/mockQuestions";

type Props = {
  question: MatchingQuestion;
  value: Record<string, string> | undefined;
  locked: boolean;
  onChange: (matches: Record<string, string>) => void;
};

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function MatchingView({ question, value, locked, onChange }: Props) {
  const matches = value ?? {};
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const rightOptions = useMemo(() => shuffled(question.pairs.map((p) => p.right)), [question]);
  const matchedRights = new Set(Object.values(matches));

  const handleLeftPress = (left: string) => {
    if (locked) return;
    if (matches[left]) {
      const next = { ...matches };
      delete next[left];
      onChange(next);
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(left === selectedLeft ? null : left);
  };

  const handleRightPress = (right: string) => {
    if (locked || matchedRights.has(right)) return;
    if (!selectedLeft) return;
    onChange({ ...matches, [selectedLeft]: right });
    setSelectedLeft(null);
  };

  return (
    <View style={styles.row}>
      <View style={styles.column}>
        {question.pairs.map((pair) => {
          const isMatched = !!matches[pair.left];
          const isSelected = selectedLeft === pair.left;
          return (
            <Pressable
              key={pair.left}
              onPress={() => handleLeftPress(pair.left)}
              style={[styles.chip, isMatched && styles.chipMatched, isSelected && styles.chipSelected]}
              accessibilityRole="button"
            >
              <Text style={styles.chipText}>{pair.left}</Text>
              {isMatched && <Text style={styles.checkMark}>✓</Text>}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.column}>
        {rightOptions.map((right) => {
          const isUsed = matchedRights.has(right);
          return (
            <Pressable
              key={right}
              onPress={() => handleRightPress(right)}
              style={[styles.chip, isUsed && styles.chipMatched, isUsed && styles.chipDisabled]}
              accessibilityRole="button"
            >
              <Text style={styles.chipText}>{right}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  column: { flex: 1, gap: 10 },
  chip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chipSelected: { borderColor: colors.star, backgroundColor: "rgba(255,210,61,0.15)" },
  chipMatched: { backgroundColor: "rgba(61,220,132,0.18)", borderColor: "#3DDC84" },
  chipDisabled: { opacity: 0.6 },
  chipText: { color: colors.textLight, fontWeight: "700", fontSize: 13, textAlign: "center" },
  checkMark: { color: "#3DDC84", fontWeight: "900", marginLeft: 6 },
});
