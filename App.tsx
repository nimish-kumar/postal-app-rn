import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwind-rn';

import RootNavigator from './src/navigator/RootNavigator';
import utilities from './tailwind.json';

const client = new ApolloClient({
  uri: 'http://192.168.0.108:5001/api/ironic-kiwi',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </TailwindProvider>
  );
}
