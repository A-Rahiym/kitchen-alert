import { View } from "react-native";

export function PantryItemCardSkeleton() {
  return (
    <View className="flex-col justify-center items-center w-2/4 rounded-lg bg-gray-100 p-6 gap-2">
      <View className="h-[72px] w-[72px] rounded bg-gray-200" />
      <View className="w-full flex-col items-start gap-4">
        <View className="h-4 w-24 rounded bg-gray-200" />
        <View className="h-3 w-20 rounded bg-gray-200" />
      </View>
    </View>
  );
}
