import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { WorldProgressProvider } from "./src/state/WorldProgressContext";
import { AreaUnlockedOverlay } from "./src/components/AreaUnlockedOverlay";
import { AchievementUnlockedOverlay } from "./src/components/AchievementUnlockedOverlay";
import { useWorldProgressContext } from "./src/state/WorldProgressContext";

function AppShell() {
  const { unlockedArea, clearUnlockedArea, newAchievement, dismissAchievementNotification } =
    useWorldProgressContext();
  return (
    <>
      <RootNavigator />
      <AreaUnlockedOverlay event={unlockedArea} onDismiss={clearUnlockedArea} />
      <AchievementUnlockedOverlay
        achievement={newAchievement}
        onDismiss={dismissAchievementNotification}
      />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <WorldProgressProvider>
        <AppShell />
      </WorldProgressProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
