import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

export function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart screen goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  text: {
    ...typography.bodyLg,
    color: colors.onSurface,
  },
});
