import { View, Text } from "react-native";
import { getPantryIconByKey } from "@/features/pantry/utils";
import { colors } from "@/design";

type MealItemProps = {
  name: string;
  icon: string;
  quantity: number;
  unit?: string;
};

export function MealItem({ name, icon, quantity, unit }: MealItemProps) {
  const Icon = getPantryIconByKey(icon);
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 bg-[#F6F4F2] rounded-2xl items-center justify-center">
          <Icon width={24} height={20} color={colors.primary} />
        </View>
        <Text className="text-md font-bold text-body">{name}</Text>
      </View>
      <Text className="text-md font-semibold text-muted">
        {quantity} {unit || ""}
      </Text>
    </View>
  );
}
