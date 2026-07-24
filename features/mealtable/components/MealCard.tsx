import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import Edit from "@/assets/icons/ui/editDark.svg";
import Add from "@/assets/icons/ui/lightAdd.svg";
import Time from "@/assets/icons/ui/time.svg";

import { MealItem } from "./MealItem";

type MealItem = {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  unit?: string;
};

type MealCardProps = {
  mealType: string;
  label: string;
  time: string;
  items: MealItem[];
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onAddItem: () => void;
};

export function MealCard({ mealType, label, time, items, expanded, onToggle, onEdit, onAddItem }: MealCardProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-5 border border-border shadow-sm"
    >
      <View className="flex-row justify-between items-start">
        <Text className="text-muted font-medium text-lg">{mealType}</Text>
        <TouchableOpacity onPress={onEdit} className="flex-row items-center gap-1">
          <Edit width={18} height={18}/>
          <Text className="text-heading font-medium text-md">Edit</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-bold text-heading mb-1">{label}</Text>
      <View className="flex-row items-center  gap-2 text-muted mb-4">
        <Time width={18} height={18} color={colors.muted} />
        <Text className="text-muted text-md">{time}</Text>
      </View>
      {expanded && items.length > 0 && (
        <View className="border-t border-stroke pt-3 mb-3">
          {items.map((item) => (
            <MealItem key={item.id} name={item.name} icon={item.icon} quantity={item.quantity} unit={item.unit} />
          ))}
        </View>
      )}
      <View className="pt-4">
        <TouchableOpacity onPress={onAddItem} className="flex-row items-center gap-2">
          <Add width={18} height={18} color={colors.primary} />
          <Text className="text-primary font-bold">Add item</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}