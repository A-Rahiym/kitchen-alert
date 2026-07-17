import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/design";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";
import { useBudgetStore } from "@/stores/budgetStore";

export default function ChangeBudgetScreen() {
  const router = useRouter();
  const updateBudget = useBudgetStore((state) => state.updateBudget);
  const kitchenBudget = useBudgetStore((state) => state.budgets.find((b) => b.id === "b1"));

  const [amount, setAmount] = useState(String(kitchenBudget?.limit ?? 0));
  const inputRef = useRef<TextInput>(null);
  const formatted = new Intl.NumberFormat("en-US").format(Number(amount) || 0);

  const handleSave = () => {
    updateBudget("b1", { limit: Number(amount) });
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
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold tracking-tight text-heading mb-2">Set budget</Text>
          <Text className="text-muted text-md leading-snug">
            {`Funds are spread across your pantry \n items automatically. \n You can review or update your budget anytime.`}
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
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
          <Text className="text-muted text-md leading-snug mt-2 text-uppercase">
            Budget/MONTHLY
          </Text>
        </View>
      </View>
      <View className="px-6 pb-6 mb-12">
        <TouchableOpacity
          onPress={handleSave}
          className="w-full py-4 px-6 bg-primary rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-white">Change budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
