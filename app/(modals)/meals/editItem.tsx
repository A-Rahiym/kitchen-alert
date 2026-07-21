import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { colors } from "@/design";
import { useMealTableStore } from "@/stores/mealTableStore";
import { Stepper } from "@/components/shared/Stepper";
import Close from "@/assets/icons/ui/close.svg";

function parseTime(timeStr: string): Date {
  const match = timeStr.match(/^(\d+)/);
  let hour = match ? parseInt(match[1], 10) : 7;
  const isPM = timeStr.toLowerCase().includes("pm");
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return d;
}

function formatTime(date: Date): string {
  const h = date.getHours();
  const m = date.getMinutes();
  const isPM = h >= 12;
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const suffix = isPM ? "PM" : "AM";
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export default function EditMealScreen() {
  const router = useRouter();
  const { mealType } = useLocalSearchParams<{ mealType: string }>();
  const meal = useMealTableStore((s) => s.meals.find((m) => m.type === mealType));
  const updateMeal = useMealTableStore((s) => s.updateMeal);
  const removeMeal = useMealTableStore((s) => s.removeMeal);

  const [label, setLabel] = useState(meal?.label || "");
  const [time, setTime] = useState(parseTime(meal?.time || "7:00 AM"));
  const [showPicker, setShowPicker] = useState(false);
  const [people, setPeople] = useState(meal?.people ?? 4);

  if (!meal) return null;

  const handleSave = () => {
    updateMeal(mealType, { label, time: formatTime(time), people });
    router.back();
  };

  const handleDelete = () => {
    removeMeal(mealType);
    router.replace("/mealtable");
  };

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 py-5">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Close width={18} height={18} color={colors.heading} />
        </TouchableOpacity>

        <View className="mb-2">
          <Text className="text-2xl font-bold text-heading mb-2">{mealType}</Text>
          <Text className="text-base text-muted leading-snug">
            Name your meal and set the time and number of people.
          </Text>
        </View>

        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-muted">Meal name</Text>
            <Text className="text-sm text-muted">{label.length}/25</Text>
          </View>
          <TextInput
            className="w-full bg-background border-none rounded-xl py-4 px-4 font-medium text-base text-heading"
            value={label}
            onChangeText={(t) => setLabel(t.slice(0, 25))}
            maxLength={25}
          />
        </View>

        <View className="mt-5">
          <Text className="text-sm font-medium text-muted mb-4">Time</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="w-full py-4 rounded-xl border border-stroke items-center"
          >
            <Text className="text-lg font-bold text-heading">
              {formatTime(time)}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              style={{ width: "100%" }}
              onChange={onChange}
            />
          )}
        </View>

        <View className="mt-14 mb-5">
          <Text className="text-sm font-medium text-muted mb-4">People</Text>
          <Stepper
            size="sm"
            value={people}
            onDecrement={() => setPeople((v) => Math.max(1, v - 1))}
            onIncrement={() => setPeople((v) => v + 1)}
          />
        </View>
      </ScrollView>

      <View className="px-6 pb-10 space-y-2 gap-3">
        <TouchableOpacity
          onPress={handleDelete}
          className="w-full py-4 border border-stroke rounded-2xl"
        >
          <Text className="text-center font-semibold text-base text-red-500">Delete meal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          className="w-full py-4 rounded-2xl bg-primary items-center"
        >
          <Text className="text-white font-semibold text-base">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
