import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/design";
import { Donut } from "@/components/ui/Donut";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { useItemDaysLeft } from "@/features/pantry/hooks/useItemDaysLeft";
import { useMonthlySpend } from "@/hooks/useMonthlySpend";
import { getPantryIconByKey, getDonutColor } from "@/features/pantry/utils";
import Back from "@/assets/icons/ui/back.svg";
import Close from "@/assets/icons/ui/close.svg";
export default function ReviewScreen() {
    const router = useRouter();
    const { id, kg, price } = useLocalSearchParams<{ id: string; kg: string; price: string }>();
    const item = usePantryStore((s) => s.items.find((i) => i.id === id));

    const { daysLeft, totalDays, pct } = useItemDaysLeft(id ?? "");
    const monthlySpend = useMonthlySpend(id ?? "");

    if (!item || !id) {
        return (
            <View className="flex-1 bg-background items-center justify-center">
                <Text className="text-lg text-muted">Item not found</Text>
            </View>
        );
    }

    const Icon = getPantryIconByKey(item.icon);

    function handleSetRemain() {
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        const transactionStore = useTransactionStore.getState();

        transactionStore.addTransaction({
            id: `${item.id}-${Date.now()}`,
            itemId: item.id,
            date: dateStr,
            amount: Number(price) || 0,
            category: item.name.toLowerCase().replace(/\s+/g, "-"),
        });

        router.replace(`/pantryItem?id=${id}`);
    }

    return (
        <View className="flex-1 bg-white flex-col ">
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="pt-3 mb-5">
                    <TouchableOpacity onPress={() => router.back()} className="p-1">
                        <Close width={16} height={16} color={colors.heading} />
                    </TouchableOpacity>
                </View>
                <View className="mt-2 mb-4">
                    <Text className="text-2xl font-semibold tracking-tight text-heading mb-4">Review Item</Text>
                    <Text className="text-md leading-[1.4]  text-muted">
                        Funds are spread across your pantry items automatically. You can review or update your budget anytime.
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="flex-row items-center gap-3 mb-6"
                >
                    <Back width={18} height={18} color={colors.heading} />
                    <Text className="font-semibold text-heading text-0.5xl">Refill</Text>
                </TouchableOpacity>

                <View className="flex-col items-center mb-10">
                    <View className="w-32 h-40 mb-4 items-center justify-center">
                        <Icon width={80} height={100} color={colors.primaryLight} />
                    </View>
                    <Text className="text-xl font-bold text-heading">{item.name}</Text>
                    <Text className="font-medium text-muted">{kg || item.itemSize}</Text>
                </View>

                <View className="flex-row gap-4 mb-8">
                    <View className="flex-1 border border-border rounded-2xl p-4 justify-between h-[110px]">
                        <View className="flex-row items-center gap-1">
                            <Text className="text-xs font-semibold text-heading">Remain</Text>
                            <Text className="text-muted">ⓘ</Text>
                        </View>
                        <View className="flex-row items-end justify-between">
                            <View>
                                <Text className="text-4xl font-bold text-heading leading-none">{daysLeft}</Text>
                                <Text className="text-sm text-muted mt-1">days left</Text>
                            </View>
                            <Donut size={40} strokeWidth={6} progress={pct} color={getDonutColor(pct)} />
                        </View>
                    </View>

                    <View className="flex-1 border border-border rounded-2xl p-4 justify-between h-[110px]">
                        <Text className="text-xs font-semibold text-heading">Price</Text>
                        <View>
                            <Text className="text-xl font-bold text-heading">₦{Number(price || monthlySpend).toLocaleString()}.00</Text>
                            <Text className="text-0.5xl text-muted mt-1">This month</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="px-6 pb-6">
                <TouchableOpacity
                    onPress={handleSetRemain}
                    className="w-full bg-primary py-4 rounded-2xl mb-10"
                >
                    <Text className="text-white font-bold text-lg text-center">Set remain</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
