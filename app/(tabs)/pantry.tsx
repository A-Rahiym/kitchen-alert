import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, ScrollView , TouchableOpacity} from "react-native";
import { colors } from "@/design";
import Add from "@/assets/icons/ui/add.svg";
import Search from "@/assets/icons/ui/search.svg";
import Arrow from "@/assets/icons/ui/arrow.svg";
import { SegmentedSwitch } from "@/components/ui/segmentedswitch";
import { PantryItemCard } from "@/components/shared/PantryItemCard";
import { usePantryStore } from "@/stores/pantryStore";
import { useEnrichedPantryItems } from "@/features/pantry/hooks/useEnrichedPantryItems";
import { getPantryIconByKey } from "@/features/pantry/utils";

export default function PantryScreen() {
  const [selected, setSelected] = useState("staples");
  const router = useRouter();
  const items = usePantryStore((s) => s.items);
  const enriched = useEnrichedPantryItems();

  return (
    <View className="flex-1 font-sans  bg-background px-4 pt-6">
      <View className="w-full mb-2 flex-row items-center justify-between">
        <Text className="text-3xl font-sans font-bold text-heading">Pantry</Text>
        <TouchableOpacity
          onPress={() => router.push("/pantryItem/addItem/items")}
          className="flex-row items-center bg-tertiary gap-2 p-3 rounded-xl"
        >
          <Add width={12} height={12} fill={colors.surface} />
          <Text className="text-[12px] font-medium text-surface">Add</Text>
        </TouchableOpacity>
      </View>

      <View className="my-2 w-full bg-surface flex-row items-center py-2 px-3 rounded-xl gap-2 border border-stroke">
        <Search width={12} height={12} color={colors.tabInactive} />
        <TextInput
          placeholder="Search pantry items"
          
          className="flex-1 text-body text-xs font-light py-2"
        />
      </View>

      <View className="mt-2 w-full p-0.5  rounded-xl">
        <SegmentedSwitch
          value={selected}
          onChange={setSelected}
          options={[
            { label: "Staples", value: "staples" },
            { label: "Bundles", value: "bundles" },
          ]}
        />
      </View>

      <View className="w-full flex-row items-center justify-between mt-3 mb-2">
        <View className="flex-row items-center gap-2">
          <Text className="text-body font-medium text-lg">All items</Text>
          <View className="w-8 h-8 rounded-full bg-primary-light items-center justify-center">
            <Text className="text-body font-bold text-sm">{items.length}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-status-danger font-medium text-sm">↓ {enriched.filter((i) => i.daysLeft <= i.thresholdDays).length} Low stock</Text>
          <Arrow width={15} height={15} stroke={colors.primary} />
        </View>
      </View>

      <ScrollView
      className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{  flexDirection: "row", justifyContent: "center", flexWrap: "wrap",  gap: 12, paddingBottom: 0 }}
      >
        {enriched.map((item) => {
          const Icon = getPantryIconByKey(item.icon);
          return (
            <View key={item.id} className="w-48">
              <PantryItemCard
                icon={<Icon width={72} height={72} color={colors.tabInactive} />}
                name={item.name}
                daysLeft={item.daysLeft}
                totalDays={item.totalDays}
                onPress={() => router.push(`/pantryItem?id=${item.id}`)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}