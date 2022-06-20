
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import Label from '../styles/Label';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
const SettingScreen = () => {
  const {colors} = useTheme();
  const handleSignout = () => {
    auth().signOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={styles.topAvartar}>
            <Label>123</Label>
          </View>
          <TouchableOpacity onPress={handleSignout}>
            <Label>Sign out</Label>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.topAvartar}>
            <Label>123</Label>
          </View>
          <TouchableOpacity onPress={handleSignout}>
            <Label>Sign out</Label>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topAvartar: {
    flex: 0.2,
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  safeArea: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
