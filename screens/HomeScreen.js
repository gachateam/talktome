import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const handleSignout = () => {
    auth().signOut();
  };
  console.log(auth().currentUser);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
