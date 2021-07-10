/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import auth from '@react-native-firebase/auth';
import RootHomeScreen from './screens/RootHomeScreen';

const App = () => {
  const [user, setUser] = React.useState(null);

  auth().onAuthStateChanged(u => setUser(u));

  return (
    <NavigationContainer>
      {user ? <RootHomeScreen /> : <RootStackScreen />}
    </NavigationContainer>
  );
};

export default App;
