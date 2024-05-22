import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ChartScreen from '../screens/ChartScreen';

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={() => ({headerShown: false, drawerType: 'slide'})}>
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
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
