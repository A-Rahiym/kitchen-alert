import { ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { ProfileCard } from "@/features/settings/components/ProfileCard";
import { SettingsRow } from "@/features/settings/components/SettingsRow";
import { settingsItems } from "@/features/settings/data";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-5 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-3xl font-bold text-heading mb-5">Settings</Text>
        <View className="mb-5">
          <Text className="text-md font-bold text-body mb-3 ml-1 capitalize">Account</Text>
          <ProfileCard name="Adam Ilyass" subtitle="Personal info" />
        </View>

        <View className="mb-8">
          <Text className="text-md font-bold text-body mb-3 ml-1 capitalize">Settings</Text>
          <View className="bg-white rounded-2xl border border-border overflow-hidden">
            {settingsItems.map((item, index) => (
              <SettingsRow
                key={item.id}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                hasToggle={item.hasToggle}
                showDivider={index !== settingsItems.length - 1}
                onPress={() => router.replace(`/settings/${item.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
