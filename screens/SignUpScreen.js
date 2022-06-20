import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import LoginBackground from '../components/LoginBackground';

// load font for ios
FontAwesome.loadFont();
Feather.loadFont();

const SignInScreen = ({navigation}) => {
  // data email and password
  const [data, setData] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passCharacter = 6;
  const [errEmail, setErrEmail] = useState('');
  const [errPass, setErrPass] = useState('');
  const [errConfirmPass, setErrConfirmPass] = useState('');
  // login error when sent email and password to firebase
  const [loginError, setLoginError] = React.useState('');

  const animate = useRef(null);
  const email = useRef(null);
  const pass = useRef(null);
  const confirmPass = useRef(null);

  useEffect(() => {
    email.current.focus();
    return () => {};
  }, []);

  // check email change and set email value
  const textInputChange = val => {
    setData({
      ...data,
      email: val.trim(),
      check_textInputChange: val.trim().length !== 0,
    });
    if (!emailRegex.test(val.trim())) {
      return setErrEmail('Please enter valid email');
    } else {
      return setErrEmail('');
    }
  };

  // set password value
  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val.trim(),
    });
    if (val.trim().length < passCharacter - 1) {
      return setErrPass(`Password must be ${passCharacter} characters long.`);
    } else {
      return setErrPass('');
    }
  };

  // set confirm password value
  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val.trim(),
    });
    if (val.trim().length < passCharacter - 1) {
      return setErrConfirmPass(
        `Password must be ${passCharacter} characters long.`,
      );
    } else {
      return setErrConfirmPass('');
    }
  };

  // update secure text in password field when click eye
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  // update secure text in confirm password field when click eye
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  // register account
  const handleSignUp = () => {
    if (
      data.email === '' ||
      data.password === '' ||
      data.confirm_password === ''
    ) {
      animate.current && animate.current.animate('tada', 1000);
      return setLoginError("Can't empty email, password, comfirm password.");
    }

    if (errEmail || errPass || errConfirmPass) {
      animate.current && animate.current.animate('tada', 1000);
      return setLoginError(
        'Please enter valid email, password, comfirm password.',
      );
    }

    if (data.password !== data.confirm_password) {
      animate.current && animate.current.animate('tada', 1000);
      return setLoginError('Please enter valid password and comfirm password.');
    }

    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => setLoginError(''))
      .catch(err => setLoginError(err.message));
  };

  return (
    <LoginBackground>
      <StatusBar backgroundColor="#ffd200" barStyle="light-content" />

      <View style={styles.header}>
        {/* icon */}
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/1721.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {/* title */}
        <Text style={styles.title}>Register Now</Text>

        <ScrollView>
          {/* lable username */}
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            {/* icon user */}
            <FontAwesome name="user-o" color="#05375a" size={20} />
            {/* input username */}
            <TextInput
              ref={email}
              placeholder="Your Username"
              placeholderTextColor="#808080"
              style={styles.textInput}
              returnKeyType="next"
              onSubmitEditing={() => pass.current.focus()}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {/* check input username valid */}
            {data.check_textInputChange && (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            )}
          </View>

          {/* error email */}
          {!(errEmail === '') && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errEmail}</Text>
            </Animatable.View>
          )}

          {/* password field */}
          <Text style={[styles.text_footer, styles.mt35]}>Password</Text>
          <View style={styles.action}>
            {/* password icon */}
            <Feather name="lock" color="#05375a" size={20} />
            {/* password field */}
            <TextInput
              ref={pass}
              placeholder="Your Password"
              placeholderTextColor="#808080"
              secureTextEntry={data.secureTextEntry}
              style={styles.textInput}
              returnKeyType="next"
              onSubmitEditing={() => confirmPass.current.focus()}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            {/* icon eye update secure password field */}
            <TouchableOpacity onPress={updateSecureTextEntry}>
              <Feather
                // if is secure icon eye on
                name={data.secureTextEntry ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>

          {/* error email */}
          {!(errPass === '') && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errPass}</Text>
            </Animatable.View>
          )}

          {/* confirm password */}
          <Text style={[styles.text_footer, styles.mt35]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            {/* confirm password icon */}
            <Feather name="lock" color="#05375a" size={20} />
            {/* confirn field */}
            <TextInput
              ref={confirmPass}
              placeholder="Confirm Your Password"
              placeholderTextColor="#808080"
              secureTextEntry={data.confirm_secureTextEntry}
              style={styles.textInput}
              returnKeyType="next"
              onSubmitEditing={handleSignUp}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            {/* confirm password icon eye update secure confirm password field */}
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              <Feather
                // if is secure icon eye on
                name={data.confirm_secureTextEntry ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>

          {/* error email */}
          {!(errConfirmPass === '') && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errConfirmPass}</Text>
            </Animatable.View>
          )}

          {/* error password */}
          {!(loginError === '') && (
            <Animatable.View animation="tada" ref={animate} duration={1000}>
              <Text style={[styles.errorMsg, styles.errLoginMess]}>
                {loginError}
              </Text>
            </Animatable.View>
          )}
          {/* license */}
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, styles.fontBold]}>
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, styles.fontBold]}>
              Privacy policy
            </Text>
          </View>
          {/* button */}
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleSignUp}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, styles.colorWhite]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.signIn, styles.signIpButton]}>
              <Text style={[styles.textSign, styles.signIpButtonText]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </LoginBackground>
  );
};

export default SignInScreen;

const {height} = Dimensions.get('screen');
// height of logo
const height_logo = height * 0.12;

// style
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  mt35: {
    marginTop: 35,
  },
  signIpButton: {
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15,
  },
  signIpButtonText: {
    color: '#009387',
  },
  colorWhite: {
    color: '#fff',
  },
  errLoginMess: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: -20,
    marginTop: 10,
  },
  fontBold: {
    fontWeight: 'bold',
  },
});
