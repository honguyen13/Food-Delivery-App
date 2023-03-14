import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import AccountScreen from '../screens/AccountScreen';
import SearchScreen from '../screens/SearchScreen';
import BasketScreen from '../screens/BasketScreen';
import AccountSettingScreen from '../screens/AccountSettingScreen';


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Account"
            component={AccountScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AccountSetting"
            component={AccountSettingScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Restaurant"
            component={RestaurantScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              headerShown: false,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
          />
          <Stack.Screen
            name="PreparingOrder"
            component={PreparingOrderScreen}
            options={{
              presentation: "card",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              presentation: "card",
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
    </Stack.Navigator>
  );
}