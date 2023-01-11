import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import DeliveryCard from '../components/DeliveryCard';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabNavigatorParamsList } from '../navigator/TabNavigator';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamsList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;
type OrderScreenRouteScreenProp = RouteProp<RootStackParamList, 'Order'>;

const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();

  const {
    params: { order },
  } = useRoute<OrderScreenRouteScreenProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: '#EB6A7C',
      headerBackTitle: 'Deliveries',
    });
  }, []);
  return (
    <View>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
