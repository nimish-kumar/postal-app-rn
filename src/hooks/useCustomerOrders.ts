import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { GET_ORDERS } from '../graphql/queries';

const useCustomerOrders = (userId: string) => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [order, setOrder] = useState<Order[]>([]);
  useEffect(() => {
    if (!data) return;
    const ordersResult: Order[] = data.getOrders.map(
      ({ value }: OrderResponse) => ({
        carrier: value.carrier,
        createdAt: value.createdAt,
        shippingCost: value.shippingCost,
        trackingId: value.trackingId,
        Address: value.Address,
        City: value.City,
        Lat: value.Lat,
        Lng: value.Lng,
      })
    );
    const filteredOrders = ordersResult.filter(
      (order) => order.trackingItems.customer_id === userId
    );
    setOrder(filteredOrders);
  }, [data]);
  return { loading, error, order };
};

export default useCustomerOrders;
