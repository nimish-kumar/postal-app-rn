import { useQuery } from '@apollo/client';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Input } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import CustomerCard from '../components/CustomerCard';
import { GET_CUSTOMERS } from '../graphql/queries';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabNavigatorParamsList } from '../navigator/TabNavigator';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamsList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomerScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [searchText, setSearchText] = useState<string>('');
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{ backgroundColor: '#59C1CC', flex: 1 }}>
      <Image
        source={{ uri: 'https://links.papareact.com/3jc' }}
        containerStyle={tw('w-full h-64')}
      />
      <Input
        placeholder="Search customer name"
        value={searchText}
        onChangeText={setSearchText}
        containerStyle={tw('bg-white pt-2 pb-0 px-10')}
      />
      <ScrollView>
        {data?.getCustomers
          ?.filter(({ value: { name } }: CustomerList) =>
            name.includes(searchText)
          )
          .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
            <CustomerCard key={ID} email={email} name={name} userID={ID} />
          ))}
      </ScrollView>
    </View>
  );
};

export default CustomerScreen;
