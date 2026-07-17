import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { categoryGroups, popularItems } from "@/features/pantry/data";
import { PopularItemCard } from "@/features/pantry/components/PopularItemCard";
import { colors } from "@/design";
import Close from "@/assets/icons/ui/close.svg";
import Search from "@/assets/icons/ui/search.svg";

export default function AddItemScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = search
    ? popularItems.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    : popularItems;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.replace('/pantry')}>
            <Close width={18} height={18} color={colors.heading} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-1 border border-stroke rounded-lg px-3 py-1.5">
            <Text className="text-sm font-medium text-muted">Draft</Text>
          </TouchableOpacity>
        </View>

        <View >
          <Text className="text-2xl font-bold text-heading mb-2">Add item</Text>
          <Text className="text-0.5xl text-muted">Add new items to your pantry list</Text>
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

        <View className="mb-8">
          <Text className="text-lg font-semibold text-heading mb-4">Categories to name</Text>
          <View className="flex-row gap-3">
            {categoryGroups.map((cat) => 
                <PopularItemCard
                  key={cat.id}
                  name={cat.name}
                  icon={cat.icon}
                  onPress={() => router.push(`/pantry/addItem/item-label?name=${encodeURIComponent(cat.name)}&icon=${cat.icon}`)}
                />
            )}
          </View>
        </View>

        <View className="pb-8">
          <Text className="text-lg font-semibold text-heading mb-4">Popular items</Text>
          <View className="flex-row flex-wrap gap-3">
            {filtered.map((item) => (
              <PopularItemCard
                key={item.id}
                name={item.name}
                icon={item.icon}
                onPress={() => router.push(`/pantry/addItem/item-label?name=${encodeURIComponent(item.name)}&icon=${item.icon}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
