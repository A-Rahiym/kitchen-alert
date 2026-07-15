import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design";

type StepperSize = "sm" | "lg";

type StepperProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: StepperSize;
};

const sizeMap: Record<StepperSize, { button: string; value: string; icon: string; plusBg: string }> = {
  sm: {
    button: "w-12 h-12",
    value: "text-4xl",
    icon: "text-xl",
    plusBg: "bg-heading",
  },
  lg: {
    button: "w-16 h-16",
    value: "text-[80px]",
    icon: "text-2xl",
    plusBg: "bg-tertiary",
  },
};

export function Stepper({ value, onIncrement, onDecrement, size = "lg" }: StepperProps) {
  const s = sizeMap[size];

  return (
    <View className="flex-row items-center justify-between w-full px-4">
      <TouchableOpacity
        onPress={onDecrement}
        className={`${s.button} rounded-full border-2 border-stroke items-center justify-center`}
      >
        <Text className={`${s.icon} text-heading`}>−</Text>
      </TouchableOpacity>

      <Text className={`${s.value} font-semibold tracking-tighter text-heading tabular-nums`}>
        {value}
      </Text>

      <TouchableOpacity
        onPress={onIncrement}
        className={`${s.button} rounded-full ${s.plusBg} items-center justify-center`}
      >
        <Text className={`${s.icon} text-white`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
