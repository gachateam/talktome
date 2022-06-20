import React from 'react';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import auth from '@react-native-firebase/auth';
import RootHomeScreen from './screens/RootHomeScreen';
import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';

const App = () => {
  const scheme = useColorScheme();

  const Lignt = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: '#1d1d1d',
      contrast: '#000',
    },
    barStyle: 'dark-content',
  };

  const Dark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      text: '#a4a4a4',
      contrast: '#fff',
    },
    barStyle: 'light-content',
  };

  const [user, setUser] = React.useState(null);

  auth().onAuthStateChanged(u => setUser(u));

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '927619935822-b53fuoo7lhaqbp8t94692jun76f5fs0t.apps.googleusercontent.com',
      offlineAccess: true,
    });
    return () => {};
  }, []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? Dark : Lignt}>
      {user ? <RootHomeScreen /> : <RootStackScreen />}
    </NavigationContainer>
  );
};

export default App;
