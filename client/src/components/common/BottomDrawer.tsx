import React, { useRef } from 'react';
import { useEffect } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';

const { height } = Dimensions.get('window');
export enum DrawerState {
  Open = height - 160,
  Peek = 230,
  Closed = 0,
}

interface BottomDrawerProps {
  children?: React.ReactNode;
  clickMarker?: boolean;
  clickMap?: boolean;
  onDrawerStateChange: (nextState: DrawerState) => void;
}


export const animateMove = (
  y: Animated.Value,
  toValue: number | Animated.Value,
  callback?: any,
) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start((finished) => {
/* Optional: But the purpose is to call this after the the animation has finished. Eg. Fire an event that will be listened to by the parent component */
    finished && callback && callback();
  });
};

export const getNextState = (
  currentState: DrawerState,
  val: number,
  margin: number,
): DrawerState => {
  switch (currentState) {
    case DrawerState.Peek:
      return val >= currentState + margin
        ? DrawerState.Open
        : val <= DrawerState.Peek - margin
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Open:
      return val >= currentState
        ? DrawerState.Open
        : val <= DrawerState.Peek
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Closed:
      return val >= currentState + margin
        ? val <= DrawerState.Peek + margin
          ? DrawerState.Peek
          : DrawerState.Open
        : DrawerState.Closed;
    default:
      return currentState;
  }
};

const BottomDrawer: React.FunctionComponent<BottomDrawerProps> = ({
  clickMarker,
  clickMap,
  children,
  onDrawerStateChange,
}) => {
  const { height } = Dimensions.get('window');
  const y = React.useRef(new Animated.Value(DrawerState.Closed)).current;
  const state: any = React.useRef(new Animated.Value(DrawerState.Closed)).current;
  const margin = 0.05 * height;
  const movementValue = (moveY: number) => height - moveY;

  if (clickMarker) animateMove(y, DrawerState.Peek)
  else animateMove(y, DrawerState.Closed)

  const onPanResponderMove = (_: any, { moveY }: any,) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  const onPanResponderRelease = (
    _: any,
    { moveY }: any,
  ) => {
    const valueToMove = movementValue(moveY);
    const nextState = getNextState(state._value, valueToMove, margin);
    animateMove(y, nextState, onDrawerStateChange(nextState));
  };
  const onMoveShouldSetPanResponder = (
    _: any,
    { dy }: any,
  ) => Math.abs(dy) >= 10;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: height,
          backgroundColor: '#fff',
          borderRadius: 25,
          position: 'absolute',
          bottom: -height + 20,
          transform: [{ translateY: y }],
        },
      ]}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default BottomDrawer;