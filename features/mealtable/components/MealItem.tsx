import { View, Text } from "react-native";
import { getPantryIconByKey } from "@/features/pantry/utils";
import { colors } from "@/design";

type MealItemProps = {
  name: string;
  icon: string;
  amount: number;
};

export function MealItem({ name, icon, amount }: MealItemProps) {
  const Icon = getPantryIconByKey(icon);
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center gap-3">
        <View className="w-8 h-8 bg-surface-alt rounded-md items-center justify-center">
          <Icon width={20} height={20} color={colors.primary} />
        </View>
        <Text className="text-sm font-medium text-heading">{name}</Text>
      </View>
      <Text className="text-sm font-semibold text-muted">₦{amount.toLocaleString()}.00</Text>
    </View>
  );
}
