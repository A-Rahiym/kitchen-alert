import { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { colors } from "@/design";
import { getSettingIcon } from "../utils";
import Arrow from "@/assets/icons/ui/arrow.svg";

type SettingsRowProps = {
  icon: string;
  title: string;
  subtitle: string;
  hasToggle?: boolean;
  onPress?: () => void;
  showDivider?: boolean;
};

export function SettingsRow({ icon, title, subtitle, hasToggle, onPress, showDivider }: SettingsRowProps) {
  const [enabled, setEnabled] = useState(false);
  const Icon = getSettingIcon(icon);

  return (
    <TouchableOpacity
      onPress={hasToggle ? undefined : onPress}
      className="flex rounded-2xl mb-2">
      <View className="flex flex-row gap-2 px-2 pr-5 py-2 justify-around items-center border-border">
        <View className="flex-row items-center justify-between flex-1 gap-2">
          <View className="">
            <Icon width={32} height={24} color={colors.body} />
          </View>
          <View className="flex-1 gap-2">
            <Text className="text-md font-medium text-heading">{title}</Text>
            <Text className="text-sm text-muted">{subtitle}</Text>
          </View>
        </View>
        {hasToggle ? (
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ false: "#E5E7EB", true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        ) : (
          <View className="flex justify-center items-center w-6 h-6 p-3 rounded-full bg-background">
            <Arrow width={8} height={8} color={"#ffrff"} />
          </View>
        )}
      </View>
      {showDivider && <View className=" mx-4 h-[1px] bg-border"  />}
    </TouchableOpacity>
  );
}