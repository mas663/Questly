import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../theme/colors";

type Props = {
  value: string | undefined;
  locked: boolean;
  onChange: (value: string) => void;
};

export function InputAnswerView({ value, locked, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value ?? ""}
        onChangeText={onChange}
        editable={!locked}
        placeholder="Ketik jawabanmu di sini..."
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 4 },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textLight,
  },
});
