import { View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('screen');
const duration = 200;
const easing = Easing.bezier(0.35, 0.29, 0.39, 0.59);
const RollingAnimationScreen = () => {
  const [length, setLength] = useState<number>(
    Math.floor(Math.random() * (6 - 1) + 1),
  );
  const StartingPosition = useSharedValue({ x: 0, y: 0 });
  const OffsetPosition = useSharedValue({ x: 0, y: 0 });
  const rotation = useSharedValue(0);
  // contineous rotation on end of gesture
  const rotateOnGestureEnd = () => {
    rotation.value = withRepeat(
      withTiming(rotation.value + 1, { duration, easing }),
      2,
    );

    // sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  };
  const Pan = Gesture.Pan()
    .onBegin(() => {
      StartingPosition.value = {
        x: OffsetPosition.value.x,
        y: OffsetPosition.value.y,
      };
    })
    .onUpdate(event => {
      console.log('event', event);
      OffsetPosition.value = {
        x: clamp(
          event.translationX + StartingPosition.value.x,
          -0,
          width - 128,
        ),
        y: clamp(
          event.translationY + StartingPosition.value.y,
          -0,
          height - 128,
        ),
      };
    })
    .onFinalize(() => {
      StartingPosition.value = {
        x: OffsetPosition.value.x,
        y: OffsetPosition.value.y,
      };
      rotateOnGestureEnd();
      setLength(Math.floor(Math.random() * (7 - 1) + 1));
    })
    .runOnJS(true);
  const AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: OffsetPosition.value.x },
      { translateY: OffsetPosition.value.y },
      {
        rotate: `${rotation.value * 360}deg`,
      },
    ],
  }));

  const ComposeAnimations = Gesture.Simultaneous(Pan);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <GestureDetector gesture={ComposeAnimations}>
        {/* <Text className="text-black font-spacegrotesk-semibold text-2xl">
        Rolling Animaiton
      </Text> */}
        <Animated.View
          className="bg-green-500 h-20 w-20 rounded-xl p-2 "
          style={AnimatedStyle}>
          <View className="  mx-auto my-auto flex-wrap  ">
            {Array(length)
              .fill(0)
              .map((_, index) => {
                return (
                  <View
                    className="h-3 w-3 bg-white rounded-full m-1"
                    key={index}
                  />
                );
              })}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default RollingAnimationScreen;
