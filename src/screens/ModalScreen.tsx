import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import { useTailwind } from 'tailwind-rn/dist';

import DeliveryCard from '../components/DeliveryCard';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabNavigatorParamsList } from '../navigator/TabNavigator';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamsList>,
  NativeStackNavigationProp<RootStackParamList, 'MyModal'>
>;
type ModalScreenRouteScreenProp = RouteProp<RootStackParamList, 'MyModal'>;

const ModalScreen = () => {
  const insets = useSafeAreaInsets();
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteScreenProp>();

  const { loading, error, orders } = useCustomerOrders(userId);
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          flex: 1,
          display: 'flex',
        },
      ]}
    >
      <TouchableOpacity
        style={tw('absolute right-4 top-8 z-10')}
        onPress={navigation.goBack}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={tw('mt-2')}>
        <View style={[tw('py-5 border-b'), { borderColor: '#59C1CC' }]}>
          <Text
            style={[tw('text-center text-xl font-bold'), { color: '#59C1CC' }]}
          >
            {name}
          </Text>
          <Text style={[tw('text-center italic text-sm')]}>deliveries</Text>
        </View>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.trackingId ?? uuid.v4()}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
