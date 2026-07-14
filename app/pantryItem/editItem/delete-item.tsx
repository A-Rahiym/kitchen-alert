import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";
import Close from "@/assets/icons/ui/close.svg";

export default function DeleteItemScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [checked, setChecked] = useState(false);
  const removeItem = usePantryStore((s) => s.removeItem);
  const removeTransactions = useTransactionStore((s) => s.removeTransactionsByItemId);

  function handleDelete() {
    if (!checked || !id) return;
    removeItem(id);
    removeTransactions(id);
    router.replace(`/pantryItem/editItem/item-deleted`);
  }

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      <View className="px-6 pt-4">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="p-1 -ml-1">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6">
        <View className="mt-4 mb-8">
          <Text className="text-2xl font-bold tracking-tight text-heading mb-2">Delete item</Text>
          <Text className="text-base text-muted leading-relaxed">
            This will permanently remove this item from your pantry. This action cannot be undone.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setChecked((v) => !v)}
          className="flex-row items-start gap-3"
        >
          <View className={`w-6 h-6 rounded border-2 items-center justify-center mt-0.5 ${checked ? "bg-secondary border-secondary" : "border-gray-300"}`}>
            {checked && <Text className="text-white text-xs font-bold">✓</Text>}
          </View>
          <Text className="text-base font-bold text-heading leading-snug flex-1">
            I understand this item and all its data will be permanently deleted.
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-6 pb-8 gap-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-full py-4 rounded-xl bg-primary items-center"
        >
          <Text className="text-white font-bold text-base">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          className={`w-full py-4 rounded-xl border border-stroke items-center ${!checked ? "opacity-50" : ""}`}
          disabled={!checked}
        >
          <Text className="text-red-500 font-bold text-base">I agree, delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}