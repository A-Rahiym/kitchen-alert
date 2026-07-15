import { View, Text, TouchableOpacity } from "react-native";
import { ChevronCircle } from "../ui/ChevronCircle";
import { getPantryIconByKey } from "@/features/pantry/utils";
import { colors } from "@/design";

interface PantryHorizontalCardProps {
  item: {
    name: string;
    icon: string;
    itemSize: string;
  };
}


export function PantryItemMiniCard({ item }: PantryHorizontalCardProps) {
  const Icon = getPantryIconByKey(item.icon);
  return (
    <TouchableOpacity className="flex-row items-center p-3 border border-border rounded-2xl my-2">
      <View className="w-16 h-16 items-center justify-center mr-4">
        <Icon width={48} height={48} color={colors.primaryLight} />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-base text-heading">{item.name}</Text>
        <Text className="text-sm text-muted">{item.itemSize}</Text>
      </View>
      <ChevronCircle width={12} height={12} />
    </TouchableOpacity>
  )
}


