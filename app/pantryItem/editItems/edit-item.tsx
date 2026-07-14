import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { getPantryIconByKey } from "@/features/pantry/utils";
import Close from "@/assets/icons/ui/close.svg";
import {ChevronCircle}  from "@/components/ui/ChevronCircle";

export default function EditItemScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = usePantryStore((s) => s.items.find((i) => i.id === id));
  console.log("Editing item:", item);
  const [label, setLabel] = useState(item?.name || "");
  const [frequency, setFrequency] = useState(3);
  const [people, setPeople] = useState(4);

  const usePantryStoreState = usePantryStore();

  const handleSave = () => {
    if (!item) return;
    usePantryStoreState.updateItem(item.id, {
      name: label,
      itemSize: item.itemSize,
      icon: item.icon,

    });

    router.replace(`/pantryItem?id=${item.id}`);
  };


  if (!item) {
    return null;
  }
  const Icon = getPantryIconByKey(item.icon);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="mb-6">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>

        <View className="mb-2">
          <Text className="text-2xl font-bold text-heading mb-2">Edit item</Text>
          <Text className="text-base text-muted leading-snug">
            Update the label or swap to a different cylinder size for this item.
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center p-3 border border-border rounded-2xl my-2">
          <View className="w-16 h-16 items-center justify-center mr-4">
            <Icon width={48} height={48} color={colors.primaryLight} />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-base text-heading">{item.name}</Text>
            <Text className="text-sm text-muted">{item.itemSize}</Text>
          </View>
          <ChevronCircle width={12} height={12}  />
        </TouchableOpacity>

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

        <View className="mt-2">
          <Text className="text-sm font-medium text-muted mb-4">Frequency</Text>
          <View className="flex-row items-center justify-between w-full ">
            <TouchableOpacity
              onPress={() => setFrequency((v) => Math.max(0, v - 1))}
              className="w-12 h-12 rounded-full border border-stroke items-center justify-center"
            >
              <Text className="text-xl text-muted">−</Text>
            </TouchableOpacity>
            <Text className="text-4xl font-semibold text-heading">{frequency}</Text>
            <TouchableOpacity
              onPress={() => setFrequency((v) => v + 1)}
              className="w-12 h-12 rounded-full bg-heading items-center justify-center"
            >
              <Text className="text-xl text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-10 mb-10">
          <Text className="text-sm font-medium text-muted mb-4">People</Text>
          <View className="flex-row items-center justify-between w-full">
            <TouchableOpacity
              onPress={() => setPeople((v) => Math.max(1, v - 1))}
              className="w-12 h-12 rounded-full border border-stroke items-center justify-center"
            >
              <Text className="text-xl text-muted">−</Text>
            </TouchableOpacity>
            <Text className="text-4xl font-semibold text-heading">{people}</Text>
            <TouchableOpacity
              onPress={() => setPeople((v) => v + 1)}
              className="w-12 h-12 rounded-full bg-heading items-center justify-center"
            >
              <Text className="text-xl text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


      <View className="px-6 pb-10 space-y-2 gap-3">
        <TouchableOpacity
          onPress={() => router.push(`/pantryItem/editItems/delete-item?id=${id}`)}
          className="w-full py-4 border border-stroke rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-red-500">Delete item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleSave}
          className="w-full py-4 rounded-2xl bg-primary items-center"
        >
          <Text className="text-white font-semibold text-base">Save</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}