import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";

export default function PriceScreen() {
  const router = useRouter();
  const { name, icon, frequency, people, refillDate } = useLocalSearchParams<{
    name: string; icon: string; frequency: string; people: string; refillDate: string;
  }>();
  const displayName = decodeURIComponent(name || "Item");
  const [amount, setAmount] = useState("20000");
  const inputRef = useRef<TextInput>(null);
  const formatted = new Intl.NumberFormat("en-US").format(Number(amount) || 0);

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      <View className="px-6 pt-4">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="p-2 -ml-2">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6">
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold tracking-tight text-heading mb-2">Price</Text>
          <Text className="text-muted text-md leading-snug">
            {`How much did you pay? Enter the \n price of your current gas.`}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
        >
          <Back width={20} height={20} color={colors.heading} />
          <Text className="font-semibold text-md text-heading">Refill</Text>
        </TouchableOpacity>

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
        </View>
      </View>

      <View className="px-6 pb-6 mb-12">
        <TouchableOpacity
          onPress={() => router.push(`/modals/pantry/addItem/review?name=${encodeURIComponent(displayName)}&icon=${icon}&frequency=${frequency}&people=${people}&refillDate=${refillDate}&price=${amount}`)}
          className="w-full py-4 px-6 border border-stroke rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-heading">Set price</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
