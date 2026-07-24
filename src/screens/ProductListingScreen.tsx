import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductListing'>;
};

export function ProductListingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product listing goes here</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Cart')}>
        Go to Cart
      </Text>
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
  link: {
    ...typography.bodySm,
    color: colors.primary,
    marginTop: spacing.sm,
  },
});
