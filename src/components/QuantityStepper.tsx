import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function QuantityStepper({ quantity, onIncrement, onDecrement }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onDecrement} hitSlop={8}>
        <Text style={styles.buttonText}>−</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable style={styles.button} onPress={onIncrement} hitSlop={8}>
        <Text style={styles.buttonText}>+</Text>
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
  button: {
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.bodyLg,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  quantity: {
    ...typography.bodySm,
    color: colors.onPrimary,
    fontWeight: '600',
    minWidth: 16,
    textAlign: 'center',
  },
});
