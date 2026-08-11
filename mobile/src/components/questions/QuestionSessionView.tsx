import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { QuestionType } from "../../data/mockQuestions";
import type { useQuestionSession } from "../../hooks/useQuestionSession";
import { QuestionRenderer } from "./QuestionRenderer";
import { FeedbackPanel } from "./FeedbackPanel";
import { isAnswerCorrect, getCorrectAnswerText } from "./grading";
import { colors } from "../../theme/colors";

const TYPE_LABEL: Record<QuestionType, string> = {
  multiple_choice: "Pilihan Ganda",
  true_false: "Benar / Salah",
  input: "Isian",
  matching: "Mencocokkan",
  drag_drop: "Urutkan",
};

type Props = {
  session: ReturnType<typeof useQuestionSession>;
  onClose: () => void;
  onFinish: () => void;
  finishLabel?: string;
  adaptationMessage?: string;
  curriculumMeta?: string;
};

// Tampilan siklus soal bersama (dipakai layar Misi Quest & Latihan Adaptif):
// indikator progres, badge bentuk soal, dan panel umpan balik per soal.
export function QuestionSessionView({
  session,
  onClose,
  onFinish,
  finishLabel = "Selesai ✨",
  adaptationMessage,
  curriculumMeta,
}: Props) {
  const {
    question,
    index,
    total,
    isLast,
    isSubmitted,
    currentAnswer,
    canSubmit,
    handleAnswerChange,
    handleSubmit,
    goNext,
  } = session;

  if (!question) {
    return (
      <View style={styles.root}>
        <Text style={styles.missingText}>Soal tidak ditemukan.</Text>
      </View>
    );
  }

  const handleNext = () => {
    if (isLast) {
      onFinish();
      return;
    }
    goNext();
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <Pressable
            onPress={onClose}
            hitSlop={10}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Keluar dari sesi soal"
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <View style={styles.progressWrap}>
            <Text style={styles.progressLabel}>
              Soal {index + 1} dari {total}
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${((index + 1) / total) * 100}%` }]} />
            </View>
          </View>

          <View style={{ width: 36 }} />
        </View>

        {adaptationMessage && (
          <View style={styles.adaptationBanner}>
            <Text style={styles.adaptationText}>{adaptationMessage}</Text>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{TYPE_LABEL[question.type]}</Text>
          </View>

          {curriculumMeta && <Text style={styles.curriculumMeta}>{curriculumMeta}</Text>}

          <Text style={styles.prompt}>{question.prompt}</Text>

          <QuestionRenderer
            question={question}
            value={currentAnswer}
            locked={isSubmitted}
            onChange={handleAnswerChange}
          />
        </ScrollView>

        <View style={styles.footer}>
          {isSubmitted ? (
            <FeedbackPanel
              isCorrect={isAnswerCorrect(question, currentAnswer)}
              correctAnswerText={getCorrectAnswerText(question)}
              explanation={question.explanation}
              buttonLabel={isLast ? finishLabel : "Lanjut →"}
              onNext={handleNext}
            />
          ) : (
            <Pressable
              style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
              onPress={handleSubmit}
              disabled={!canSubmit}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>Jawab</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1 },
  missingText: { color: colors.textLight, textAlign: "center", marginTop: 80 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: { color: colors.textLight, fontSize: 16, fontWeight: "800" },
  progressWrap: { flex: 1 },
  progressLabel: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.star,
  },
  adaptationBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "rgba(255,210,61,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,210,61,0.4)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  adaptationText: {
    color: colors.star,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  content: { padding: 20, paddingBottom: 40 },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  typeBadgeText: { color: colors.textMuted, fontSize: 11, fontWeight: "800" },
  curriculumMeta: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 8,
  },
  prompt: {
    color: colors.textLight,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 20,
    lineHeight: 26,
  },
  footer: { paddingHorizontal: 20, paddingBottom: 12 },
  primaryButton: {
    backgroundColor: colors.star,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonDisabled: { opacity: 0.4 },
  primaryButtonText: { color: colors.textDark, fontWeight: "900", fontSize: 15 },
});
