import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { Stepper } from "@/components/shared/Stepper";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";

export default function FrequencyScreen() {
  const router = useRouter();
  const { name, icon } = useLocalSearchParams<{ name: string; icon: string }>();
  const [value, setValue] = useState(0);
  const displayName = decodeURIComponent(name || "Item");

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      <View className="px-6 pt-4">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="p-1 -ml-1">
          <Close width={24} height={18} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View className="flex-1  px-6">
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold tracking-tight text-heading">Frequency</Text>
          <Text className="mt-2 text-muted text-base leading-relaxed">
            How often do you cook each day?{"\n"}Frequent cooking reduces refill time.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
        >
          <Back width={16} height={16} color={colors.heading} />
          <Text className="font-semibold text-md text-heading">Label</Text>
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center mb-12">
          <Stepper
            value={value}
            onDecrement={() => setValue((v) => Math.max(0, v - 1))}
            onIncrement={() => setValue((v) => v + 1)}
          />
        </View>
      </View>

      <View className="px-6 pb-6 mb-12">
        <TouchableOpacity
          onPress={() => router.push(`/pantryItem/addItem/people?name=${encodeURIComponent(displayName)}&icon=${icon}&frequency=${value}`)}
          className="w-full py-4 px-6 border border-stroke rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-heading">Set frequency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}