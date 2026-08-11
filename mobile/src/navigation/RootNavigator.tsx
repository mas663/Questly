import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorldMapScreen from "../screens/WorldMapScreen";
import MissionListScreen from "../screens/MissionListScreen";
import MissionStoryScreen from "../screens/MissionStoryScreen";
import MissionQuestionScreen from "../screens/MissionQuestionScreen";
import MissionRewardScreen from "../screens/MissionRewardScreen";
import CharacterScreen from "../screens/CharacterScreen";
import InventoryScreen from "../screens/InventoryScreen";
import AdaptivePracticeScreen from "../screens/AdaptivePracticeScreen";
import TopicSummaryScreen from "../screens/TopicSummaryScreen";
import PracticeSessionScreen from "../screens/PracticeSessionScreen";
import DailyRewardsScreen from "../screens/DailyRewardsScreen";
import AchievementsScreen from "../screens/AchievementsScreen";

export type RootStackParamList = {
  WorldMap: undefined;
  MissionList: { areaId: string };
  MissionStory: { questId: string };
  MissionQuestion: { questId: string };
  MissionReward: { questId: string };
  Character: undefined;
  Inventory: undefined;
  AdaptivePractice: undefined;
  TopicSummary: { subjectId: string };
  PracticeSession: { subjectId: string };
  DailyRewards: undefined;
  Achievements: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WorldMap" component={WorldMapScreen} />
        <Stack.Screen name="MissionList" component={MissionListScreen} />
        <Stack.Screen
          name="MissionStory"
          component={MissionStoryScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="MissionQuestion"
          component={MissionQuestionScreen}
          options={{ presentation: "modal", gestureEnabled: false }}
        />
        <Stack.Screen
          name="MissionReward"
          component={MissionRewardScreen}
          options={{ presentation: "modal", gestureEnabled: false }}
        />
        <Stack.Screen name="Character" component={CharacterScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="AdaptivePractice" component={AdaptivePracticeScreen} />
        <Stack.Screen name="TopicSummary" component={TopicSummaryScreen} />
        <Stack.Screen
          name="PracticeSession"
          component={PracticeSessionScreen}
          options={{ presentation: "modal", gestureEnabled: false }}
        />
        <Stack.Screen name="DailyRewards" component={DailyRewardsScreen} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
