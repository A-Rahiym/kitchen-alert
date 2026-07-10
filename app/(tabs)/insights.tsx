import { useState } from "react";
import { View, Text } from "react-native";
import { SegmentedSwitch } from "@/components/ui/segmentedswitch";
import { LineChart, BarChart } from "react-native-gifted-charts";
import { colors } from "@/design";
import Change from "@/assets/icons/ui/change.svg";
import { useDailySpend } from "@/features/insights/hooks/useDailySpend";
import { useYearlyBarData } from "@/features/insights/hooks/useYearlyBarData";
import { useYearlyTotal } from "@/features/insights/hooks/useYearlyTotal";

export default function InsightsScreen() {
  const [selected, setSelected] = useState("month");
  const [chartWidth, setChartWidth] = useState(0);

  const dailySpend = useDailySpend();
  const spendingBarData = useYearlyBarData();
  const totalYearSpend = useYearlyTotal();

  return (
    <View className="flex-1 items-center justify-start bg-background p-6">
      <View className="w-full flex-col items-start justify-between">
        <Text className="text-3xl font-bold text-heading">Insights</Text>
        <Text className="text-body font-light text-sm">This {selected}</Text>
      </View>

      <View className="mt-2 w-full p-0.5">
        <SegmentedSwitch
          value={selected}
          onChange={setSelected}
          options={[
            { label: "m", value: "month" },
            { label: "y", value: "year" },
          ]}
        />
      </View>

      <View className="my-4 w-full rounded-2xl bg-surface border border-border py-4">
        <View className="flex justify-between gap-2 px-4">
          <View className="gap-1 flex-col">
            <Text className="text-body font-bold text-md">This year</Text>
            <Text className="mt-2 text-3xl font-bold text-body">₦{totalYearSpend.toLocaleString()}.00</Text>
            <Text className="text-status-danger font-light text-sm">
              18% <Text className="text-muted">vs last year</Text>
            </Text>
          </View>
        </View>
        {selected === "month" && (
          <View
            className="mt-2 w-full py-1 bg-surface"
            onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
          >
            <LineChart
              initialSpacing={0}
              endSpacing={0}
              areaChart
              width={chartWidth}
              data={dailySpend}
              spacing={100}
              height={75}
              hideRules
              hideYAxisText
              xAxisLabelTextStyle={{ fontSize: 10 }}
              xAxisThickness={0}
              yAxisThickness={0}
              hideDataPoints
              color={colors.primaryLight}
              startFillColor={colors.primaryLight}
              startOpacity={0.3}
              endFillColor={colors.background}
              endOpacity={0.1}
            />
          </View>
        )}
      </View>

      <View className="w-full flex-row justify-start items-center">
        <Text className="text-body mt-2 font-semibold text-xl">Spending Habit</Text>
      </View>

      <View className="mt-2 w-full rounded-2xl bg-surface border border-border py-4">
        <View className="flex justify-between gap-2 px-4">
          <View className="gap-2 flex-col">
            <Text className="text-body font-bold text-md">Total Spend</Text>
            <Text className="mt-2 text-3xl font-bold text-body">₦{totalYearSpend.toLocaleString()}.00</Text>
            <View className="mb-1 flex flex-col justify-between gap-3">
              <View className="flex flex-row justify-start gap-3 items-center">
                <Text className="text-status-danger font-medium text-md">2026</Text>
                <Change />
              </View>
              <View className="w-full h-0.5 bg-border" />
            </View>
          </View>
        </View>
        <View
          className="mt-2 w-full bg-surface"
          onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
        >
          <BarChart
            width={chartWidth}
            data={spendingBarData}
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
        </View>
      </View>
    </View>
  );
}
