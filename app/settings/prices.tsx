import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { usePrices } from "@/features/settings/hooks/usePrices";
import { PriceItem } from "@/features/settings/components/PriceItem";
import Back from "@/assets/icons/ui/back.svg";
import { colors } from "@/design";

export default function PricesScreen() {
  const router = useRouter();
  const { items, totalPrice } = usePrices();

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-4 mb-3">
          <TouchableOpacity onPress={() => router.replace("/settings")}>
            <Back width={20} height={20} color={colors.heading} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-heading">Prices</Text>
        </View>

        <View className="flex-row items-center gap-1.5 mb-1 pt-2">
          <Text className="text-sm font-semibold text-heading">All items</Text>
          <Text className="text-muted text-sm">ⓘ</Text>
        </View>
        <Text className="text-sm text-muted mb-6">
          Total amount{" "}
          <Text className="font-bold text-heading">₦{totalPrice.toLocaleString()}.00</Text>
        </Text>

        <View className="gap-2">
          {items.map((item) => (
            <PriceItem
              key={item.id}
              name={item.name}
              icon={item.icon}
              price={item.price}
              onEdit={() => router.push(`/modals/settings/shared/edit-price?id=${item.id}`)}
            />
          ))}
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
