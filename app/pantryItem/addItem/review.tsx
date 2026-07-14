import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { getPantryIconByKey } from "@/features/pantry/utils";
import { Donut } from "@/components/ui/Donut";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";

export default function ReviewScreen() {
  const router = useRouter();
  const { name, icon,  price } = useLocalSearchParams<{
    name: string; icon: string; frequency: string; people: string; refillDate: string; price: string;
  }>();
  const displayName = decodeURIComponent(name || "Item");
  const ItemIcon = getPantryIconByKey(icon || "gas");
  const formattedPrice = new Intl.NumberFormat("en-US").format(Number(price) || 0);
  const daysLeft = 10;

  function handleAddItem() {
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
      amount: Math.max(1, Number(price) || 1),
      category: displayName.toLowerCase().replace(/\s+/g, "-"),
    });

    router.replace(`/pantryItem?id=${newId}`);
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="mb-6">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>

        <View className="mb-2">
          <Text className="text-2xl font-bold text-heading mb-1">Review item</Text>
          <Text className="text-base text-muted mb-6">
            How much did you pay? Enter the price of your current gas.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-8"
        >
          <Back width={20} height={20} color={colors.heading} />
          <Text className="font-semibold text-md text-heading">Price</Text>
        </TouchableOpacity>

        <View className="items-center mb-8">
          <View className="w-24 h-24 items-center justify-center mb-4">
            <ItemIcon width={80} height={96} color={colors.primaryLight} />
          </View>
          <Text className="text-xl font-bold text-heading">{displayName}</Text>
          <Text className="text-sm text-muted mt-1">12.5kg</Text>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1 bg-white border border-[#E7E7E7] rounded-2xl p-4">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-tight mb-2">Remain</Text>
            <View className="flex-row items-end justify-between">
              <View>
                <Text className="text-3xl font-bold text-heading">{daysLeft}</Text>
                <Text className="text-[10px] font-medium text-gray-400">days left</Text>
              </View>
              <Donut size={28} strokeWidth={3} progress={45} color={colors.primary} />
            </View>
          </View>

          <View className="flex-1 bg-white border border-[#E7E7E7] rounded-2xl p-4">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-tight mb-2">Price</Text>
            <Text className="text-[17px] font-bold text-heading leading-tight">₦{formattedPrice}</Text>
            <Text className="text-[10px] font-medium text-gray-400 mt-1">This month</Text>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <TouchableOpacity
          onPress={handleAddItem}
          className="w-full py-4 rounded-2xl mb-12 bg-primary items-center"
        >
          <Text className="text-white font-bold text-base">Add item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
