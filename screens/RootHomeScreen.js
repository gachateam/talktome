import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator()

const RootHomeScreen = ({ navigation }) => {
    return (
        <RootStack.Navigator headerMode="none">
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        </RootStack.Navigator>
    )
}

export default RootHomeScreen
