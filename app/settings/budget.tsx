import { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useBudgetStore } from "@/stores/budgetStore";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { useBudgetDistribution } from "@/features/settings/hooks/useBudgetDistribution";
import { BudgetOverviewCard } from "@/features/settings/components/BudgetOverviewCard";
import { BudgetDistributionItem } from "@/features/settings/components/BudgetDistributionItem";
import Back from "@/assets/icons/ui/back.svg";
import Edit from "@/assets/icons/ui/edit.svg";
import { colors } from "@/design";

export default function BudgetScreen() {
  const router = useRouter();
  const kitchenBudget = useBudgetStore((s) => s.budgets.find((b) => b.id === "b1"));
  const items = usePantryStore((s) => s.items);
  const transactions = useTransactionStore((s) => s.transactions);

  const currentMonth = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }, []);

  const budgetItems = useMemo(() => {
    const monthTx = transactions.filter((t) => t.date.startsWith(currentMonth));
    return items.map((item) => {
      const cost = monthTx
        .filter((t) => t.itemId === item.id)
        .reduce((s, t) => s + t.amount, 0);
      return { id: item.id, name: item.name, icon: item.icon, cost };
    });
  }, [items, transactions, currentMonth]);

  const dist = useBudgetDistribution(kitchenBudget?.limit ?? 0, budgetItems);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-4 mb-3">
          <TouchableOpacity onPress={() => router.replace("/settings")}>
            <Back width={20} height={20} color={colors.heading} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-heading">Monthly Budget</Text>
          <View className="flex-1" />
          <TouchableOpacity
            onPress={() => router.push('/shared/edit-budget')}
            className="flex-row items-center bg-tertiary gap-2 px-4 py-1.5 rounded-xl"
          >
            <Edit width={14} height={14} color={colors.inverse} />
            <Text className="text-sm font-medium text-inverse">Edit</Text>
          </TouchableOpacity>
        </View>

        <BudgetOverviewCard
          name={kitchenBudget?.name ?? "Kitchen Budget"}
          limit={kitchenBudget?.limit ?? 0}
          spent={dist.fundedTotal}
          pctUsed={dist.pctUsed}
          excess={dist.excess}
          onAdjust={() => router.push('/shared/edit-budget')}
        />

        <View className="mt-4 mb-2">
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="font-medium text-lg text-heading">Distribution</Text>
            <Text className="text-muted">ⓘ</Text>
          </View>
          <Text className="text-sm mb-4">
            {dist.excess > 0 ? (
              <>
                <Text className="text-status-danger font-medium">
                  ₦{dist.excess.toLocaleString()}.00 to balance across {dist.items.length} items
                </Text>
              </>
            ) : (
              <>
                <Text className="text-status-danger font-medium">
                  ₦{(kitchenBudget?.limit ?? 0) - dist.totalSpend}.00 to balance across 3 items
                </Text>
              </>
            )}
            <Text className="text-muted mx-1">·</Text>
            <Text className="font-bold text-heading">
              ₦{dist.totalSpend.toLocaleString()}.00 total
            </Text>
          </Text>

          <View className="gap-2">
            {dist.items.map((item) => (
              <BudgetDistributionItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                cost={item.cost}
                funded={item.funded}
              />
            ))}
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
