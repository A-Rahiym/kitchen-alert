import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { usePantryStore } from "@/stores/pantryStore";
import { getPantryIconByKey } from "@/features/pantry/utils";
import { Stepper } from "@/components/shared/Stepper";
import { ChevronCircle } from "@/components/ui/ChevronCircle";
import Close from "@/assets/icons/ui/close.svg";
import { PantryItemMiniCard } from "@/components/shared/pantryItemMiniCard";

export default function EditItemScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = usePantryStore((s) => s.items.find((i) => i.id === id));
  const [label, setLabel] = useState(item?.name || "");
  const [frequency, setFrequency] = useState(item?.frequency ?? 3);
  const [people, setPeople] = useState(item?.people ?? 4);

  const updateItem = usePantryStore((s) => s.updateItem);

  const handleSave = () => {
    if (!item) return;
    updateItem(item.id, {
      name: label,
      frequency,
      people,
    });

    router.replace(`/pantryItem?id=${item.id}`);
  };


  if (!item) {
    return null;
  }
  const Icon = getPantryIconByKey(item.icon);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="mb-6">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>

        <View className="mb-2">
          <Text className="text-2xl font-bold text-heading mb-2">Edit item</Text>
          <Text className="text-base text-muted leading-snug">
            Update the label or swap to a different cylinder size for this item.
          </Text>
        </View>

        <View className=" my-2">
          <PantryItemMiniCard item={item} />
        </View>

        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-muted">Card label</Text>
            <Text className="text-sm text-muted">{label.length}/25</Text>
          </View>
          <TextInput
            className="w-full bg-white border-none rounded-xl py-4 px-4 font-medium text-base text-heading"
            value={label}
            onChangeText={(t) => setLabel(t.slice(0, 25))}
            maxLength={25}
          />
        </View>

        <View className="flex flex-col items-center w-full">

          <View className="mt-2">
            <Text className="text-sm font-medium text-muted mb-4">Frequency</Text>
            <Stepper
              size="sm"
              value={frequency}
              onDecrement={() => setFrequency((v) => Math.max(0, v - 1))}
              onIncrement={() => setFrequency((v) => v + 1)}
            />
          </View>

          <View className="mt-10 mb-10">
            <Text className="text-sm font-medium text-muted mb-4">People</Text>
            <Stepper
              size="sm"
              value={people}
              onDecrement={() => setPeople((v) => Math.max(1, v - 1))}
              onIncrement={() => setPeople((v) => v + 1)}
            />
          </View>
        </View>
      </View>
      <View className="px-6 pb-10 space-y-2 gap-3">
        <TouchableOpacity
          onPress={() => router.push(`/pantryItem/editItem/delete-item?id=${id}`)}
          className="w-full py-4 border border-stroke rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-red-500">Delete item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          className="w-full py-4 rounded-2xl bg-primary items-center"
        >
          <Text className="text-white font-semibold text-base">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}