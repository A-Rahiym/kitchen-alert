import { View, Text } from "react-native";
import { colors } from "@/design";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  subtextColor?: string;
  donut?: React.ReactNode;
};

export function StatCard({ icon, label, value, subtext, subtextColor, donut }: StatCardProps) {
  return (
    <View className="bg-white p-4 rounded-2xl justify-between h-[110px] shadow-sm">
      <View className="flex-row justify-between items-start">
        <View className="bg-orange-50 p-1.5 rounded-lg">
          {icon}
        </View>
        {donut && <View>{donut}</View>}
      </View>
      <View>
        <Text className="text-[10px] text-muted font-bold uppercase">{label}</Text>
        <Text className="text-xl font-bold text-heading">{value}</Text>
        {subtext && (
          <Text className={`text-[10px] ${subtextColor || "text-muted"}`}>{subtext}</Text>
        )}
      </View>
    </View>
  );
}
