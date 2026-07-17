import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";


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
          presentation: "formSheet",
          animation: "slide_from_bottom",
          sheetAllowedDetents: [1],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
        }}
      >
      </Stack>
    </View>
  );
}