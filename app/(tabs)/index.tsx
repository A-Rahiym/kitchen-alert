import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Bell from "@/assets/icons/ui/notification.svg";
import Graph from "@/assets/icons/ui/graph.svg";
import Arrow from "@/assets/icons/ui/arrow.svg";
import { colors } from "@/design";
import { SummaryCard } from "@/features/home/components/SummaryCard";
import { PantryItemCard } from "@/components/ui/PantryItemCard";
import Add from "@/assets/icons/ui/add.svg";
import { useMonthlySpend } from "@/hooks/useMonthlySpend";
import { useBudgetRemaining } from "@/hooks/useBudgetRemaining";
import { useEnrichedPantryItems } from "@/features/pantry/hooks/useEnrichedPantryItems";
import { usePantryStore } from "@/stores/pantryStore";
import { getPantryIconByKey } from "@/features/pantry/utils";

export default function HomeScreen() {
    const router = useRouter();
    const items = usePantryStore((s) => s.items);
    const monthlySpend = useMonthlySpend();
    const budget = useBudgetRemaining("b1");
    const enriched = useEnrichedPantryItems();
    const lowStockCount = enriched.filter((i) => i.daysLeft <= i.thresholdDays).length;
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: colors.background,
                paddingTop: 18,
                paddingLeft: 18,
                paddingRight: 18,
                paddingBottom: 18,
            }}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <View className="w-full mb-4 flex-row items-center gap-2 justify-between px-6">
                <View className="flex-row items-center">
                    <Text className="mt-2 text-body font-medium text-xl">Morning,</Text>
                    <Text className="mt-2 text-black font-bold text-xl"> Adam</Text>
                </View>
                <View className="flex-row items-center gap-6">
                    <Bell width={18} height={18} color={colors.tabInactive} stroke={colors.primary} />
                    <View className="w-[38px] h-[38px] rounded-full bg-primary-light" />
                </View>
            </View>

            <View className="w-full rounded-lg bg-surface border border-[#E5E1DA] p-4">
                <View className="flex-row items-center justify-between gap-2 px-4">
                    <View className="gap-2 flex-col">
                        <Text className="text-body font-bold text-sm">Monthly Spend</Text>
                        <Text className="mt-2 text-3xl font-bold text-body">₦{monthlySpend.toLocaleString()}.00</Text>
                        <Text className="text-body font-light text-sm">2% vs last month</Text>
                    </View>
                    <Graph width={96} height={96} color={colors.tabInactive} />
                </View>
                <View className="flex-row items-center justify-between gap-2 my-2">
                    <TouchableOpacity className="mt-4 w-1/2 rounded-lg bg-primary py-2">
                        <Text className="text-center text-white text-sm font-medium">Edit Prices</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mt-4 w-1/2 rounded-lg border border-[#E5E1DA] py-2">
                        <Text className="text-center text-body text-sm font-medium">Edit Budget</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-row justify-start gap-2 mt-3">
                <SummaryCard title="Kitchen Budget" amount={`₦${(budget.limit / 1000)}K`} remaining={`₦${budget.remaining.toLocaleString()} left`} />
                <SummaryCard title="total" amount={String(items.length)} remaining={`${lowStockCount} low stock`} />
            </View>

            <View className="w-full mt-4">
                <LinearGradient
                    colors={[colors.tertiary, colors.tertiaryalt, colors.tertiaryLight]}
                    start={{ x: 0, y: 1.2 }}
                    end={{ x: 0, y: 0 }}
                    style={{ borderRadius: 18 }}
                >
                    <View className="w-full flex-row items-center justify-around px-2">
                        <View className="rounded-lg">
                            <Text className="text-white font-medium text-sm">
                                Go pro & never run-out of stock
                            </Text>
                            <Text className="text-white font-light text-xs line-clamp-2">
                                {"Get low stock alerts and smart \n restock reminders  with KitchenAlert Pro"}
                            </Text>
                        </View>
                        <Graph width={96} height={96} color={colors.tabInactive} />
                    </View>
                </LinearGradient>
            </View>

            <View className="mt-4 flex-row items-center justify-between px-2">
                <View className="w-full flex-row items-center justify-between gap-2">
                    <View className="flex-row items-center gap-2">
                        <Text className="text-body font-medium text-1xl">Pantry list</Text>
                        <TouchableOpacity className="bg-white w-10 py-2 h-5 flex items-center justify-center">
                            <Add width={10} height={10} color={colors.tabActive} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className="flex-row items-center gap-2">
                        <Text className="text-body font-medium text-sm">View all</Text>
                        <Arrow width={9} height={9} color={colors.tabInactive} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: "row", justifyContent: "flex-start", gap: 12, marginTop: 12 }}
            >
                {enriched.map((item) => {
                    const Icon = getPantryIconByKey(item.icon);
                    return (
                        <View key={item.id} className="w-56">
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

            <View className="mt-2 w-full flex-row items-center justify-between gap-2">
                <View className="flex-row items-center gap-2">
                    <Text className="text-body font-medium text-1xl">Bundles</Text>
                    <TouchableOpacity className="bg-white w-10 py-2 h-5 flex rounded items-center justify-center border border-[#E5E1DA]">
                        <Add width={10} height={10} color={colors.tabInactive} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="text-body font-medium text-sm">View all</Text>
                    <Arrow width={9} height={9} color={colors.tabInactive} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
