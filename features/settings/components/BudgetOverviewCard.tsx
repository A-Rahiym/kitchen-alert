import { View, Text, TouchableOpacity } from "react-native";
import { Donut } from "@/components/ui/Donut";
import { colors } from "@/design";

type BudgetOverviewCardProps = {
  name: string;
  limit: number;
  spent: number;
  pctUsed: number;
  excess: number;
  onAdjust?: () => void;
};

export function BudgetOverviewCard({ name, limit, spent, pctUsed, excess, onAdjust }: BudgetOverviewCardProps) {
  const overBudget = excess > 0;
  const color = overBudget ? colors.statusExpired : colors.statusFresh;

  return (
    <View className="bg-white flex-row justify-between items-center rounded-3xl p-4 border border-border">
      <View className=" justify-between items-start">
        <View>
          <Text className="text-sm font-medium text-muted mb-1">{name}</Text>
          <Text className="text-3xl font-bold text-heading">₦{limit.toLocaleString()}.00</Text>
          {overBudget ? (
            <Text className="text-sm font-medium text-statusExpired mt-1">
              ₦{excess.toLocaleString()}.00 <Text className="opacity-80">over budget</Text>
            </Text>
          ) : (
            <Text className="text-sm font-medium text-statusFresh mt-1">
              ₦{(limit - spent).toLocaleString()}.00 to balance across 3 items 
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={onAdjust}
          className="flex-row items-center gap-2 border border-stroke rounded-xl px-4 py-2 mt-6 self-start"
        >
          <Text className="text-sm font-bold text-heading">Adjust budget</Text>
          <Text className="text-muted text-lg leading-none">›</Text>
        </TouchableOpacity>
      </View>
      <Donut size={70} strokeWidth={8} progress={pctUsed} color={color} />
    </View>
  );
}
