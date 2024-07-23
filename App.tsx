import {View, Text} from 'react-native';
import React from 'react';
import MainNavigation from './src/navaigations/MainNavigation';
import {RealmProvider} from '@realm/react';

const App = () => {
  return (
    <>
      <MainNavigation />
    </>
  );
};

export default App;
