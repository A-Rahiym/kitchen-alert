import { colors } from "../../design";
import HomeSvg from "../../assets/icons/home.svg";
import PantrySvg from "../../assets/icons/pantry.svg";
import InsightsSvg from "../../assets/icons/insights.svg";
import SettingsSvg from "../../assets/icons/settings.svg";

const iconComponents = {
  home: HomeSvg,
  pantry: PantrySvg,
  insights: InsightsSvg,
  settings: SettingsSvg,
} as const;

export type NavbarIconName = keyof typeof iconComponents;

type NavbarIconProps = {
  icon: NavbarIconName;
  active?: boolean;
  size?: number;
};

export function NavbarIcon({ icon, active = false, size = 18 }: NavbarIconProps) {
  const Icon = iconComponents[icon];
  return (
    <Icon
      width={size}
      height={size}
      color={active ? colors.tabActive : colors.tabInactive}
    />
  );
}
