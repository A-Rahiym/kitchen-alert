import { View, Text } from "react-native";
import { colors } from "@/design";
import Graph from "@/assets/icons/ui/graphV2.svg";
import { LinearGradient } from "expo-linear-gradient";

export function PromoBanner() {
  return (
    <LinearGradient
      colors={["#D9EFFF", "#B3D9FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 8, paddingVertical:4}}
    >
      <View className="p-2 rounded-full relative overflow-hidden min-h-[60px]">
        <View className="w-full flex-row items-center justify-between px-2">
          <View className="rounded-lg">
            <Text className="text-body font-medium text-md ">
              Never run-out of stock
            </Text>
            <Text className="text-muted font-medium text-[10px] line-clamp-2">
              {"Get low stock alerts and smart \n restock reminders  with KitchenAlert Pro"}
            </Text>
          </View>
          <Graph width={120} height={64} color={colors.tabInactive} />
        </View>
    </View>
    </LinearGradient>
  );
}