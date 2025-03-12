import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import React from 'react';
import ChartScreen from '../screens/RollingAnimationScreen';
import PanGesture from '../screens/pan/PanGesture';
import TestScreen from '../screens/TestScreen';
import LocalFirst from '../screens/localstorage/LocalFirst';
import HocTestScreen from '../screens/HocTestScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import SigninWithGoogle from '../screens/SigninWithGoogle';
import CustomComponent from '../screens/children/CustomComponent';
import NepaliPicker from '../screens/NepaliPicker';
import MapScreen from '../screens/map/MapScreen';
import FingerPrintScreen from '../screens/biometrics/FingerPrint';

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
          options={{ title: 'Home Screen' }}
        />
        <Drawer.Screen
          name="ChartScreen"
          component={ChartScreen}
          options={{ title: 'Chart Screen' }}
        />
        <Drawer.Screen
          name="ScheduleScreen"
          component={ScheduleScreen}
          options={{ title: 'Booking Detail' }}
        />
        <Drawer.Screen
          name="TestScreen"
          component={TestScreen}
          options={{ title: 'Test Screen' }}
        />
        <Drawer.Screen
          name="LocalFirstScreen"
          component={LocalFirst}
          options={{ title: 'Local First' }}
        />
        <Drawer.Screen
          name="GoogleSignin"
          component={SigninWithGoogle}
          options={{ title: 'Google signin' }}
        />
        <Drawer.Screen
          name="HocTestScreen"
          component={HocTestScreen}
          options={{ title: 'Hoc Test' }}
        />
        <Drawer.Screen
          name="CustomComponent"
          component={CustomComponent}
          options={{ title: 'Custom Component' }}
        />
        <Drawer.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ title: 'Map Screen' }}
        />

        <Drawer.Screen
          name="FingerPrintScreen"
          component={FingerPrintScreen}
          options={{ title: 'FingerPrint Screen' }}
        />

        <Drawer.Screen
          name="NepaliPicker"
          component={NepaliPicker}
          options={{ title: 'NepaliPicker' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
