import { TouchableOpacity, Text } from "react-native";

type DayButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function DayButton({ label, selected, onPress }: DayButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-shrink-0 px-4 py-3 rounded-3xl font-semibold shadow-sm ${
        selected ? "bg-primary text-inverse" : "bg-border text-heading"
      }`}
    >
      <Text className={`font-medium ${selected ? "text-inverse" : "text-heading"}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
