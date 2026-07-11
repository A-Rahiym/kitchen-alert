import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";

export default function PeopleScreen() {
  const router = useRouter();
  const { name, icon, frequency } = useLocalSearchParams<{ name: string; icon: string; frequency: string }>();
  const [value, setValue] = useState(4);
  const displayName = decodeURIComponent(name || "Item");

  function handleSetPeople() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const newId = `p${Date.now()}`;

    usePantryStore.getState().addItem({
      id: newId,
      name: displayName,
      itemSize: "12.5kg",
      thresholdDays: 7,
      icon: icon || "gas",
    });

    useTransactionStore.getState().addTransaction({
      id: `${newId}-init`,
      itemId: newId,
      date: dateStr,
      amount: Math.max(1, Number(frequency) || 1),
      category: displayName.toLowerCase().replace(/\s+/g, "-"),
    });

    router.replace(`/pantry?id=${newId}`);
  }

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      <View className="px-6 pt-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6">

        <View className="mt-4 mb-3">
          <Text className="text-2xl font-bold tracking-tight text-heading mb-2">People</Text>
          <Text className="text-muted text-base leading-snug">
            How many people in your household? Include everyone living in your home.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mt-6 mb-12"
        >
          <Back width={20} height={20} color={colors.heading} />
          <Text className="font-semibold text-md text-heading">Frequency</Text>
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center mb-12">
          <View className="flex-row items-center justify-between w-full max-w-[280px]">
            <TouchableOpacity
              onPress={() => setValue((v) => Math.max(1, v - 1))}
              className="w-16 h-16 rounded-full border-2 border-stroke items-center justify-center"
            >
              <Text className="text-2xl text-heading">−</Text>
            </TouchableOpacity>

            <Text className="text-7xl font-semibold tracking-tighter text-heading">{value}</Text>

            <TouchableOpacity
              onPress={() => setValue((v) => v + 1)}
              className="w-16 h-16 rounded-full bg-tertiary items-center justify-center"
            >
              <Text className="text-2xl text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="px-6 pb-8 pt-4 mb-12">
        <TouchableOpacity
          onPress={handleSetPeople}
          className="w-full py-4 px-6 border-2 border-stroke rounded-xl"
        >
          <Text className="text-center font-bold text-base text-heading">Set people</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}