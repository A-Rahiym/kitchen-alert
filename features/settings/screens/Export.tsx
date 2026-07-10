import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Export() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background p-5 pt-6">
      <View className="flex-row items-center gap-3 mb-6">
        <Text className="text-2xl text-muted" onPress={() => router.back()}>‹</Text>
        <Text className="text-2xl font-bold text-heading">Export Data</Text>
      </View>
      <Text className="text-base text-body">Export your account data</Text>
    </View>
  );
}
