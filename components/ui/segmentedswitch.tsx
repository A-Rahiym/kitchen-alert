import { Pressable, Text, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function SegmentedSwitch({
  options,
  value,
  onChange,
}: Props) {
  return (
    <View className="flex-row bg-border rounded-xl p-1">
      {options.map((option) => {
        const active = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className={`flex-1 items-center justify-center rounded-lg py-2 ${
              active ? "bg-white" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? "text-[#0D1F2D]" : "text-[#6B7280]"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}