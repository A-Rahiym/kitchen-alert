import { View, Text } from "react-native";
import { colors } from "@/design";
import { getPantryIconByKey } from "@/features/pantry/utils";
import Arrange from "@/assets/icons/ui/arrange.svg";
import Funded from "@/assets/icons/ui/funded.svg";

type BudgetDistributionItemProps = {
  name: string;
  icon: string;
  cost: number;
  funded: boolean;
};


export function BudgetDistributionItem({ name, icon, cost, funded }: BudgetDistributionItemProps) {
  const Icon = getPantryIconByKey(icon);
  return (
    <View className="flex-row items-center gap-3">
      <Arrange width={16} height={16} color={colors.muted} />
      <View className={`flex-1 bg-white rounded-2xl p-3 border ${ funded ? "border-border" : "border-accent" } flex-row items-center justify-between`}>
        <View className="flex-row items-center gap-3">
          <View className="w-12 p-3 h-12 bg-surface-alt rounded-md items-center justify-center">
            <Icon width={32} height={32} color={colors.primaryLight} />
          </View>
          <View>
            <Text className="font-bold text-sm text-heading">{name}</Text>
            <Text className="text-xs font-medium text-muted">₦{cost.toLocaleString()}.00</Text>
          </View>
        </View>
        <View className="flex-col items-center gap-1 border-l border-dashed border-stroke pl-4 ">
          {funded ? (
            <>
              <View className="bg-statusFresh rounded-full p-0.5">
                <Text className="text-white text-xs font-bold">✓</Text>
              </View>
              <View className=" flex flex-col justify-between items-center gap-2">
                <Funded width={18} height={18} color={colors.statusFresh} />
                <Text className="text-[10px] font-bold text-heading">Funded</Text>
              </View>
            </>
          ) : (
            <>
              <View className="bg-statusExpired rounded-full p-0.5">
                <Text className="text-white text-xs font-bold">✗</Text>
              </View>
              <View className=" flex flex-col justify-between items-center gap-2">
                     <Funded width={18} height={18} color={colors.tabInactive} />
                <Text className="text-[10px] font-light text-statusExpired">unfunded</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}