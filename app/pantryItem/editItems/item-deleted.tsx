import { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import Delete from "@/assets/icons/ui/delete.svg";
import { useRouter } from "expo-router";
import { colors } from "@/design";

export default function ItemDeletedScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/pantry");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center px-4">
      <View className="mb-6">
        <Delete width={48} height={48} color={colors.primaryLight} />
      </View>
      <Text className="text-2xl font-bold text-heading mb-6 tracking-tight">Item deleted</Text>
      <Text className="text-base text-muted font-normal leading-relaxed text-center">
        This will permanently remove this.
      </Text>
    </View>
  );
}
