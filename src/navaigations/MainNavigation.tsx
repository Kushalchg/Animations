import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import React from 'react';
import SwipeGesture from '../screens/SwipeGesture';
import ChartScreen from '../screens/RollingAnimationScreen';
import PanGesture from '../screens/pan/PanGesture';
import TestScreen from '../screens/TestScreen';
import LocalFirst from '../screens/localstorage/LocalFirst';

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
        <Drawer.Screen
          name="TestScreen"
          component={TestScreen}
          options={{title: 'Test Screen'}}
        />
        <Drawer.Screen
          name="LocalFirstScreen"
          component={LocalFirst}
          options={{title: 'Local First'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
