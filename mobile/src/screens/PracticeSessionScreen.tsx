import React, { useMemo, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { mockSubjects, DEMO_GRADE } from "../data/mockTopics";
import { getQuestionsForQuest } from "../data/mockQuestions";
import { selectNextTopic, getAdaptationMessage } from "../lib/adaptiveSelection";
import { useQuestionSession } from "../hooks/useQuestionSession";
import { QuestionSessionView } from "../components/questions/QuestionSessionView";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "PracticeSession">;

export default function PracticeSessionScreen({ route, navigation }: Props) {
  const { subjectId } = route.params;
  const subject = mockSubjects.find((s) => s.id === subjectId) ?? null;
  const selection = useMemo(
    () => (subject ? selectNextTopic(subject.topics) : null),
    [subject]
  );

  // Bank soal generik dipakai sementara untuk siklus bentuk soal; konten per
  // topik yang sesungguhnya menyusul lewat generate AI (backend Soal Adaptif).
  const questions = useMemo(() => getQuestionsForQuest("practice"), []);
  const session = useQuestionSession(questions);
  const [isDone, setIsDone] = useState(false);

  if (!subject || !selection) {
    return (
      <View style={styles.root}>
        <Text style={styles.missingText}>Topik latihan tidak ditemukan.</Text>
      </View>
    );
  }

  if (isDone) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={[colors.background, colors.backgroundLight]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.doneSafeArea} edges={["top", "bottom"]}>
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.doneTitle}>Latihan Selesai!</Text>
          <Text style={styles.doneSubtitle}>
            Kamu baru saja latihan topik{" "}
            <Text style={styles.doneBold}>{selection.topic.name}</Text> ({subject.subject}) di
            tingkat {selection.difficulty}.
          </Text>
          <Pressable
            style={styles.doneButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
          >
            <Text style={styles.doneButtonText}>Kembali</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <QuestionSessionView
      session={session}
      onClose={() => navigation.goBack()}
      onFinish={() => setIsDone(true)}
      finishLabel="Selesai 🎉"
      adaptationMessage={getAdaptationMessage(selection)}
      curriculumMeta={`${DEMO_GRADE} · ${subject.subject} · ${selection.topic.name} · Tingkat ${selection.difficulty}`}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  missingText: { color: colors.textLight, textAlign: "center", marginTop: 80 },
  doneSafeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  doneEmoji: { fontSize: 72, marginBottom: 16 },
  doneTitle: { color: colors.textLight, fontSize: 24, fontWeight: "900", marginBottom: 10 },
  doneSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },
  doneBold: { color: colors.textLight, fontWeight: "900" },
  doneButton: {
    backgroundColor: colors.star,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  doneButtonText: { color: colors.textDark, fontWeight: "900", fontSize: 15 },
});
