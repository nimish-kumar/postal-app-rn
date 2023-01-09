import { gql } from '@apollo/client';

export const GET_TRACKING_ITEMS = gql`
  query FetchTrackingItems {
    getTrackingItems {
      name
      value {
        customer_id
        customer {
          email
          name
        }
        items {
          item_id
          name
          price
          quantity
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query FetchOrders {
    getOrders {
      name
      value {
        Address
        City
        Lat
        Lng
        carrier
        createdAt
        shippingCost
        trackingId
        trackingItems {
          customer {
            email
            name
          }
          customer_id
          items {
            item_id
            name
            price
            quantity
          }
        }
      }
    }
  }
`;
