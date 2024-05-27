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

const PanGesture = () => {
  const isPressed = useSharedValue(false);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const fling = Gesture.Fling();

  const tap = Gesture.Tap()
    .onBegin(e => {
      console.log('start', e);
      isPressed.value = true;
    })
    .onFinalize(e => {
      console.log('end', e);
      isPressed.value = false;
    });

  console.warn(isPressed.value);
  const pan = Gesture.Pan()
    .onBegin(e => {
      positionX.value = e.absoluteX;
      positionY.value = e.absoluteY;
    })
    .onChange(e => {
      positionX.value = e.absoluteX;
      positionY.value = e.absoluteY;
    });

  const compose = Gesture.Simultaneous(tap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: positionX.value}, {translateY: positionY.value}],
    backgroundColor: isPressed ? '#000' : '#fff',
  }));
  return (
    <View className="flex-1 ">
      <GestureDetector gesture={compose}>
        <Animated.View
          className={`h-20 w-20 rounded-md ${
            isPressed.value ? 'bg-blue-400' : 'bg-orange-500'
          } `}
          style={animatedStyle}
        />
      </GestureDetector>
    </View>
  );
};

export default PanGesture;
