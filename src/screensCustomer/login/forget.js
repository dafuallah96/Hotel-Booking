import React, { Component } from 'react'
import { StatusBar, Text, View, StyleSheet, Alert, Image, TouchableOpacity, AsyncStorage as storage } from 'react-native'
import { Item, Input, Icon, Button } from 'native-base'
import { Database, Auth } from '../../publics/configs/db'
import GetLocation from 'react-native-get-location'
import * as firebase from 'firebase';

export default class ForgetCustomer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }
    }

    // componentDidMount = async () => {
    //     await this.getCurrentPosition()
    // }

    // getCurrentPosition() {
    //     GetLocation.getCurrentPosition({
    //         enableHighAccuracy: true,
    //         timeout: 15000,
    //     })
    //         .then(location => {
    //             this.setState({
    //                 latitude: location.latitude,
    //                 longitude: location.longitude
    //             })
    //         })
    //         .catch(error => {
    //             const { code, message } = error;
    //             console.warn(code, message);
    //         })
    // }

     
  signUp = async() =>{
    try {
       if(this.state.email){
        await firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(status => { 
                //    console.log(status);
                   Alert.alert('Password reset email sent successfully');
                   this.props.navigation.navigate('LoginCustomer')
             })
            .catch(error => {
              Alert.alert('Status',error.toString(error));
            });
       } else {
          Alert.alert('Status','Invalid Email!');
         }
        } catch (error) {
          Alert.alert({ errorMessage: error.message });
        }
   };

    render() {
        return (
            <View style={styles.root}>
                <Image style={{width: 150,height:160}} source={require('../login/logo.png')} />

                <StatusBar translucent={true} />
                {/* <Image style={styles.imgBackground} source={require('../../assets/images/94545326-cheerful-friends-taking-selfie-on-a-holiday-group-of-men-and-women-sitting-outdoors-on-a-summer-day-.jpg')} resizeMode='cover' /> */}
                <Text style={styles.title}> Forget Password</Text>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Email" placeholderTextColor="white" style={styles.textInput} onChangeText={email => this.setState({ email })} />
                </Item>

                <Button rectangle dark onPress={() => this.signUp()} style={styles.btnSignIn}>
                <Text style={styles.txtReset}>Reset Password</Text>
                </Button>

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
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    txtReset: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSignIn: {
        width: 200,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSignUp: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    btnSignUp: {
        marginLeft: 35,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
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
        fontSize: 25,
        fontWeight: 'normal'
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