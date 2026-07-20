import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import { getPantryIconByKey } from "@/features/pantry/utils";

type ItemCardProps = {
  name: string;
  icon: string;
  onPress?: () => void;
};

export function ItemCard({ name, icon, onPress }: ItemCardProps) {
  const ItemIcon = getPantryIconByKey(icon);
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[30%] border border-border rounded-2xl p-3 items-center"
    >
      <View className="items-center justify-center mb-2">
        <ItemIcon width={64} height={64} color={colors.primaryLight} />
      </View>
      <Text className="font-bold text-sm text-heading text-center leading-tight">{name}</Text>
    </TouchableOpacity>
  );
}
