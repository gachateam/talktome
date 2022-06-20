import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginBackground = ({children}) => {
  return (
    <LinearGradient
      colors={['#ffd200', '#6edf00', '#00dfbb']}
      style={styles.container}>
      {/* status bar */}
      {children}
    </LinearGradient>
  );
};

export default LoginBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
