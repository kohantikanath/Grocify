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
  const maxReached = inCart && !canAddMore && !outOfStock;

  return (
    <View style={[styles.card, inCart && styles.cardSelected, outOfStock && styles.cardDisabled]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        {outOfStock && (
          <View style={styles.soldOutOverlay}>
            <Text style={styles.soldOutLabel}>No more left</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text
          style={styles.price}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {formatPrice(product.price)}
        </Text>

        {maxReached && (
          <Text style={styles.maxNotice} numberOfLines={1}>
            No more left
          </Text>
        )}

        <View style={[styles.actions, (inCart || outOfStock) && styles.actionsFull]}>
          {outOfStock ? (
            <View style={styles.unavailableChip}>
              <Text style={styles.unavailableText}>Unavailable</Text>
            </View>
          ) : inCart ? (
            <QuantityStepper
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              canIncrement={canAddMore}
            />
          ) : (
            <Pressable style={styles.addButton} onPress={onAdd}>
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
  cardDisabled: {
    opacity: 0.85,
  },
  imageWrap: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.secondaryContainer,
  },
  soldOutOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soldOutLabel: {
    ...typography.labelCaps,
    color: colors.onSurface,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    overflow: 'hidden',
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
  price: {
    ...typography.priceDisplay,
    color: colors.primary,
    fontSize: 16,
    lineHeight: 22,
  },
  maxNotice: {
    ...typography.bodySm,
    color: colors.error,
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.xs,
  },
  actionsFull: {
    alignSelf: 'stretch',
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    ...typography.bodyLg,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  unavailableChip: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  unavailableText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
});
