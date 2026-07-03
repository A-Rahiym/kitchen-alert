import { Tabs } from "expo-router";
import { colors } from "../../design";
import { NavbarIcon, type NavbarIconName } from "./NavbarIcon";

type TabConfig = {
  name: string;
  title: string;
  icon: NavbarIconName;
};

type NavbarProps = {
  tabs: TabConfig[];
  tabBarStyle?: object;
  activeColor?: string;
  inactiveColor?: string;
  labelStyle?: object;
};

export function Navbar({
  tabs,
  tabBarStyle,
  activeColor = colors.tabActive,
  inactiveColor = colors.tabInactive,
  labelStyle,
}: NavbarProps) {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.stroke,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
          ...tabBarStyle,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          lineHeight: 14,
          ...labelStyle,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused}) => (
              <NavbarIcon icon={tab.icon} active={focused} size={18} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}