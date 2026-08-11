import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import type { DragDropQuestion } from "../../data/mockQuestions";

type Props = {
  question: DragDropQuestion;
  value: string[] | undefined;
  locked: boolean;
  onChange: (order: string[]) => void;
};

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function DragDropView({ question, value, locked, onChange }: Props) {
  const order = value ?? [];
  const pool = useMemo(() => shuffled(question.items), [question]);
  const remaining = pool.filter((item) => !order.includes(item));

  const handleAdd = (item: string) => {
    if (locked) return;
    onChange([...order, item]);
  };

  const handleRemove = (item: string) => {
    if (locked) return;
    onChange(order.filter((i) => i !== item));
  };

  return (
    <View>
      <Text style={styles.hint}>Ketuk item sesuai urutan yang benar</Text>

      <View style={styles.slotRow}>
        {question.items.map((_, index) => {
          const filled = order[index];
          return (
            <Pressable
              key={index}
              onPress={() => filled && handleRemove(filled)}
              style={[styles.slot, filled && styles.slotFilled]}
              accessibilityRole="button"
            >
              <Text style={styles.slotNumber}>{index + 1}</Text>
              {filled && (
                <Text style={styles.slotText} numberOfLines={2}>
                  {filled}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.pool}>
        {remaining.map((item) => (
          <Pressable
            key={item}
            onPress={() => handleAdd(item)}
            style={styles.poolChip}
            accessibilityRole="button"
          >
            <Text style={styles.poolChipText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: { color: colors.textMuted, fontSize: 12, marginBottom: 10, fontWeight: "600" },
  slotRow: { gap: 8, marginBottom: 16 },
  slot: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  slotFilled: {
    borderStyle: "solid",
    borderColor: colors.star,
    backgroundColor: "rgba(255,210,61,0.12)",
  },
  slotNumber: {
    color: colors.textMuted,
    fontWeight: "800",
    fontSize: 13,
    marginRight: 10,
  },
  slotText: { color: colors.textLight, fontWeight: "700", fontSize: 14, flex: 1 },
  pool: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  poolChip: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  poolChipText: { color: colors.textLight, fontWeight: "700", fontSize: 13 },
});
