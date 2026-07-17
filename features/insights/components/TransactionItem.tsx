import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import Arrow from "@/assets/icons/ui/arrow.svg";

type TransactionItemProps = {
  name: string;
  amount: number;
  onPress: () => void;
  hideBorder?: boolean;
};

export function TransactionItem({ name, amount, onPress, hideBorder }: TransactionItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-start gap-2 px-4 py-4 ${hideBorder ? "" : "border-b-[1px]  border-border"}`}
    >
      <View className="flex-row items-center gap-2 flex-1">
        <Text className="text-body font-bold text-md" numberOfLines={1}>
          {name}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="text-body font-bold text-md">₦{amount.toLocaleString()}.00</Text>
        <Arrow width={10} height={10} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}
