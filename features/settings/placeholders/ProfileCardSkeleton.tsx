import { View } from "react-native";

export function ProfileCardSkeleton() {
  return (
    <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-gray-100">
      <View className="flex-row items-center gap-4">
        <View className="w-14 h-14 rounded-full bg-gray-200" />
        <View className="gap-2">
          <View className="h-4 w-32 rounded bg-gray-200" />
          <View className="h-3 w-24 rounded bg-gray-200" />
        </View>
      </View>
      <View className="w-5 h-5 rounded-full bg-gray-200" />
    </View>
  );
}
