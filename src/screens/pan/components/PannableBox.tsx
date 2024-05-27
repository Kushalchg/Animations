import {View, Text, Alert} from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const PannableBox = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const fling = Gesture.Fling();

  const pan = Gesture.Pan()
    .onTouchesDown(e => {
      console.log(e);
    })
    .onBegin(e => {
      positionX.value = e.absoluteX;
      positionY.value = e.absoluteY;
    })
    .onChange(e => {
      positionX.value = e.absoluteX;
      positionY.value = e.absoluteY;
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: positionX.value}, {translateY: positionY.value}],
  }));
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        className="h-20 w-20 rounded-md bg-orange-500"
        style={animatedStyle}
      />
      <View className="h-20 w-20 rounded-md bg-red-500" />
    </GestureDetector>
  );
};

export default PannableBox;
