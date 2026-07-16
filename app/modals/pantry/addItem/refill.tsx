import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { Calendar } from "@/features/pantry/components/Calendar";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";

export default function RefilScreen() {
  const router = useRouter();
  const { name, icon, frequency, people } = useLocalSearchParams<{ name: string; icon: string; frequency: string; people: string }>();
  const displayName = decodeURIComponent(name || "Item");
  const [refillDateParam, setRefillDateParam] = useState("");

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      <View className="px-6 pt-4">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="p-1 -ml-1">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6">
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold tracking-tight text-heading mb-2">Refill</Text>
          <Text className="text-muted text-base leading-relaxed">
            When did you last refill? Select the date of your current cylinder.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
        >
          <Back width={16} height={16} color={colors.heading} />
          <Text className="font-semibold text-md text-heading">People</Text>
        </TouchableOpacity>

        <Calendar onDateChange={setRefillDateParam} />
      </View>

      <View className="px-6 pb-6 mb-12">
        <TouchableOpacity
          onPress={() => router.push(`/modals/pantry/addItem/price?name=${encodeURIComponent(displayName)}&icon=${icon}&frequency=${frequency}&people=${people}&refillDate=${refillDateParam}`)}
          className="w-full py-4 border border-stroke rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-heading">Set refill</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
