import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, shadows, spacing, typography } from '../theme';
import { DELIVERY_FEE, formatPrice } from '../utils';

type Props = {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  isDeliveryFree: boolean;
  grandTotal: number;
};

export function BillSummary({
  itemCount,
  subtotal,
  deliveryFee,
  isDeliveryFree,
  grandTotal,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.panel}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal ({itemCount} items)</Text>
          <Text style={styles.value}>{formatPrice(subtotal)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Delivery</Text>
          {isDeliveryFree ? (
            <View style={styles.deliveryFree}>
              <Text style={styles.strikethrough}>{formatPrice(DELIVERY_FEE)}</Text>
              <Text style={styles.freeText}>Free</Text>
            </View>
          ) : (
            <Text style={styles.value}>{formatPrice(deliveryFee)}</Text>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.grandTotal}>{formatPrice(grandTotal)}</Text>
          </View>
          <Pressable style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: 0,
  },
  panel: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadows.floating,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.bodySm,
    color: colors.onPrimary,
    opacity: 0.9,
  },
  value: {
    ...typography.bodySm,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  deliveryFree: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  strikethrough: {
    ...typography.bodySm,
    color: colors.onPrimary,
    opacity: 0.7,
    textDecorationLine: 'line-through',
  },
  freeText: {
    ...typography.bodySm,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.onPrimary,
    opacity: 0.2,
    marginVertical: spacing.xs,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    ...typography.bodySm,
    color: colors.onPrimary,
    opacity: 0.9,
  },
  grandTotal: {
    ...typography.priceDisplay,
    color: colors.onPrimary,
    marginTop: spacing.xs,
  },
  checkoutButton: {
    backgroundColor: colors.onPrimary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  checkoutText: {
    ...typography.bodySm,
    color: colors.primary,
    fontWeight: '600',
  },
});
