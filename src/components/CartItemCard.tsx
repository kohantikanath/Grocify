import { Image, StyleSheet, Text, View } from 'react-native';

import { CartItem } from '../types';
import { colors, radius, shadows, spacing, typography } from '../theme';
import { formatPrice } from '../utils';
import { QuantityStepper } from './QuantityStepper';

type Props = {
  item: CartItem;
  canAddMore: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function CartItemCard({ item, canAddMore, onIncrement, onDecrement }: Props) {
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;
  const maxReached = !canAddMore;

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">
          {formatPrice(lineTotal)}
        </Text>
        {maxReached && (
          <Text style={styles.maxNotice} numberOfLines={1}>
            No more left
          </Text>
        )}
      </View>
      <QuantityStepper
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        variant="cart"
        canIncrement={canAddMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.sm,
    gap: spacing.sm,
    ...shadows.card,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: radius.sm,
    backgroundColor: colors.secondaryContainer,
  },
  details: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.bodySm,
    color: colors.onSurface,
    fontWeight: '600',
  },
  price: {
    ...typography.priceDisplay,
    color: colors.primary,
  },
  maxNotice: {
    ...typography.bodySm,
    color: colors.error,
    fontSize: 11,
  },
});
