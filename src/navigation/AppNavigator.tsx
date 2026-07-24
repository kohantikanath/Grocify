import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CartScreen } from '../screens/CartScreen';
import { ProductListingScreen } from '../screens/ProductListingScreen';
import { colors } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.onSurface },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="ProductListing"
        component={ProductListingScreen}
        options={{ title: 'Grocify' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'My Cart' }}
      />
    </Stack.Navigator>
  );
}
