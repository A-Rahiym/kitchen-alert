import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { colors } from "@/design";

export default function PantryLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}