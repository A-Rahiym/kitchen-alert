import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { colors } from "@/design";
import Add from "@/assets/ui/add.svg";
import Search from "@/assets/ui/search.svg";
import Arrow from "@/assets/ui/arrow.svg";
import { SegmentedSwitch } from "@/features/home/components/segmentedswitch";
import { PantryItemCard } from "@/features/home/components/PantryItemCard";
import { pantries } from "@/features/pantry/data";
import { getPantryIcon } from "@/features/pantry/utils";

export default function PantryScreen() {
  const [selected, setSelected] = useState("saved");

  return (
    <View className="flex-1 bg-background p-4 pt-6">
      <View className="w-full mb-2 flex-row items-center justify-between">
        <Text className="text-[24px] font-bold text-heading">Pantry</Text>
        <View className="flex-row items-center bg-primary gap-2 p-3 rounded-xl">
          <Add width={12} height={12} color={colors.surface} />
          <Text className="text-[12px] font-medium text-surface">Add</Text>
        </View>
      </View>

      <View className="my-2 w-full bg-surface flex-row items-center py-0.5 px-3 rounded-xl gap-2 border border-stroke">
        <Search width={12} height={12} color={colors.tabInactive} />
        <TextInput
          placeholder="Search pantry items"
          
          className="flex-1 text-body text-xs font-light py-2"
        />
      </View>

      <View className="mt-2 w-full bg-[#EFE6E0] p-0.5  rounded-xl border border-stroke">
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
            <Text className="text-body font-bold text-sm">{pantries.length}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-status-danger font-medium text-sm">↓ 2 Low stock</Text>
          <Arrow width={15} height={15} color={colors.tabInactive} />
        </View>
      </View>

      <ScrollView
      className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{  flexDirection: "row", justifyContent: "center", flexWrap: "wrap",  gap: 12 }}
      >
        {pantries.map((item) => {
          const Icon = getPantryIcon(item.name);
          return (
            <View key={item.id} className="w-48">
              <PantryItemCard
                icon={<Icon width={72} height={72} color={colors.tabInactive} />}
                name={item.name}
                daysLeft={item.daysLeft}
                totalDays={item.totalDays}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
