import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, shadows, spacing, typography } from '../theme';
import { formatPrice } from '../utils';

type Props = {
  itemCount: number;
  total: number;
  onPress: () => void;
};

export function FloatingCartBar({ itemCount, total, onPress }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <Pressable style={styles.bar} onPress={onPress}>
        <View>
          <Text style={styles.itemCount}>
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </Text>
          <Text style={styles.total}>{formatPrice(total)}</Text>
        </View>
        <Text style={styles.cta}>VIEW CART ›</Text>
      </Pressable>
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
  bar: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.floating,
  },
  itemCount: {
    ...typography.bodySm,
    color: colors.onPrimary,
    opacity: 0.9,
  },
  total: {
    ...typography.priceDisplay,
    color: colors.onPrimary,
    marginTop: spacing.xs,
  },
  cta: {
    ...typography.labelCaps,
    color: colors.onPrimary,
  },
});
