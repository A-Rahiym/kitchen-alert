import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ItemCard } from "@/features/pantry/components/ItemCard";
import { usePantryStore } from "@/stores/pantryStore";
import { colors } from "@/design";
import Close from "@/assets/icons/ui/close.svg";
import Search from "@/assets/icons/ui/search.svg";

export default function AddItemScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const pantryItems = usePantryStore((s) => s.items);

  const { mealType } = useLocalSearchParams();


  const filtered = search
    ? pantryItems.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    : pantryItems;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-6">
        <View className="flex-row items-center justify-start mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Close width={18} height={18} color={colors.heading} />
          </TouchableOpacity>
        </View>

        <View >
          <Text className="text-2xl font-bold text-heading mb-2">Add item</Text>
          <Text className="text-0.5xl text-muted">My Pantry</Text>
        </View>

        <View className="flex flex-row justify-start mt-4 mb-3 bg-background rounded-xl border border-stroke">
          <View className="justify-center z-10 px-3">
            <Search width={20} height={20} color={colors.muted} />
          </View>
          <TextInput
            className="w-full pl-2  py-3  rounded-xl text-base text-heading"
            placeholder="Search items"
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {pantryItems.length > 0 && (
          <View className="mb-8">
            <Text className="text-lg font-semibold text-heading mb-4">Most Used</Text>
            <View className="flex-row gap-3">
              {pantryItems.slice(0, 4).map((item) =>
                <ItemCard
                  key={item.id}
                  name={item.name}
                  icon={item.icon}
                  onPress={() => router.push(
                    {
                      pathname: `/meals/addItem`,
                      params: { name: item.name, id: item.id, mealType: mealType },
                    }
                  )}
                />
              )}
            </View>
          </View>
        )}

        <View className="pb-8">
          <Text className="text-lg font-semibold text-heading mb-4">Pantry List</Text>
          <View className="flex-row flex-wrap gap-3">
            {filtered.map((item) => (
              <ItemCard
                key={item.id}
                name={item.name}
                icon={item.icon}
                onPress={() => router.push(
                  {
                    pathname: `/meals/addItem`,
                    params: { name: item.name, id: item.id, mealType: mealType }
                  }
                )}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}