import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import useCustomerOrders from '../hooks/useCustomerOrders';
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen';

interface IProp {
  email: string;
  name: string;
  userID: string;
}
const CustomerCard = ({ email, name, userID }: IProp) => {
  const tw = useTailwind();
  const { loading, error, orders } = useCustomerOrders(userID);
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MyModal', { name, userId: userID })}
    >
      <Card containerStyle={tw('rounded-lg flex justify-around')}>
        <View style={tw('flex flex-row justify-between mb-8')}>
          <View>
            <View>
              <Text style={tw('text-2xl font-bold')}>{name}</Text>
              <Text style={[tw('text-sm'), { color: '#59C1CC' }]}>
                ID: {userID}
              </Text>
            </View>
          </View>
          <View style={tw('flex-row items-center')}>
            <Text style={{ color: '#59C1CC' }}>
              {loading ? 'loading...' : `${orders.length} x `}
            </Text>
            <Icon
              style={tw('ml-auto')}
              name="box"
              type="entypo"
              color="#59C1CC"
              size={50}
            />
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
