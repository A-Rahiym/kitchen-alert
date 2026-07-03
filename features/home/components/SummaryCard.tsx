import { View, Text, TouchableOpacity } from "react-native";
import Arrow from "../../../assets/ui/arrow.svg";
import { colors } from "../../../design";

type SummaryCardProps = {
  title: string;
  amount: string;
  remaining: string;
  onPress?: () => void;
};

export function SummaryCard({ title, amount, remaining, onPress }: SummaryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-col justify-start items-start flex-1 rounded-xl bg-white p-3 gap-1 border border-[#E5E1DA]"
    >
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-body font-light text-sm">{title}</Text>
        <View className="w-8 h-8 rounded-full bg-background items-center justify-center">
          <Arrow width={9} height={9} color={colors.tabInactive} />
        </View>
      </View>
      <Text className=" text-body font-bold text-3xl ">{amount}</Text>
      <Text className="text-body font-light text-sm">{remaining}</Text>
    </TouchableOpacity>
  );
}
