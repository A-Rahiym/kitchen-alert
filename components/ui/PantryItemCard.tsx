import { View, Text, TouchableOpacity } from "react-native";
import { Donut } from "./Donut";
import { calculatePercentage, getDonutColor } from "../../features/pantry/utils";

type PantryItemCardProps = {
  icon: React.ReactNode;
  name: string;
  daysLeft: number;
  totalDays?: number;
  onPress?: () => void;
};

export function PantryItemCard({ icon, name, daysLeft, totalDays, onPress }: PantryItemCardProps) {
  const pct = totalDays ? calculatePercentage(daysLeft, totalDays) : undefined;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-col justify-center items-center p-4  rounded-xl border border-[#E5E1DA] bg-white gap-2"
    >
      <View className="m-2">
        {icon}
      </View>
      <View className="w-full flex-col items-start gap-4">
        <Text className="text-body font-medium mt-2">{name}</Text>
        <View className="w-full flex-row items-center justify-between mt-2">
          <Text className="text-body font-light text-xs">{daysLeft} days left</Text>
          <Donut
            size={24}
            strokeWidth={3}
            progress={pct}
            color={getDonutColor(pct)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}