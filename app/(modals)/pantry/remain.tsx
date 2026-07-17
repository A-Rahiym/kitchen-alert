import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Close from "@/assets/icons/ui/close.svg";
import { Donut } from "@/components/ui/Donut";
import { usePantryStore } from "@/stores/pantryStore";
import { useItemDaysLeft } from "@/features/pantry/hooks/useItemDaysLeft";
import { getDonutColor } from "@/features/pantry/utils";
import { colors } from "@/design/colors";

const OPTIONS = [
    { value: "inaccurate", label: "Data was inaccurate, already finished." },
    { value: "refill", label: "Finished just in time. Want to refill" },
];

export default function RemainScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const item = usePantryStore((s) => s.items.find((i) => i.id === id));
    const [selected, setSelected] = useState("inaccurate");

    const { daysLeft, pct } = useItemDaysLeft(id ?? "");

    if (!item || !id) {
        return (
            <View className="flex-1 items-center justify-center">
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
                <View className="mt-2 mb-4">
                    <Text className="text-2xl font-semibold tracking-tight text-heading mb-4">Remain</Text>
                    <Text className="text-md leading-[1.4] font-semibold text-muted">
                        Funds are spread across your pantry items automatically. You can review or update your budget anytime.
                    </Text>
                </View>

                <View className="mb-7">
                    <View className="border border-border rounded-2xl p-4 flex-row justify-between items-center bg-surface">
                        <View>
                            <Text className="text-sm font-bold text-heading mb-1">Remain</Text>
                            <Text className="text-4xl font-extrabold text-heading mb-1">{daysLeft}</Text>
                            <Text className="text-sm font-medium text-status-danger">
                                {daysLeft === 0 ? "Finished" : `${daysLeft} days left`}
                            </Text>
                        </View>
                        <Donut size={40} strokeWidth={6} progress={pct} color={getDonutColor(pct)} />
                    </View>
                </View>

                <View>
                    <Text className="text-md font-medium text-heading mb-4 px-1">What happened?</Text>
                    <View className="space-y-3">
                        {OPTIONS.map((opt) => (
                            <View className="px-1 mb-2" key={opt.value}>
                                <TouchableOpacity
                                    key={opt.value}
                                    onPress={() => setSelected(opt.value)}
                                    className="flex-row items-center justify-between p-5 border border-border rounded-2xl bg-surface"
                                >
                                    <Text className="text-0.5xl font-semibold text-heading flex-1 mr-3">{opt.label}</Text>
                                    <View className={`w-6 h-6 rounded-full items-center justify-center ${selected === opt.value ? "bg-status-fresh" : "border-2 border-stroke"}`}>
                                        {selected === opt.value && (
                                            <Text className="text-white text-xs font-bold">✓</Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>

                        ))}
                    </View>
                </View>
            </View>

            <View className="p-6 pb-8 mb-14">
                <TouchableOpacity
                    onPress={() => router.replace(`/pantry/refill?id=${id}&option=${selected}`)}
                    className="w-full bg-white border  border-stroke  p-4 rounded-xl active:scale-[0.98]"
                >
                    <Text className="text-md font-medium text-heading text-center">Continue to refill</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
