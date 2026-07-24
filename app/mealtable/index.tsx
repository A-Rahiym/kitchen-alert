import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/design";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { useMealTableStore } from "@/stores/mealTableStore";
import { DayButton } from "@/features/mealtable/components/DayButton";
import { MealCard } from "@/features/mealtable/components/MealCard";
import Back from "@/assets/icons/ui/back.svg";
import Add from "@/assets/icons/ui/lightAdd.svg";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MealTableScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [expandedMeals, setExpandedMeals] = useState<string[]>([]);

  const meals = useMealTableStore((s) => s.meals);
  const mealItems = useMealTableStore((s) => s.mealItems);
  const items = usePantryStore((s) => s.items);
  const transactions = useTransactionStore((s) => s.transactions);

  const toggleMeal = (type: string) => {
    setExpandedMeals((prev) =>
      prev.includes(type) ? prev.filter((m) => m !== type) : [...prev, type]
    );
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-4 mb-4 pt-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Back width={20} height={20} color={colors.heading} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-heading">Meal Timetable</Text>
        </View>
        <Text className="text-muted text-sm leading-relaxed mb-4">
          Add the items you use for each meal to accurately track your consumption.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <View className="flex-row gap-2 py-2">
            {days.map((day) => (
              <DayButton
                key={day}
                label={day}
                selected={selectedDay === day}
                onPress={() => setSelectedDay(day)}
              />
            ))}
          </View>
        </ScrollView>

        <View className="space-y-4 mb-6 gap-4 ">
          {meals.map((meal) => {
            const ids = mealItems[meal.type] ?? [];
            const data = ids
              .map((id) => {
                const item = items.find((i) => i.id === id);
                if (!item) return null;
                const itemTx = transactions
                  .filter((t) => t.itemId === id)
                  .sort((a, b) => b.date.localeCompare(a.date));
                return { id: item.id, name: item.name, icon: item.icon, quantity: 1, unit: item.consumptionUnit };
              })
              .filter((x): x is { id: string; name: string; icon: string; quantity: number; unit?: string } => x !== null);
            return (
              <MealCard
                key={meal.type}
                mealType={meal.type}
                label={meal.label}
                time={meal.time}
                items={data}
                expanded={expandedMeals.includes(meal.type)}
                onToggle={() => toggleMeal(meal.type)}
                onEdit={() => router.push(`/meals/editItem?mealType=${meal.type}`)}
                onAddItem={() => 
                  router.push({
                  pathname: `/meals/items`,
                  params: { mealType: meal.type },
                  })                
                }
              />
            );
          })}
        </View>

        <View className="space-y-4 pb-8 gap-3">
          <TouchableOpacity className="w-full bg-white border border-border py-4 rounded-2xl flex-row items-center justify-center gap-2">
            <Add width={18} height={18} color={colors.primary} />
            <Text className="text-primary font-bold">Add Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full bg-primary py-5 rounded-2xl">
            <Text className="text-center text-inverse text-lg font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
