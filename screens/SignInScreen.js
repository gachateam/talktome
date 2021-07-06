import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    TextInput
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

const SignInScreen = ({ navigation }) => {
    const { colors } = useTheme();

    const [data, setData] = React.useState({
        email: '',
        password: '',
        checkInputChange: false,
        secureTextEntry: true,
    })

    const passCharacter = 6;
    const userCharacter = 8;
    const [userError, setUserError] = React.useState('')
    const [passError, setPassError] = React.useState('')

    const textInputChange = (val) => {
        setData({
            ...data,
            email: val,
            checkInputChange: val.length != 0,
        })
        setUserError(val.trim().length > userCharacter ? '' : `Username must be ${userCharacter} characters long.`)
    }

    //kiểm tra nhập đúng định dạng password chưa
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        })
        setPassError(val.trim().length > passCharacter ? '' : `Password must be ${passCharacter} characters long.`)
    }

    //ẩn password 
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    //checklogin
    const loginHandle = (userName, password) => {

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            return;
        }
        signIn(foundUser);
    }



    return (
        <LinearGradient
            colors={['#693ecc', "#d54cc9"]}
            style={styles.container}
        >
            <StatusBar backgroundColor='#693ecc' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/1721.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={styles.title}>Welcome!</Text>

                {/* enter email */}
                <Text style={[styles.text_footer, {
                    marginTop: 10
                }]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter your email..."
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={textInputChange}
                    />
                    {data.checkInputChange && <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>}
                </View>

                {/* error email */}
                {!(userError === '') && <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{userError}</Text>
                </Animatable.View>}

                {/* enter password */}
                <Text style={[styles.text_footer, {
                    marginTop: 10
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter your password..."
                        secureTextEntry={data.secureTextEntry}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={handlePasswordChange}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        <Feather
                            name={data.secureTextEntry ? "eye-off" : "eye"}
                            color="gray"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                {/* error password */}
                {!(passError === '') && <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{passError}</Text>
                </Animatable.View>}

                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </LinearGradient>
    );
};

export default SignInScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
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
    }
});