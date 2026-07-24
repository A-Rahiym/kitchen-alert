import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import { ChevronCircle } from "@/components/ui/ChevronCircle";
import Stock from "@/assets/icons/ui/stock.svg";

type TotalItemsCardProps = {
  total: number;
  lowStockCount: number;
  onPress?: () => void;
};

export function TotalItemsCard({ total, lowStockCount, onPress }: TotalItemsCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 rounded-xl bg-white p-3 border border-border"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <View className="items-center bg-primary/20 p-1.5 rounded-md">
            <Stock width={14} height={14} color={colors.heading} />
          </View>
          <Text className="text-body font-md text-xs">Total Items</Text>
        </View>
        <ChevronCircle width={10} height={10} color={colors.muted} />
      </View>
      <Text className="text-body font-bold text-2xl mb-1">{total}</Text>
      {lowStockCount < 6 ? (
        <View className="flex-row items-center gap-0.5">
          <Text className="text-status-danger text-xs font-bold">↓</Text>
          <Text className="text-status-danger text-xs font-bold">{lowStockCount} low stock</Text>
        </View>
      ) : (
        <Text className="text-xs text-muted">All items stocked</Text>
      )}
    </TouchableOpacity>
  );
}
