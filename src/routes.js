import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Catalog from './pages/catalog'
import Cart from './pages/cart';
import Header from './components/header'
import { Icon } from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            cardStyle: { backgroundColor: '#313746'}
          }}
          initialRouteName='Catalog'
        >
          <Stack.Screen
            name='Catalog'
            component={Catalog}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: () => <Header/>,
            }}
          />

          <Stack.Screen
            name='Cart'
            component={Cart}
            options={{
              headerTransparent: true,
              headerTitle: () => <Header/>,
              headerBackTitleVisible: false,
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
              headerBackImage: () => {
                <Icon name="chevron-left" size={24} color="#fff"/>
              }
            }}
          />
        </Stack.Navigator>

    </NavigationContainer>
  )
}