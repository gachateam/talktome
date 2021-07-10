import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

//load font ios
MaterialIcons.loadFont();
const SplashScreen = ({navigation}) => {
  //dark theme
  const {colors} = useTheme();

  return (
    <LinearGradient colors={['#693ecc', '#d54cc9']} style={styles.container}>
      {/* status bar */}
      <StatusBar backgroundColor="#693ecc" barStyle="light-content" />
      {/* logo */}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
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
              onPress={() => navigation.navigate('SignInScreen')}>
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
    </LinearGradient>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
