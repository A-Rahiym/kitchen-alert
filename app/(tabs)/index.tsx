import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Bell from "@/assets/icons/ui/notification.svg";

import Add from "@/assets/icons/ui/addDark.svg";
import Meal from "@/assets/icons/ui/meal.svg";
import { ChevronCircle } from "@/components/ui/ChevronCircle";
import { colors } from "@/design";
import { useBudgetRemaining } from "@/hooks/useBudgetRemaining";
import { usePantryStore } from "@/stores/pantryStore";
import { useMealTableStore } from "@/stores/mealTableStore";
import { useEnrichedPantryItems } from "@/features/pantry/hooks/useEnrichedPantryItems";
import { getPantryIconByKey } from "@/features/pantry/utils";
import { Donut } from "@/components/ui/Donut";
import { DateSelector } from "@/features/home/components/DateSelector";
import { MealPlanCard } from "@/features/home/components/MealPlanCard";
import { StatCard } from "@/features/home/components/StatCard";
import { PromoBanner } from "@/features/home/components/PromoBanner";
import { BudgetCard } from "@/features/home/components/BudgetCard";
import { TotalItemsCard } from "@/features/home/components/TotalItemsCard";
import { PantryItemCard } from "@/components/shared/PantryItemCard";

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();


    const items = usePantryStore((s) => s.items);
    const meals = useMealTableStore((s) => s.meals);
    const mealItems = useMealTableStore((s) => s.mealItems);
    const budget = useBudgetRemaining("b1");
    const enriched = useEnrichedPantryItems();

    const lowStockCount = enriched.filter((i) => i.daysLeft <= i.thresholdDays).length;
    const budgetPct = budget.limit > 0 ? Math.round((budget.remaining / budget.limit) * 100) : 0;

    return (
        <LinearGradient
            colors={["#FFD8B8", "#FFF8F0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.4 }}
            style={{ flex: 1 }}
        >
            <ScrollView
                style={{ flex: 1, paddingTop: insets.top }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-6 pt-2 pb-2 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">

                        <Image
                            source={require('@/assets/profile/avatar.png')}
                            className="w-18 h-18 rounded-full"
                        />
                        <View>
                            <Text className="text-md text-body">
                                Good Morning, <Text className="font-bold text-heading">Adam</Text>
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity className="relative p-2">
                        <Bell width={20} height={20} color={colors.heading} />
                    </TouchableOpacity>
                </View>

                <View className="px-6 my-2">
                    <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center gap-2">
                            <Meal width={15} height={15} color={colors.heading} />
                            <Text className="text-medium font-medium text-heading">Meal Plan</Text>
                        </View>
                        <TouchableOpacity onPress={() => router.push("/mealtable")}>
                            <ChevronCircle width={8} height={8} color={colors.heading} />
                        </TouchableOpacity>
                    </View>
                    <DateSelector />
                </View>

                <View className="px-6 mb-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-3">
                            {meals.map((meal) => (
                                <MealPlanCard
                                    key={meal.type}
                                    mealType={meal.type}
                                    label={meal.label}
                                    time={meal.time}
                                    itemCount={mealItems[meal.type]?.length ?? 0}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <View className="px-6 mb-3 flex-row gap-2">
                    <BudgetCard
                        limit={budget.limit}
                        remaining={budget.remaining}
                        onPress={() => router.push("/settings/budget")}
                    />
                    <TotalItemsCard
                        total={items.length}
                        lowStockCount={2}
                        onPress={() => router.push("/settings/prices")}
                    />
                </View>


                <View className="px-6 flex-row gap-2 mb-2">
                    <TouchableOpacity 
                    onPress={() => router.push("/mealtable")}
                    className="flex-1 py-2 rounded-xl bg-primary items-center shadow-xl">
                        <Text className="text-white font-bold text-sm">Meal plan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={() => router.push("/settings/prices")}
                    className="flex-1 py-2 rounded-xl bg-white items-center shadow-xl">
                        <Text className="text-body font-medium text-sm">Item prices</Text>
                    </TouchableOpacity>
                </View>

                <View className="px-6 my-4">
                    <PromoBanner />
                </View>

                <View className="px-6 my-4">
                    <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center gap-4">
                            <Text className="text-xl font-bold text-heading">Pantry list</Text>
                            <TouchableOpacity className="bg-white py-1 px-3  rounded-lg border border-border">
                                <Add width={10} height={10} color={colors.heading} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push("/pantry")}
                            className="flex-row items-center gap-1/2"
                        >
                            <Text className="text-muted text-sm font-medium">View all</Text>
                            <ChevronCircle width={8} height={8} color={colors.heading} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-3 pb-2">
                            {enriched.slice(0, 6).map((item) => {
                                const Icon = getPantryIconByKey(item.icon);
                                return (
                                    <View key={item.id} className="w-56 max-h-60">
                                        <PantryItemCard
                                            icon={<Icon width={72} height={72} color={colors.tabInactive} />}
                                            name={item.name}
                                            daysLeft={item.daysLeft}
                                            totalDays={item.totalDays}
                                            onPress={() => router.push(`/pantry/${item.id}`)}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}