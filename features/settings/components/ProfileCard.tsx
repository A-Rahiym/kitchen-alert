import { View, Text, TouchableOpacity } from "react-native";
import Arrow from "@/assets/icons/ui/arrow.svg";
import { colors } from "@/design";

type ProfileCardProps = {
  name: string;
  subtitle: string;
  onPress?: () => void;
};

export function ProfileCard({ name, subtitle, onPress }: ProfileCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white  rounded-2xl px-4 py-4 flex-row items-center justify-between shadow-sm border border-border"
    >
      <View className="flex-row items-center gap-6">
        <View className="w-16 h-16  bg-primary-light rounded-full items-center justify-center">
        </View>
        <View>
          <Text className="text-0.5xl font-bold text-heading">{name}</Text>
          <Text className="text-sm text-muted">{subtitle}</Text>
        </View>
      </View>
      <View className="flex justify-center items-center w-6 h-6 p-3 rounded-full bg-background">
        <Arrow width={8} height={8} color={colors.body} />
      </View>
    </TouchableOpacity>
  );
}