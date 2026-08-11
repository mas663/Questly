import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type Props = {
  value: boolean | undefined;
  locked: boolean;
  onChange: (value: boolean) => void;
};

export function TrueFalseView({ value, locked, onChange }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => !locked && onChange(true)}
        style={[styles.option, value === true && styles.optionTrueSelected]}
        accessibilityRole="button"
      >
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.label}>Benar</Text>
      </Pressable>
      <Pressable
        onPress={() => !locked && onChange(false)}
        style={[styles.option, value === false && styles.optionFalseSelected]}
        accessibilityRole="button"
      >
        <Text style={styles.emoji}>❌</Text>
        <Text style={styles.label}>Salah</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  option: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 20,
    alignItems: "center",
  },
  optionTrueSelected: { backgroundColor: "rgba(61,220,132,0.18)", borderColor: "#3DDC84" },
  optionFalseSelected: { backgroundColor: "rgba(255,107,107,0.18)", borderColor: "#FF6B6B" },
  emoji: { fontSize: 28, marginBottom: 6 },
  label: { color: colors.textLight, fontWeight: "800", fontSize: 15 },
});
