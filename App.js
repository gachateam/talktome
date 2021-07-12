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
 import {useEffect} from 'react';
 import {GoogleSignin} from '@react-native-google-signin/google-signin';
 
 const App = () => {
   const [user, setUser] = React.useState(null);
 
   auth().onAuthStateChanged(u => setUser(u));
 
   useEffect(() => {
     GoogleSignin.configure({
       webClientId:
         '927619935822-b53fuoo7lhaqbp8t94692jun76f5fs0t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
       offlineAccess: true,
     });
     return () => {};
   }, []);
 
   return (
     <NavigationContainer>
       {user ? <RootHomeScreen /> : <RootStackScreen />}
     </NavigationContainer>
   );
 };
 
 export default App;
 