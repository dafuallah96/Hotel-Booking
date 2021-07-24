import React, { Component } from 'react'
import { StatusBar, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, Input, Icon, Button } from 'native-base'
import { Database, Auth } from '../../publics/configs/db'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            email: '',
            pin : '',
            tag : '',
            password: ''        }
    }

    _handleLogin = async () => {
        const { email, password, pin } = this.state
        if (email === '' || password === '') {
            alert('Kindly ensure all data is filled')
        } else {
            Database.ref('/user').orderByChild('email').equalTo(email).on('value', (result) => {
                let data = result.val()
                console.warn("data: ", data)

                if (data !== null) {
                    let users = Object.values(data)
                    AsyncStorage.setItem('bisName', users[0].bisName)
                    AsyncStorage.setItem('avatar', users[0].avatar)
                    AsyncStorage.setItem('fullname', users[0].fullname)
                    AsyncStorage.setItem('contact', users[0].contact)
                    AsyncStorage.setItem('ic', users[0].ic)
                    AsyncStorage.setItem('bank_account', users[0].bank_account)
                    AsyncStorage.setItem('address', users[0].address)
                    AsyncStorage.setItem('tag', users[0].tag)
                    AsyncStorage.setItem('bisID', users[0].bisID)
                    this.setState({ tag: users[0].tag })

                    console.warn("users", users[0])
                }
            })

            await Auth.signInWithEmailAndPassword(email, password)
                .then((response) => {
                    Database.ref('/user/' + response.user.uid).update({ status: 'online'})
                    AsyncStorage.setItem('userid', response.user.uid)
                    AsyncStorage.setItem('email', response.user.email)

                    if (this.state.tag  === 'business'){
                        this.props.navigation.navigate('LoginPin')
                    } else if(this.state.tag  === 'customer'){
                        this.props.navigation.navigate('AuthLoadingCustomer')
                    }
                })
                .catch(error => {
                    alert(error.message)
                })
        }
    }

    render() {
        return (
            <View style={styles.root}>
                <Image   style={{width: 100,height:100}} source={require('../login/logo.png')} />

                <StatusBar translucent={true}  />
                {/* <Image style={styles.imgBackground} source={require('../../assets/images/94545326-cheerful-friends-taking-selfie-on-a-holiday-group-of-men-and-women-sitting-outdoors-on-a-summer-day-.jpg')} resizeMode='cover' /> */}
                <Text style={styles.title}>Sign In</Text>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Email" placeholderTextColor="white" style={styles.textInput} onChangeText={email => this.setState({ email })} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="key" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Password" placeholderTextColor="white" secureTextEntry={true} style={styles.textInput} onChangeText={password => this.setState({ password })} />
                </Item>

                <Button rectangle dark onPress={() => this._handleLogin()} style={styles.btnSignIn}>
                <Text style={styles.txtSignIn}>Sign In</Text>
                </Button>

                <TouchableOpacity style={styles.btnSignUp} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.txtSignUp}>New Business</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSignUpCustomer} onPress={() => this.props.navigation.navigate('RegisterCustomer')}>
                    <Text style={styles.txtSignUp}>New Customer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSignUp} onPress={() => this.props.navigation.navigate('Forget')}>
                    <Text style={styles.txtFroget}>Forget Password?</Text>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconSignWith: {
        fontSize: 18,
        textAlign: 'center'
    },
    btnSignWith: {
        width: 48,
        height: 48,
        marginHorizontal: 10
    },
    txtLoginWith: {
        color: 'white',
        paddingLeft: 30,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    btnSignIn: {
        width: 100,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // btnSignUp: {
    //     width: 100,
    //     height: 50,
    //     borderRadius: 10,
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    txtSignUp: {
        marginTop: 30,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
    },
    btnSignUpCustomer: {
        // marginTop: 10,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
    },
    txtFroget: {
        marginTop: 25,
        color: 'gray',
        fontSize: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtSignIn: {
        color: 'white',
        fontSize: 20,
    },
    btnSignUp: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        paddingLeft: 30,
        color: 'white'
    },
    formInput: {
        backgroundColor: 'black',
        opacity: 0.8,
        width: 300,
        marginHorizontal: 10,
        marginVertical: 20
    },
    icon: {
        color: 'white',
        marginHorizontal: 10
    },
    title: {
        color: 'gray',
        fontSize: 50,
        fontWeight: 'bold',
        // alignSelf: 'flex-start',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.7
    },
    root: {
        flex: 1,
        backgroundColor: 'rgba(255,228,186,100)',
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})