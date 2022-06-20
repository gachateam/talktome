import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

// load font for ios
FontAwesome.loadFont();
Feather.loadFont();

const ForgotPassword = ({navigation}) => {
  const {colors} = useTheme();

  // data email and password
  const [data, setData] = React.useState({
    email: '',
  });

  // email ref
  const email = React.useRef(null);

  React.useEffect(() => {
    email.current.focus();
    return () => {};
  }, []);

  const userCharacter = 6;
  // user error
  const [userError, setUserError] = React.useState('');
  // login error when sent email and password to firebase
  const [loginError, setLoginError] = React.useState('');
  // animate login error
  const animate = React.useRef(null);

  // set value of email and check valid email
  const textInputChange = val => {
    setData({
      ...data,
      email: val,
    });
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val.trim())) {
      return setUserError('Please enter valid email');
    } else if (!(val.trim().length > userCharacter - 1)) {
      return setUserError(`Username must be ${userCharacter} characters long.`);
    } else {
      return setUserError('');
    }
  };

  //checklogin
  const loginHandle = e => {
    if (data.email === '') {
      animate.current && animate.current.animate('tada', 1000);
      return setLoginError("Can't empty Email");
    }

    if (userError) {
      animate.current && animate.current.animate('tada', 1000);
      return setLoginError('Please enter valid email');
    }

    auth()
      .sendPasswordResetEmail(data.email)
      .then(result => {
        Alert.alert('Đã gửi', 'Go to Login', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'LOGIN', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(err => {
        Alert.alert('ERROR', err.message, [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK'},
        ]);
      });
  };

  return (
    <LinearGradient
      colors={['#ffd200', '#6edf00', '#00dfbb']}
      style={styles.container}>
      {/* status bar */}
      <StatusBar backgroundColor="#ffd200" barStyle="light-content" />
      <View style={styles.header}>
        {/* icon app */}
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/1721.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text style={styles.title}>Forgot Password</Text>

        <ScrollView>
          {/* enter email */}
          <Text style={[styles.text_footer, styles.mt10]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              ref={email}
              placeholder="Enter your email..."
              placeholderTextColor="#808080"
              style={styles.textInput}
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={textInputChange}
            />
            {data.checkInputChange && (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            )}
          </View>

          {/* error email */}
          {!(userError === '') && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{userError}</Text>
            </Animatable.View>
          )}

          {/* error password */}
          {!(loginError === '') && (
            <Animatable.View animation="tada" ref={animate} duration={1000}>
              <Text style={[styles.errorMsg, styles.errPassMess]}>
                {loginError}
              </Text>
            </Animatable.View>
          )}
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={loginHandle}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, styles.colorWhite]}>Reset</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.signIn, styles.signUpButton]}
              onPress={() => navigation.navigate('SignInScreen')}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, styles.colorWhite]}>
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
              style={[styles.signIn, styles.signUpButton]}>
              <Text style={[styles.textSign, styles.signUpButtonText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </LinearGradient>
  );
};

export default ForgotPassword;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
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
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mt10: {
    marginTop: 10,
  },
  forgotPassword: {
    color: '#009387',
    marginTop: 15,
  },
  errPassMess: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: -30,
    marginTop: 10,
  },
  signUpButton: {
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15,
  },
  signUpButtonText: {
    color: '#009387',
  },
  colorWhite: {
    color: '#fff',
  },
});
