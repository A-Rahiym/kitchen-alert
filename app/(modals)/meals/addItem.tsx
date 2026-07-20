import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { PantryItemMiniCard } from "@/components/shared/pantryItemMiniCard";
import { colors } from "@/design";
import Close from "@/assets/icons/ui/close.svg";
import { usePantryStore } from "@/stores/pantryStore";
import {useMealTableStore} from "@/stores/mealTableStore";



export default function ItemLabelScreen() {
  const router = useRouter();
  const {  name , id , mealType } = useLocalSearchParams<{ name: string; id: string; mealType: string }>();
  const item = usePantryStore((s) => s.items.find((i) => i.id === id));
  const [value, setValue] = useState<number>();
  const addMealItem = useMealTableStore((s) => s.assignItemToMeal);

  const handleSave = () => {
  addMealItem(mealType || "Breakfast", id || "");
    router.replace("/mealtable");
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6">
        <TouchableOpacity onPress={() => router.replace('/mealtable')} className="mb-6">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>

        <View className="mb-2">
          <Text className="text-2xl font-bold text-heading mb-1">Add Item</Text>
          <Text className="text-base text-muted mb-6">Choose an item and set the quantity to add to your meal.</Text>
          <PantryItemMiniCard
            item={{ name, icon: item?.icon }}
          />
        </View>
        <View className="mb-12">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-md font-medium text-muted">Quantity</Text>
          </View>
          <TextInput
            className="w-full bg-background border border-border rounded-xl py-3 pl-4 px-4 text-sm font-medium text-heading"
            value={value?.toString() || ""}
            onChangeText={(t) => setValue(parseFloat(t))}
            maxLength={25}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <TouchableOpacity
          onPress={handleSave}

          className="w-full py-4 bg-primary rounded-2xl mb-8"
        >
          <Text className="text-center font-semibold text-base text-border">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
