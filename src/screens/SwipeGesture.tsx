import {View, Text, Alert} from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import React from 'react';
import Animated from 'react-native-reanimated';

const SwipeGesture = () => {
  const filling = Gesture.Fling()
    .direction(Directions.RIGHT | Directions.LEFT)
    .onStart(() => {
      console.log('you Just swiped');
    });
  return (
    <GestureDetector gesture={filling}>
      <View className="flex-1 justify-center items-center">
        <View className="space-y-6">
          <View className="h-20 w-20 rounded-md bg-orange-500" />
          <View className="h-20 w-20 rounded-md bg-orange-500" />
        </View>
      </View>
    </GestureDetector>
  );
};

export default SwipeGesture;
