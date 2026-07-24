import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import Arrow from "@/assets/icons/ui/arrow.svg";
import type { Transaction } from "@/stores/transactionStore";
import type { PantryItem } from "@/stores/pantryStore";

type TransactionItemProps = {
  transaction: Transaction;
  item?: PantryItem;
  onPress: () => void;
  hideBorder?: boolean;
};

export function TransactionItem({ transaction, item, onPress, hideBorder }: TransactionItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-start gap-2 px-4 py-4 ${hideBorder ? "" : "border-b-[1px]  border-border"}`}
    >
      <View className="flex-row items-center gap-2 flex-1">
        <Text className="text-body font-bold text-md" numberOfLines={1}>
          {item?.name ?? transaction.category}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="text-body font-bold text-md">₦{(transaction.amount ?? 0).toLocaleString()}.00</Text>
        <Arrow width={10} height={10} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}
