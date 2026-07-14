import { useState, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronCircle } from "@/components/ui/ChevronCircle";
import { colors } from "@/design";
import Back from "@/assets/icons/ui/back.svg";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type CalendarProps = {
  onDateChange?: (isoDate: string) => void;
};

export function Calendar({ onDateChange }: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const initialIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => { onDateChange?.(initialIso); }, []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentMonth, currentYear]);
  const startOffset = useMemo(() => {
    const first = new Date(currentYear, currentMonth, 1);
    return (first.getDay() + 6) % 7;
  }, [currentMonth, currentYear]);

  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const grid = useMemo(() => {
    const cells: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length < totalCells) cells.push(null);
    return cells;
  }, [startOffset, daysInMonth, totalCells]);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function handleSelectDay(day: number) {
    setSelectedDay(day);
    const iso = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateChange?.(iso);
  }

  const refillDate = `${selectedDay} ${MONTHS[currentMonth]} ${currentYear}`;

  return (
    <View className="border border-[#E7E7E7] rounded-[24px] p-6">
      <Text className="text-xl font-bold text-heading mb-8">{MONTHS[currentMonth]} {currentYear}</Text>

      <View className="flex-row justify-between mb-4">
        {DAYS.map((d, i) => (
          <Text key={i} className="w-[30px] text-center text-[13px] font-medium text-[#919EAB]">{d}</Text>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {grid.map((day, i) => (
          <View key={i} className="w-[14.28%] items-center py-2">
            {day !== null ? (
              <TouchableOpacity
                onPress={() => handleSelectDay(day)}
                className={`w-10 h-10 items-center justify-center rounded-xl ${day === selectedDay ? "bg-primary" : ""}`}
              >
                <Text className={`text-[15px] font-semibold ${day === selectedDay ? "text-white" : "text-heading"}`}>
                  {day}
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="w-10 h-10" />
            )}
          </View>
        ))}
      </View>

      <View className="mt-10 flex-row items-center justify-between">
        <ChevronCircle onPress={prevMonth} className="rotate-180" />
        <Text className="text-heading font-semibold text-base">{MONTHS[currentMonth]} {currentYear}</Text>
        <ChevronCircle onPress={nextMonth} />
      </View>
      <View className="mt-6">
      </View>
    </View>
  );
}