import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "@/design";
import { Donut } from "@/components/ui/Donut";
import { usePantryStore } from "@/stores/pantryStore";
import { useMonthlySpend } from "@/hooks/useMonthlySpend";
import { useSpendHistory } from "@/hooks/useSpendHistory";
import { useItemDaysLeft } from "@/features/pantry/hooks/useItemDaysLeft";
import { getPantryIconByKey, getDonutColor } from "@/features/pantry/utils";
import { ChevronCircle } from "@/components/ui/ChevronCircle";
import Edit from "@/assets/icons/ui/edit.svg";
import Back from "@/assets/icons/ui/back.svg";
import Chevron from "@/assets/icons/ui/arrow.svg";


export default function PantryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = usePantryStore((s) => s.items.find((i) => i.id === id));

  const [chartWidth, setChartWidth] = useState(0);

  const { daysLeft, totalDays, pct } = useItemDaysLeft(id ?? "");
  const monthlySpend = useMonthlySpend(id ?? "");
  const history = useSpendHistory(id ?? "");

  if (!item || !id) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-lg text-muted">Item not found</Text>
        <Text className="text-sm text-muted mt-2" onPress={() => router.back()}>Go back</Text>
      </View>
    );
  }

  const Icon = getPantryIconByKey(item.icon);
  const totalSpend = history.reduce((sum, h) => sum + h.value, 0);

  const barData = history.map((h) => ({
    value: h.value,
    label: h.label,
  }));

  return (
    <ScrollView className="flex-1 h-90 px-6 py-2 bg-background">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Back width={16} height={16} color={colors.muted} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-heading">{item.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/pantry/editItem/edit-item?id=${id}`)}
          className="flex-row items-center bg-tertiary gap-2 px-4 py-1.5 rounded-xl"
        >
          <Edit width={14} height={14} color={colors.inverse} />
          <Text className="text-sm font-medium text-inverse">Edit</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col items-center mb-4">
        <View className="w-48 h-48 items-center justify-center mb-2">
          <Icon width={120} height={120} color={colors.primaryLight} />
        </View>
        <Text className="text-2xl font-bold text-heading">{item.name}</Text>
        <Text className="text-base font-medium text-muted mt-1">{item.itemSize}</Text>
      </View>

      <View className="flex-row gap-4 mb-3">
        <View className="flex-1 bg-surface p-4 rounded-2xl border border-border justify-between h-32">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Text className="text-md font-bold text-heading">Remain</Text>
              <Text className="text-md text-muted">ⓘ</Text>
            </View>
            <ChevronCircle width={10} height={10} onPress={() => router.replace(`/pantry/remain?id=${id}`)} />
          </View>
          <View className="flex-row items-end justify-between">
            <View>
              <Text className="text-3xl font-bold text-heading">{daysLeft}</Text>
              <Text className="text-[10px] font-medium text-muted">days left</Text>
            </View>
            <Donut size={32} strokeWidth={4} progress={pct} color={getDonutColor(pct)} />
          </View>
        </View>

        <View className="flex-1 bg-surface p-4 rounded-2xl border border-border justify-between h-32">
          <View className="flex-row items-center justify-between">
            <Text className="text-md font-bold text-heading">Price</Text>
            <ChevronCircle width={10} height={10} 
            onPress={() => router.push(`/shared/edit-price?id=${id}`)}
            />
          </View>
          <View>
            <Text className="text-xl font-bold text-heading">₦{monthlySpend.toLocaleString()}.00</Text>
            <Text className="text-md font-normal text-muted">This month</Text>
          </View>
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-sm font-bold text-heading mb-3">Spend history</Text>
        <View className="bg-surface p-6 rounded-2xl border border-border">
          <View className="mb-6">
            <Text className="text-[10px] font-bold text-heading mb-1">Total Spend</Text>
            <Text className="text-2xl font-black text-heading">₦{totalSpend.toLocaleString()}.00</Text>
            <TouchableOpacity className="flex-row items-center gap-1 mt-2">
              <Text className="text-xs font-bold text-primary">2026</Text>
              <Chevron width={10} height={10} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View
            className="w-full"
            onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
          >
            {(chartWidth > 0 ) && (
              <BarChart
                width={chartWidth}
                data={barData}
                height={120}
                barBorderTopLeftRadius={4}
                barBorderTopRightRadius={4}
                hideRules
                barWidth={19}
                spacing={8}
                initialSpacing={5}
                endSpacing={0}
                frontColor={colors.primary}
                barBorderColor={colors.border}
                hideYAxisText
                xAxisThickness={0.5}
                yAxisThickness={0.5}
                xAxisLabelTextStyle={{
                  fontSize: 9,
                  fontWeight: "bold",
                  color: colors.body,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}