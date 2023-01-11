import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import { Image } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { Text, ScrollView, ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn/dist';

import OrderCard from '../components/OrderCard';
import useOrders from '../hooks/useOrders';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabNavigatorParamsList } from '../navigator/TabNavigator';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamsList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;
type OrdersScreenRouteScreenProp = RouteProp<RootStackParamList, 'Order'>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const tw = useTailwind();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#EB6A7E',
        display: 'flex',
        flex: 1,
      }}
    >
      <Image
        source={{ uri: 'https://links.papareact.com/m51' }}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator size="large" />}
      />
      <View style={tw('py-2 px-5 flex-1')}>
        <Button
          color="pink"
          titleStyle={tw('text-gray font-normal')}
          onPress={() => setAscending((v) => !v)}
          style={tw('py-2 px-5 border-black border-2')}
        >
          {ascending ? 'Showing: Oldest first' : 'Showing: Most recent first'}
        </Button>
        <ScrollView>
          {orders
            ?.sort((a, b) => {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            })
            .map((order, index) => (
              <OrderCard key={index} item={order} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default OrdersScreen;
