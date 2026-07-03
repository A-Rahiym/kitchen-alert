import { View } from "react-native";

export function SummaryCardSkeleton() {
  return (
    <View className="flex-col justify-start items-start w-2/4 rounded-lg bg-gray-100 p-3 gap-2">
      <View className="w-full flex-row items-center justify-between">
        <View className="h-3 w-20 rounded bg-gray-200" />
        <View className="h-3 w-3 rounded bg-gray-200" />
      </View>
      <View className="h-8 w-16 rounded bg-gray-200 mt-2" />
      <View className="h-3 w-24 rounded bg-gray-200" />
    </View>
  );
}
