import React from 'react';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const RootHomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
    
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.contrast,
        inactiveTintColor: 'gray',
        style: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: colors.background,
          borderRadius: 15,
          height: 60,
          ...styles.shadow,
          shadowColor: colors.contrast,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 3.5,
    shadowOpacity: 0.25,
    elevation: 5,
  },
});

export default RootHomeScreen;
