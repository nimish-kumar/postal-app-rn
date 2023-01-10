import { Card, Icon } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import uuid from 'react-native-uuid';
import { useTailwind } from 'tailwind-rn/dist';

interface IProp {
  order: Order;
}

const DeliveryCard = ({ order }: IProp) => {
  const tw = useTailwind();
  return (
    <Card
      containerStyle={[
        tw('rounded-lg my-2'),
        {
          backgroundColor: '#59C1CC',
          padding: 0,
          paddingTop: 16,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
        },
      ]}
    >
      <View>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View>
          <Text
            style={tw('text-xs text-center uppercase text-white font-bold')}
          >
            {order.carrier} - {uuid.v4()}
          </Text>
          <Text style={tw('text-lg text-center text-white font-bold')}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Card.Divider color="white" />
        </View>
        <View style={tw('mx-auto')}>
          <Text style={tw('text-center text-white font-bold mt-5 text-base')}>
            Address
          </Text>
          <Text style={tw('text-sm text-white text-center')}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tw('text-sm text-center italic text-white')}>
            Shipping Cost: ₹{order.shippingCost}
          </Text>
        </View>
      </View>
      <Card.Divider color="white" />
      <View style={tw('px-2 py-2')}>
        {order.trackingItems.items.map((item) => (
          <View
            style={tw('flex-row justify-between items-center')}
            key={item.item_id}
          >
            <Text style={tw('text-sm italic text-white')}>{item.name}</Text>
            <Text style={tw('text-white text-xl')}>{item.quantity}</Text>
          </View>
        ))}
      </View>
      <MapView
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={[tw('w-full'), { height: 200 }]}
      >
        {order.Lat && order.Lng && (
          <Marker
            coordinate={{
              latitude: order.Lat,
              longitude: order.Lng,
            }}
            title="Delivery location"
            description={order.Address}
            identifier="destination"
          />
        )}
      </MapView>
    </Card>
  );
};

export default DeliveryCard;
