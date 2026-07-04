import { View } from "react-native";

export function SettingsRowSkeleton() {
  return (
    <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-50">
      <View className="flex-row items-center flex-1 gap-4">
        <View className="w-[22px] h-[22px] rounded bg-gray-200" />
        <View className="flex-1 gap-1">
          <View className="h-3 w-32 rounded bg-gray-200" />
          <View className="h-2.5 w-24 rounded bg-gray-200" />
        </View>
      </View>
      <View className="w-5 h-5 rounded-full bg-gray-200" />
    </View>
  );
}
