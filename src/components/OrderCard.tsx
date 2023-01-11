import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Icon } from '@rneui/themed';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { RootStackParamList } from '../navigator/RootNavigator';
import { TabNavigatorParamsList } from '../navigator/TabNavigator';
interface IProp {
  item: Order;
}
type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamsList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;
const OrderCard = ({ item }: IProp) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Order', { order: item })}
    >
      <Card containerStyle={tw('px-5 rounded-lg')}>
        <View style={tw('flex-row items-center justify-between')}>
          <View>
            <Icon
              name="truck-delivery"
              type="material-community"
              color="#EB6A7C"
            />
            <Text style={tw('text-xs')}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>
          <View>
            <Text style={{ color: 'gray', fontWeight: '400', fontSize: 10 }}>
              {item.carrier}
            </Text>
            <Text style={[tw('text-lg'), { color: 'gray', fontWeight: '400' }]}>
              {item.trackingItems.customer.name}
            </Text>
          </View>
          <View style={tw('flex-row items-center')}>
            <Text style={[tw('text-sm'), { color: '#EB6A7C' }]}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon name="box" type="feather" style={tw('ml-2')} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
