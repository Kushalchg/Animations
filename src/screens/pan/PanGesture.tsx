import {View, Text, Alert, TouchableOpacity, Dimensions} from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import PannableBox from './components/PannableBox';
const {height, width} = Dimensions.get('screen');

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const PanGesture = () => {
  const isPressed = useSharedValue(false);
  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});
  const scale = useSharedValue({scale: 1, startScale: 0});
  const angle = useSharedValue(0);
  const startAngle = useSharedValue(0);

  const fling = Gesture.Fling().onStart(e => console.log('fling event', e));

  const pinch = Gesture.Pinch()
    .onStart(e => {
      scale.value.startScale = scale.value.scale;
    })
    .onUpdate(e => {
      // scale.value.scale = clamp(
      //   scale.value.startScale * e.scale,
      //   3,
      //   Math.min(width / 2, height / 2),
      // );
      scale.value.scale = scale.value.startScale * e.scale;
    })
    .onEnd(() => {
      scale.value.startScale = 1;
    });
  console.log(isPressed.value);

  const rotation = Gesture.Rotation()
    .onStart(() => {
      startAngle.value = angle.value;
    })
    .onUpdate(e => {
      angle.value = startAngle.value + e.rotation;
    })
    .onEnd(() => (startAngle.value = angle.value));

  const pan = Gesture.Pan()
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const compose = Gesture.Simultaneous(pan, rotation, pinch, fling);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value.x},
      {translateY: offset.value.y},
      {rotate: `${angle.value}rad`},
      {scale: scale.value.scale},
    ],
  }));
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GestureDetector gesture={compose}>
        <Animated.View
          style={animatedStyle}
          className="bg-blue-500 rounded-md py-10 px-10">
          <View>
            <Text className="text-white font-spacegrotesk-regular text-xl">
              Rotate Me
            </Text>
            <Text className="text-white font-spacegrotesk-regular text-xl">
              Drag Me
            </Text>
            <Text className="text-white font-spacegrotesk-regular text-xl">
              Pinch Me
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
      <View>
        <Text className="text-black font-spacegrotesk-semibold text-3xl  items-center text-center">
          Combination of Pan, Zoom and Rotation
        </Text>
      </View>
    </View>
  );
};

export default PanGesture;
