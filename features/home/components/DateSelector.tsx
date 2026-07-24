import { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { colors } from "@/design";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  return DAY_NAMES.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { day: DAY_NAMES[i], date: d.getDate(), full: d };
  });
}

function getTodayDayName() {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return names[new Date().getDay()];
}

export function DateSelector() {
  const week = useMemo(() => getWeekDates(), []);
  const todayName = useMemo(() => getTodayDayName(), []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
      <View className="flex-row gap-3 pb-2">
        {week.map(({ day, date }) => {
          const active = day === todayName;
          return (
            <View
              key={day}
              className={`min-w-[44px] min-h-[60px] rounded-2xl items-center justify-center ${
                active ? "bg-primary shadow-md" : "bg-white/40"
              }`}
            >
              <Text className={`text-[10px] font-light ${active ? "text-white/90" : "text-muted font-normal"}`}>
                {day}
              </Text>
              <Text className={`text-sm font-bold leading-tight ${active ? "text-white" : "text-muted"}`}>
                {date}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
