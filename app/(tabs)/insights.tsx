import { View, Text } from "react-native";

export default function InsightsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <Text className="text-[28px] font-bold text-heading">Insights</Text>
      <Text className="mt-2 text-base text-body">Food waste analytics</Text>
    </View>
  );
}
