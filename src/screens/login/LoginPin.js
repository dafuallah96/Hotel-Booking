import React, { Component } from 'react'
import { StatusBar, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, Input, Icon, Button } from 'native-base'
import { Database, Auth } from '../../publics/configs/db'

export default class LoginPin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pin : '',
            bisID: '',
         }
    }

    async componentDidMount()  {
        // let a = Auth.currentUser.uid
        await AsyncStorage.getItem('bisID', (err, result) => {
          if (result) {
              this.setState({ bisID: result })
              console.log(this.state.bisID)
          }
      })
    }
    

    _handleLogin = async () => {
        const {pin} = this.state
        
        if (this.state.bisID != pin){
            AsyncStorage.setItem('check', "unchecked")
        } else {
            AsyncStorage.setItem('check', "checked")
        }
        this.props.navigation.navigate('AuthLoading')
    }

    render() {
        return (
            <View style={styles.root}>
                <StatusBar translucent={true}  />
                {/* <Image style={styles.imgBackground} source={require('../../assets/images/94545326-cheerful-friends-taking-selfie-on-a-holiday-group-of-men-and-women-sitting-outdoors-on-a-summer-day-.jpg')} resizeMode='cover' /> */}
                <Text style={styles.title}>Enter Pin</Text>

                <Item rounded style={styles.formInput}>
                    {/* <Icon name="key" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Pin" placeholderTextColor="white" secureTextEntry={true} style={styles.textInput} onChangeText={pin => this.setState({ pin })} />
                </Item>

                <Button rectangle dark onPress={() => this._handleLogin()} style={styles.btnSignIn}>
                <Text style={styles.txtSignIn}>Confirm</Text>
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
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30
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