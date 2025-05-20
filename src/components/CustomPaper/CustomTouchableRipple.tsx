import * as React from 'react';
import { TouchableRipple } from 'react-native-paper';

interface CustomTouchableRippleProps {
  children: React.ReactNode;
  onPress: () => void;
  key?: string | number;
}

const CustomTouchableRipple = (props: CustomTouchableRippleProps) => {
  return (
    <TouchableRipple
      onPress={props.onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      borderless={false}
      key={props.key}
    >
      {props.children}
    </TouchableRipple>
  );
};

export default CustomTouchableRipple;