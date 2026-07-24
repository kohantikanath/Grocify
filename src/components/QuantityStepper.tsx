import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  variant?: 'product' | 'cart';
  canIncrement?: boolean;
};

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  variant = 'product',
  canIncrement = true,
}: Props) {
  const isCart = variant === 'cart';

  return (
    <View style={[styles.container, isCart && styles.cartContainer]}>
      <Pressable
        style={[styles.button, !canIncrement && styles.buttonDisabled]}
        onPress={canIncrement ? onIncrement : undefined}
        hitSlop={8}
        disabled={!canIncrement}
      >
        <Text style={[styles.buttonText, isCart && styles.cartButtonText]}>+</Text>
      </Pressable>

      <Text style={[styles.quantity, isCart && styles.cartQuantity]}>{quantity}</Text>

      <Pressable style={styles.button} onPress={onDecrement} hitSlop={8}>
        {isCart && quantity === 1 ? (
          <Ionicons name="trash-outline" size={16} color={colors.onSurfaceVariant} />
        ) : (
          <Text style={[styles.buttonText, isCart && styles.cartButtonText]}>−</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  cartContainer: {
    flexDirection: 'column',
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  button: {
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.35,
  },
  buttonText: {
    ...typography.bodyLg,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  cartButtonText: {
    color: colors.onSurface,
    fontSize: 18,
    lineHeight: 22,
  },
  quantity: {
    ...typography.bodySm,
    color: colors.onPrimary,
    fontWeight: '600',
    minWidth: 16,
    textAlign: 'center',
  },
  cartQuantity: {
    color: colors.onSurface,
  },
});
