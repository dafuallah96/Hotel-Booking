import React, { Component } from 'react'
import { StatusBar, Text, View, StyleSheet,ScrollView, Image, TouchableOpacity } from 'react-native'
import { Item, Input, Icon, Button } from 'native-base'
import { Database, Auth } from '../../publics/configs/db'

export default class RegisterCustomer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullname: '',
            email: '',
            contact: ''
        }
    }


    _handleRegister = () => {
        if (this.state.fullname === '' || this.state.email === '' || this.state.password === '') {
            alert('Kindly ensure all data is filled')
        } else {
            Auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    console.warn(response)
                    Database.ref('/user/' + response.user.uid).set({
                        fullname: this.state.fullname,
                        email: this.state.email,
                        status: 'offline',
                        contact: this.state.contact,
                        id: response.user.uid,
                        tag: 'customer'
                    })
                    alert('Registration completed')
                    this.props.navigation.navigate('AuthLoading')
                })
                .catch(error => {
                    alert(error.message)

                    this.props.navigation.navigate('RegisterCustomer')
                })
        }
    }

    render() {
        return (
            <View style={styles.root}>
                <StatusBar hidden translucent={true} />
                {/* <Image style={styles.imgBackground} source={require('../../assets/images/1800x1200_diabetes_what_friends_should_know_slideshow.jpg')} resizeMode='cover' /> */}
                <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>CUSTOMER SIGN UP</Text>

                <Item rounded style={styles.formInput}>
                    {/* <Icon name="user" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Full name" placeholderTextColor="white" onChangeText={fullname => this.setState({ fullname })} style={styles.textInput} />
                </Item>

                <Item rounded style={styles.formInput}>
                    {/* <Icon name="user" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Password" placeholderTextColor="white" onChangeText={password => this.setState({ password })} style={styles.textInput} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Email" placeholderTextColor="white" onChangeText={email => this.setState({ email })} style={styles.textInput} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input keyboardType="numeric" placeholder="Phone number" placeholderTextColor="white" onChangeText={contact => this.setState({ contact })} style={styles.textInput} />
                </Item>

                {/* <TouchableOpacity style={styles.btnSignUp}  onPress={() => this.props.navigation.navigate('Login')}> 
                    <Text style={styles.txtSignUp}>SIGN IN</Text>
                </TouchableOpacity> */}
                 </ScrollView>
                <Button rectangle dark onPress={() => this._handleRegister()} style={styles.btnSignIn}>
                    <Text style={styles.txtSignIn}>Register</Text>
                </Button>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    btnSignIn: {
        width: 100,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    txtSignUp: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
    },
    scrollView: {
        marginTop: 50
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
        opacity: 0.95,
        width: 300,
        marginHorizontal: 10,
        marginVertical: 10
    },
    icon: {
        color: 'white',
        marginHorizontal: 10
    },
    title: {
        color: 'gray',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.7
    },
    txtSignIn: {
        color: 'white',
        fontSize: 20,
    },
    root: {
        flex: 3,
        backgroundColor: 'rgba(255,228,186,100)',
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})