import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Navbar } from "@/components/ui/Navbar";
import { colors } from "@/design";

const tabs = [
  { name: "index", title: "Home", icon: "home" as const },
  { name: "pantry", title: "Pantry", icon: "pantry" as const },
  { name: "insights", title: "Insights", icon: "insights" as const },
  { name: "settings", title: "Settings", icon: "settings" as const },
];

export default function TabLayout() {
  const insets = useSafeAreaInsets();



  return (
    <View
      className="flex-1"
      style={{
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <Navbar
        tabs={tabs}
        activeColor={colors.tabActive}
        inactiveColor={colors.tabInactive}
        tabBarStyle={{
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
        }}
      />
    </View>
  );
}
