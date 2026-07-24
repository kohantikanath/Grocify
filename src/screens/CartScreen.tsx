import { FlatList, StyleSheet, Text, View } from 'react-native';

import { BillSummary } from '../components/BillSummary';
import { CartItemCard } from '../components/CartItemCard';
import { useCart } from '../context/CartContext';
import { colors, spacing, typography } from '../theme';
import { CartItem } from '../types';

const BILL_SUMMARY_HEIGHT = 200;

export function CartScreen() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    grandTotal,
    isDeliveryFree,
    incrementItem,
    decrementItem,
  } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptyHint}>Add items from the shop to get started</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <CartItemCard
      item={item}
      onIncrement={() => incrementItem(item.product.id)}
      onDecrement={() => decrementItem(item.product.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <BillSummary
        itemCount={itemCount}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        isDeliveryFree={isDeliveryFree}
        grandTotal={grandTotal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: BILL_SUMMARY_HEIGHT,
  },
  separator: {
    height: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  emptyHint: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
