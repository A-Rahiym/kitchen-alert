import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import { Donut } from "@/components/ui/Donut";
import { ChevronCircle } from "@/components/ui/ChevronCircle";
import Wallet from "@/assets/icons/ui/wallet.svg";

type BudgetCardProps = {
  limit: number;
  remaining: number;
  onPress?: () => void;
};

export function BudgetCard({ limit, remaining, onPress }: BudgetCardProps) {
  const pct = limit > 0 ? Math.round((remaining / limit) * 100) : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 rounded-xl bg-white p-3 border border-border"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <View className="items-center bg-primary/20 p-1.5 rounded-md">
          <Wallet width={14} height={14} color={colors.heading} />
          </View>
          <Text className="text-body font-md text-xs">Kitchen Budget</Text>
        </View>
        <ChevronCircle width={10} height={10} color={colors.muted} />
      </View>
      <View className="flex-row items-center justify-start gap-2 mb-1">
        <Text className="text-body font-bold text-2xl">₦{limit / 1000}k</Text>
        <Donut size={20} strokeWidth={3} progress={pct} color={colors.primary} />
      </View>
      <Text className="text-body font-light text-xs">₦{remaining.toLocaleString()} left</Text>
    </TouchableOpacity>
  );
}
