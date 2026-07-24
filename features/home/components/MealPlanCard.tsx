import { View, Text } from "react-native";
import { colors } from "@/design";
import Meal from "@/assets/icons/ui/meal.svg";
import Time from "@/assets/icons/ui/time.svg";

type MealPlanCardProps = {
  mealType: string;
  label: string;
  time: string;
  itemCount: number;
};

export function MealPlanCard({ mealType, label, time, itemCount }: MealPlanCardProps) {
  return (
    <View className="min-w-[170px] bg-[#143046] p-4  rounded-2xl justify-between">
      <View>
        <View className="flex-row items-center gap-1.5 mb-1.5">
          <View className="items-center bg-primary/20 p-1.5 mb-1.5 rounded-md">
            <Meal width={13} height={13} color={colors.heading} />
          </View>
          <Text className="text-xs text-border/70 tracking-wide">{mealType}</Text>
        </View>
        <Text className="font-medium text-sm leading-tight text-white mb-1.5" numberOfLines={2}>
          {label}
        </Text>
      </View>
      <View>
        <Text className="text-primary text-xs font-normal mb-2.5">{itemCount} items used</Text>
        <View className="flex-row items-center gap-1.5">
          <Time width={13} height={13} stroke={colors.border} />
          <Text className="text-gray-400 text-xs">{time}</Text>
        </View>
      </View>
    </View>
  );
}
