import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

export default function PantryLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </View>
  );
}