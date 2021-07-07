import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth'

// load font for ios
FontAwesome.loadFont()
Feather.loadFont()

const SignInScreen = ({ navigation }) => {

    // data email and password
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    // check email change and set email value
    const textInputChange = (val) => {
        setData({
            ...data,
            username: val,
            check_textInputChange: val.length !== 0
        });
    }

    // set password value
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    // set confirm password value
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    // update secure text in password field when click eye
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    // update secure text in confirm password field when click eye
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    // register account
    const handleSignUp = () => {
        auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(() => setLoginError(''))
            .catch((err) => setLoginError(err.message))
    }

    return (
        <LinearGradient
            colors={['#693ecc', "#d54cc9"]}
            style={styles.container}
        >
            {/* status bar */}
            <StatusBar backgroundColor='#693ecc' barStyle="light-content" />
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

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                {/* title */}
                <Text style={styles.title}>Register Now</Text>

                <ScrollView>
                    {/* lable username */}
                    <Text style={styles.text_footer}>Username</Text>
                    <View style={styles.action}>
                        {/* icon user */}
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        {/* input username */}
                        <TextInput
                            placeholder="Your Username"
                            placeholderTextColor="#808080"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {/* check input username valid */}
                        {data.check_textInputChange && <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>}
                    </View>

                    {/* password field */}
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        {/* password icon */}
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        {/* password field */}
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor="#808080"
                            secureTextEntry={data.secureTextEntry}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        {/* icon eye update secure password field */}
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            <Feather
                                // if is secure icon eye on
                                name={data.secureTextEntry ? "eye-off" : "eye"}
                                color="grey"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* confirm password */}
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        {/* confirm password icon */}
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        {/* confirn field */}
                        <TextInput
                            placeholder="Confirm Your Password"
                            placeholderTextColor="#808080"
                            secureTextEntry={data.confirm_secureTextEntry}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        {/* confirm password icon eye update secure confirm password field */}
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            <Feather
                                // if is secure icon eye on
                                name={data.confirm_secureTextEntry ? "eye-off" : "eye"}
                                color="grey"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* license */}
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>By signing up you agree to our</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    {/* button */}
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </LinearGradient>
    );
};

export default SignInScreen;

const { height } = Dimensions.get("screen");
// height of logo
const height_logo = height * 0.12;

// style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo
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
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});