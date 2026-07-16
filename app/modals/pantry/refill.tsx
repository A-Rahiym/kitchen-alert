import { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { usePantryStore } from "@/stores/pantryStore";
import { PantryItemMiniCard}  from "@/components/shared/pantryItemMiniCard";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";

export default function RefillScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string; option: string }>();
  const item = usePantryStore((s) => s.items.find((i) => i.id === id));

  const [fullRefill, setFullRefill] = useState(false);
  const [partialRefill, setPartialRefill] = useState(true);
  const [kg, setKg] = useState("8");
  const [price, setPrice] = useState("14500");

  if (!item || !id) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-lg text-muted">Item not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      <View className="px-5 pt-3 pb-2">
        <TouchableOpacity onPress={() => router.replace(`/pantry/${id}`)} className="p-1 -ml-1">
          <Close width={16} height={16} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6">
        <View className="mb-6">
          <Text className="text-2xl font-semibold tracking-tight text-heading mb-4">Refill</Text>
          <Text className="text-lg text-muted leading-snug">
            How much did you pay? Enter the price of your current gas.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.replace(`/modals/pantry/remain?id=${id}`)}
          className="flex-row items-center gap-3 mb-6"
        >
          <Back width={18} height={18} color={colors.heading} />
          <Text className="font-semibold text-heading text-0.5xl">Remain</Text>
        </TouchableOpacity>

        <PantryItemMiniCard
        item={item}
        />
        <View className="space-y-4">
          <View className="flex-row items-center justify-between -gap-1 border-b border-border pb-2">
            <Text className="text-md font-semibold text-heading">Refilled in full</Text>
            <Switch
              value={fullRefill}
              onValueChange={(v) => { setFullRefill(v); if (v) setPartialRefill(false); }}
              trackColor={{ false: "#f3f4f6", true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-md font-semibold text-heading">Refilled in some kg</Text>
            <Switch
              value={partialRefill}
              onValueChange={(v) => { setPartialRefill(v); if (v) setFullRefill(false); }}
              trackColor={{ false: "#f3f4f6", true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {partialRefill && (
          <View className="mt-6 space-y-6">
            <View>
              <Text className="text-muted text-sm mb-2">How many kg</Text>
              <View className="bg-strokeLight rounded-xl py-2 border border-transparent">
                <TextInput
                  className="text-lg font-semibold px-2 text-heading bg-background rounded-xl"
                  value={kg}
                  onChangeText={setKg}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>


            <View>
              <Text className="text-muted text-sm mb-2">Price</Text>
              <View className="bg-strokeLight rounded-xl py-2 border border-transparent">
                <TextInput
                  className="text-lg font-semibold px-2 text-heading bg-background rounded-xl"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>


          </View>
        )}
      </View>

      <View className="p-6 mb-10">
        <TouchableOpacity
          onPress={() => router.replace(`/modals/pantry/review?id=${id}&kg=${kg}&price=${price}`)}
          className="w-full bg-primary py-4 rounded-2xl"
        >
          <Text className="text-white font-bold text-lg text-center">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
