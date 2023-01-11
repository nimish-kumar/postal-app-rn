import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { Text } from 'react-native';

import CustomerScreen from '../screens/CustomerScreen';
import OrdersScreen from '../screens/OrdersScreen';

export type TabNavigatorParamsList = {
  Orders: undefined;
  Customers: undefined;
};
const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ color, focused }) => {
          if (route.name === 'Customers') {
            return (
              <Text style={{ color: focused ? '#59C1CC' : 'gray' }}>
                Customers
              </Text>
            );
          }
          if (route.name === 'Orders') {
            return (
              <Text style={{ color: focused ? '#EBA6A7' : 'gray' }}>
                Orders
              </Text>
            );
          }
        },
        // tabBarActiveTintColor: '#59C1CC',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Customers') {
            return (
              <Icon
                name="person"
                type="material"
                color={focused ? '#59C1CC' : 'gray'}
              />
            );
          } else if (route.name === 'Orders') {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? '#EBA6A7' : 'gray'}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomerScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
