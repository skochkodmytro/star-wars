import React, { FC } from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  StyleProp,
  TextStyle
} from 'react-native';

type AppTextProps = TextProps & {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const AppText: FC<AppTextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Figtree'
  }
});

export default AppText;
