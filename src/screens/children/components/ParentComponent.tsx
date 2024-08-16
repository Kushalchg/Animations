import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';

interface ParentComponentProps {
  children: ReactNode;
}
const ParentComponent: React.FC<ParentComponentProps> = ({children}) => {
  return (
    <View className="bg-red-500 p-8">
      <Text>ParentComponent</Text>
      {children}
    </View>
  );
};

export default ParentComponent;
