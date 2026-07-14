import { useMemo } from "react";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";

export interface PriceItem {
  id: string;
  name: string;
  icon: string;
  price: number;
}

export function usePrices() {
  const items = usePantryStore((s) => s.items);
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const priceItems: PriceItem[] = items.map((item) => {
      const itemTx = transactions
        .filter((t) => t.itemId === item.id)
        .sort((a, b) => b.date.localeCompare(a.date));
      const price = itemTx.length > 0 ? itemTx[0].amount : 0;
      return { id: item.id, name: item.name, icon: item.icon, price };
    });

    const totalPrice = priceItems.reduce((s, i) => s + i.price, 0);

    return { items: priceItems, totalPrice };
  }, [items, transactions]);
}
