import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import { getPantryIconByKey } from "@/features/pantry/utils";
import Arrange from "@/assets/icons/ui/arrange.svg";
import Edit from "@/assets/icons/ui/editV2.svg";

type PriceItemProps = {
  name: string;
  icon: string;
  price: number;
  onEdit?: () => void;
};

export function PriceItem({ name, icon, price, onEdit }: PriceItemProps) {
  const Icon = getPantryIconByKey(icon);
  return (
    <View className="flex-row items-center gap-3">
      <Arrange width={16} height={16} color={colors.muted} />
      <View className="flex-1 bg-white rounded-2xl p-3 border border-border flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="w-12 p-3 h-12 bg-surface-alt rounded-md items-center justify-center">
            <Icon width={32} height={32} color={colors.primaryLight} />
          </View>
          <View>
            <Text className="font-bold text-sm text-heading">{name}</Text>
            <Text className="text-xs font-medium text-muted">₦{price.toLocaleString()}.00</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onEdit} className="p-2">
          <Edit width={16} height={16} stroke={colors.muted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
