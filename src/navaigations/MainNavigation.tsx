import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import React from 'react';
import SwipeGesture from '../screens/SwipeGesture';
import ChartScreen from '../screens/ChartScreen';
import PanGesture from '../screens/pan/PanGesture';

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={() => ({
          headerShown: false,
          drawerType: 'slide',
          drawerStyle: {
            width: 300,
          },
        })}>
        <Drawer.Screen
          name="PanGesture"
          component={PanGesture}
          options={{title: 'Home Screen'}}
        />
        <Drawer.Screen
          name="ChartScreen"
          component={ChartScreen}
          options={{title: 'Chart Screen'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
