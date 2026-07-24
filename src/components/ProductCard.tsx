import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Product } from '../types';
import { colors, radius, shadows, spacing, typography } from '../theme';
import { formatPrice } from '../utils';
import { QuantityStepper } from './QuantityStepper';

type Props = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function ProductCard({
  product,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: Props) {
  const inCart = quantity > 0;

  return (
    <View style={[styles.card, inCart && styles.cardSelected]}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {inCart ? (
            <QuantityStepper
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
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
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.secondaryContainer,
  },
  content: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    ...typography.bodySm,
    color: colors.onSurface,
    minHeight: 40,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  addButtonText: {
    ...typography.bodyLg,
    color: colors.onPrimary,
    fontWeight: '600',
  },
});
