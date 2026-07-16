import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
// import { colors } from "@/design";

export default function PantryLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      >

      </Stack>

    </View>
  );
}