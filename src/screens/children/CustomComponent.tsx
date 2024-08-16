import {View, Text} from 'react-native';
import React from 'react';
import ParentComponent from './components/ParentComponent';

const CustomComponent = () => {
  return (
    <View>
      <Text>CustomComponent</Text>
      <ParentComponent>
        <View className="bg-green-400">
          <Text>This is child component</Text>
        </View>
        <View>
          <Text>
            in this componwnt we can write whatever we can and it is a props for
            the it's parent component and the parent component is a component
            with red background
          </Text>
        </View>
      </ParentComponent>
    </View>
  );
};

export default CustomComponent;
