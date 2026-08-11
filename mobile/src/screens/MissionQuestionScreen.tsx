import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useWorldProgressContext } from "../state/WorldProgressContext";
import { getQuestionsForQuest } from "../data/mockQuestions";
import { useQuestionSession } from "../hooks/useQuestionSession";
import { QuestionSessionView } from "../components/questions/QuestionSessionView";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "MissionQuestion">;

export default function MissionQuestionScreen({ route, navigation }: Props) {
  const { questId } = route.params;
  const { quests } = useWorldProgressContext();
  const quest = quests.find((q) => q.id === questId) ?? null;

  const questions = useMemo(() => getQuestionsForQuest(questId), [questId]);
  const session = useQuestionSession(questions);

  if (!quest) {
    return (
      <View style={styles.root}>
        <Text style={styles.missingText}>Misi tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <QuestionSessionView
      session={session}
      onClose={() => navigation.goBack()}
      onFinish={() => navigation.replace("MissionReward", { questId: quest.id })}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  missingText: { color: colors.textLight, textAlign: "center", marginTop: 80 },
});
