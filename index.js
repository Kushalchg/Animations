/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {RealmProvider} from '@realm/react';
import {UserInfo} from './storage/models';
import 'react-native-get-random-values';

const AnimationApp = () => {
  return (
    <RealmProvider schema={[UserInfo]}>
      <App />
    </RealmProvider>
  );
};

AppRegistry.registerComponent(appName, () => AnimationApp);
