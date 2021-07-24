import React, { Component } from 'react'
import { StatusBar, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Item, Input, Icon, Button } from 'native-base'
import { Database, Auth } from '../../publics/configs/db'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullname: '',
            email: '',
            bisName: '',
            bisID: '',
            contact: ''
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
    //             console.warn(location.latitude);

    //             let region = {
    //                 latitude: location.latitude,
    //                 longitude: location.longitude,
    //                 latitudeDelta: 0.00922 * 1.5,
    //                 longitudeDelta: 0.00421 * 1.5
    //             }

    //             this.setState({
    //                 mapRegion: region,
    //                 latitude: location.latitude,
    //                 longitude: location.longitude
    //             })
    //         })
    //         .catch(error => {
    //             const { code, message } = error;
    //             console.warn(code, message);
    //         })
    // }

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
                        bisName: this.state.bisName,
                        bisID: this.state.bisID,
                        contact: this.state.contact,
                        avatar: 'https://res.cloudinary.com/dnqtceffv/image/upload/v1566043986/srhwjzljnfq79cg2glov.png',
                        id: response.user.uid
                    })
                    alert('Registration completed')
                    this.props.navigation.navigate('AuthLoading')
                })
                .catch(error => {
                    alert(error.message)

                    this.props.navigation.navigate('Register')
                })
        }
    }

    render() {
        return (
            <View style={styles.root}>
                <StatusBar hidden translucent={true} />
                <Image  style={{width: 150,height:160}} source={require('../login/logo.png')} />
                {/* <Image style={styles.imgBackground} source={require('../../assets/images/1800x1200_diabetes_what_friends_should_know_slideshow.jpg')} resizeMode='cover' /> */}
                <Text style={styles.title}> SIGN UP </Text>

                <Item rounded style={styles.formInput}>
                    {/* <Icon name="user" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Full name" placeholderTextColor="white" onChangeText={fullname => this.setState({ fullname })} style={styles.textInput} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Email" placeholderTextColor="white" onChangeText={email => this.setState({ email })} style={styles.textInput} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="user" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Password" placeholderTextColor="white" onChangeText={password => this.setState({ password })} style={styles.textInput} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Business Name" placeholderTextColor="white" onChangeText={bisName => this.setState({ bisName })} style={styles.textInput} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="PIN" placeholderTextColor="white" onChangeText={bisID => this.setState({ bisID })} style={styles.textInput} />
                </Item>
                <Item rounded style={styles.formInput}>
                    {/* <Icon name="envelope" type="FontAwesome" style={styles.icon} /> */}
                    <Input placeholder="Phone number" placeholderTextColor="white" onChangeText={contact => this.setState({ contact })} style={styles.textInput} />
                </Item>

                {/* <TouchableOpacity style={styles.btnSignUp}  onPress={() => this.props.navigation.navigate('Login')}> 
                    <Text style={styles.txtSignUp}>SIGN IN</Text>
                </TouchableOpacity> */}

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
        justifyContent: 'center'
    },
    txtSignUp: {
        color: 'gray',
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