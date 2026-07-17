import { useState, useRef, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { usePathname } from "expo-router";
import Close from "@/assets/icons/ui/close.svg";
import { PantryItemMiniCard } from "@/components/shared/pantryItemMiniCard";



import { useTransactionStore } from "@/stores/transactionStore";
import { usePantryStore } from "@/stores/pantryStore";

export default function ChangePriceScreen() {

  console.log("current Route", usePathname());
  
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const items = usePantryStore((s) => s.items);
  const transactions = useTransactionStore((s) => s.transactions);
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  const item = items.find((i) => i.id === id);

  const latestPrice = useMemo(() => {
    if (!id) return 0;
    const itemTx = transactions
      .filter((t) => t.itemId === id)
      .sort((a, b) => b.date.localeCompare(a.date));
    return itemTx.length > 0 ? itemTx[0].amount : 0;
  }, [id, transactions]);

  const [amount, setAmount] = useState(String(latestPrice));
  const inputRef = useRef<TextInput>(null);
  const formatted = new Intl.NumberFormat("en-US").format(Number(amount) || 0);

  const handleSave = () => {
    if (!id) return;
    addTransaction({
      id: `tx-${Date.now()}`,
      itemId: id,
      date: new Date().toISOString().slice(0, 10),
      amount: Number(amount),
      category: item?.name ?? "",
    });
    router.back();
  };

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      <View className="px-6 pt-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6">
        <View className="mt-4">
          <Text className="text-2xl font-bold tracking-tight text-heading mb-2">Change price</Text>
          <Text className="text-muted text-md leading-snug">
            Set a new price for {item?.name ?? "this item"}. You can review or update the price anytime.
          </Text>
        </View>
        <View className="flex-1 items-center justify-center gap-3">
          <TextInput
            ref={inputRef}
            className="h-0 w-0 absolute"
            value={amount}
            onChangeText={(t) => setAmount(t.replace(/[^0-9]/g, ""))}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={() => inputRef.current?.focus()}>
            <Text className="text-5xl md:text-6xl font-bold tracking-tight text-heading">
              ₦{formatted}
            </Text>
          </TouchableOpacity>
          <PantryItemMiniCard item = {item} />
        </View>
      </View>
      <View className="px-6 pb-6 mb-12">
        <TouchableOpacity
          onPress={handleSave}
          className="w-full py-4 px-6 bg-primary rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-white">Change Price</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}