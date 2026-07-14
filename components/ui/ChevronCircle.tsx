import { View, TouchableOpacity } from "react-native";
import Chevron from "@/assets/icons/ui/arrow.svg";
import { colors } from "@/design";

type ChevronCircleProps = {
  onPress?: () => void;
  color?: string;
  className?: string;
};

export function ChevronCircle({ onPress, color = colors.muted, className }: ChevronCircleProps) {
  const content = (
    <View className={`flex justify-center items-center w-6 h-6 p-3 rounded-full bg-background ${className || ""}`}>
      <Chevron width={8} height={8} color={color} />
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
}
