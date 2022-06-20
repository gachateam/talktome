import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default ({children, style}, props) => {
  const {colors} = useTheme();
  return <Text style={{...style, color: colors.text}}>{children}</Text>;
};
