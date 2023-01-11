import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ModalScreen from '../screens/ModalScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Main: undefined;
  MyModal: { userId: string; name: string };
  Orders: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name="MyModal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
