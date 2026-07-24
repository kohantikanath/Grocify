import { useMemo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { FloatingCartBar } from '../components/FloatingCartBar';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { Product } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductListing'>;
};

type GridItem = Product | null;

const CART_BAR_HEIGHT = 100;

export function ProductListingScreen({ navigation }: Props) {
  const { products, loading, error, retry } = useProducts();
  const {
    addToCart,
    incrementItem,
    decrementItem,
    getQuantity,
    canAddMore,
    itemCount,
    subtotal,
  } = useCart();

  const gridData: GridItem[] = useMemo(() => {
    if (products.length % 2 === 1) {
      return [...products, null];
    }
    return products;
  }, [products]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={retry}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const renderProduct = ({ item }: { item: GridItem }) => {
    if (!item) {
      return <View style={styles.cardWrapper} />;
    }

    const quantity = getQuantity(item.id);

    return (
      <View style={styles.cardWrapper}>
        <ProductCard
          product={item}
          quantity={quantity}
          canAddMore={canAddMore(item.id, item.stock)}
          onAdd={() => addToCart(item)}
          onIncrement={() => incrementItem(item.id)}
          onDecrement={() => decrementItem(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={gridData}
        keyExtractor={(item, index) => (item ? String(item.id) : `spacer-${index}`)}
        renderItem={renderProduct}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          itemCount > 0 && { paddingBottom: CART_BAR_HEIGHT },
        ]}
        columnWrapperStyle={styles.row}
      />

      {itemCount > 0 && (
        <FloatingCartBar
          itemCount={itemCount}
          total={subtotal}
          onPress={() => navigation.navigate('Cart')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  errorText: {
    ...typography.bodyLg,
    color: colors.error,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
  retryText: {
    ...typography.bodySm,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  listContent: {
    padding: spacing.md,
  },
  row: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardWrapper: {
    flex: 1,
  },
});
