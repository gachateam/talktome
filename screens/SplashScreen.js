import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import LoginBackground from '../components/LoginBackground';

//load font ios
MaterialIcons.loadFont();
const SplashScreen = ({navigation}) => {
  //dark theme
  const {colors} = useTheme();
  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log(error);
    }
  }
  async function onGoogleButtonPress() {
    try {
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        console.log('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('Something went wrong:', error);
      }
    }
  }
  return (
    <LoginBackground>
      <StatusBar backgroundColor="#ffd200" barStyle="light-content" />

      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/1721.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      {/* footer */}
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <ScrollView>
          {/* login email and password */}
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}>
            Stay connected with everyone!
          </Text>
          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
              <LinearGradient
                colors={['#0080ff', '#aa00ff']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* login gg and facebook */}
          <Text style={styles.text}>Sign in with Google or Facebook</Text>
          <View style={styles.buttonGGFB}>
            <TouchableOpacity onPress={() => onGoogleButtonPress()}>
              <LinearGradient
                colors={['#fff', '#fff']}
                style={StyleSheet.compose(styles.signInGGFB, styles.signInGG)}>
                <Image
                  source={require('../assets/Google_Logo.png')}
                  style={styles.imageGG}
                />

                <Text style={styles.textSignGG}>Google</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                onFacebookButtonPress().then(() =>
                  console.log('Signed in with Facebook!'),
                )
              }>
              <LinearGradient
                colors={['#1877f2', '#1877f2']}
                style={StyleSheet.compose(styles.signInGGFB, styles.signInFB)}>
                <Image
                  source={require('../assets/szGrb_tkxMW.png')}
                  style={styles.imageFB}
                />
                <Text style={styles.textSignFB}>Facebook</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </LoginBackground>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 15,
    marginBottom: 15,
  },
  buttonGGFB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  signInGGFB: {
    width: 150,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  signInGG: {
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 5,
  },
  signInFB: {
    borderRadius: 5,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  textSignGG: {
    color: '#000',
    fontWeight: 'bold',
  },
  textSignFB: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
