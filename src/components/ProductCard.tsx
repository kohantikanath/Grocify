import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Product } from '../types';
import { colors, radius, shadows, spacing, typography } from '../theme';
import { formatPrice } from '../utils';
import { QuantityStepper } from './QuantityStepper';

type Props = {
  product: Product;
  quantity: number;
  canAddMore: boolean;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function ProductCard({
  product,
  quantity,
  canAddMore,
  onAdd,
  onIncrement,
  onDecrement,
}: Props) {
  const inCart = quantity > 0;
  const outOfStock = product.stock < 1;

  return (
    <View style={[styles.card, inCart && styles.cardSelected]}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={[styles.stock, outOfStock && styles.outOfStock]}>
          {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {inCart ? (
            <QuantityStepper
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              canIncrement={canAddMore}
            />
          ) : (
            <Pressable
              style={[styles.addButton, outOfStock && styles.addButtonDisabled]}
              onPress={outOfStock ? undefined : onAdd}
              disabled={outOfStock}
            >
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.secondaryContainer,
  },
  content: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  title: {
    ...typography.bodySm,
    color: colors.onSurface,
    minHeight: 36,
  },
  stock: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontSize: 12,
  },
  outOfStock: {
    color: colors.error,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  price: {
    ...typography.priceDisplay,
    color: colors.primary,
    flex: 1,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    opacity: 0.35,
  },
  addButtonText: {
    ...typography.bodyLg,
    color: colors.onPrimary,
    fontWeight: '600',
  },
});
