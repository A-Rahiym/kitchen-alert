import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { getPantryIconByKey } from "@/features/pantry/utils";
import Close from "@/assets/icons/ui/close.svg";
import Back from "@/assets/icons/ui/back.svg";

export default function ItemLabelScreen() {
  const router = useRouter();
  const { name, icon } = useLocalSearchParams<{ name: string; icon: string }>();
  const [label, setLabel] = useState(name || "");
  const displayName = decodeURIComponent(name || "Item");
  const Icon = getPantryIconByKey(icon || "gas");
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6">
        <TouchableOpacity onPress={() => router.replace('/pantry')} className="mb-6">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>

        <View className="mb-2">
          <Text className="text-2xl font-bold text-heading mb-1">Item label</Text>
          <Text className="text-base text-muted mb-6">Add new items to your pantry list</Text>

          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-2 mb-4"
          >
            <Back width={20} height={20} color={colors.heading} />
            <Text className="text-md font-semibold text-heading">{displayName}</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-2 ">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-md font-medium text-muted">Card label</Text>
            <Text className="text-xmd text-muted">{label.length}/25</Text>
          </View>
          <TextInput
            className="w-full bg-background border border-border rounded-xl py-3 pl-4 px-4 text-sm font-medium text-heading"
            value={label}
            onChangeText={(t) => setLabel(t.slice(0, 25))}
            maxLength={25}
          />
        </View>

        <View className="mt-16 flex-col items-center">
          <View className="w-32 h-40 mb-6 items-center justify-center">
            <Icon width={100} height={120} color={colors.primaryLight} />
          </View>
          <Text className="text-xl font-bold text-heading mb-1">{label || displayName}</Text>
          <Text className="text-sm text-muted">12.5kg</Text>
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <TouchableOpacity
          onPress={() => router.push(`/pantryItem/addItem/frequency?name=${encodeURIComponent(label || displayName)}&icon=${icon}`)}
          className="w-full py-4 border border-stroke rounded-2xl mb-8"
        >
          <Text className="text-center font-semibold text-base text-heading">Set label</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
