import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, Link } from 'react-native';
import { List, ListItem, Left, Icon, Body, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';


import { Database, Auth } from '../publics/configs/db'


export class DrawerCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            avatar: '',
            fullname: '',
            userid: '',
            contact: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userid', (err, result) => {
            if (result) {
                this.setState({ userid: result })
            }
        })
        AsyncStorage.getItem('email', (err, result) => {
            if (result) {
                this.setState({ email: result })
            }
        })

        AsyncStorage.getItem('fullname', (err, result) => {
            if (result) {
                this.setState({ fullname: result })
            }
        })

        AsyncStorage.getItem('contact', (err, result) => {
            if (result) {
                this.setState({ contact: result })
            }
        })

        AsyncStorage.getItem('avatar', (err, result) => {
            if (result) {
                this.setState({ avatar: result })
            }
        })
    }

    _handleLogout = async () => {
        const userToken = await AsyncStorage.getItem('userid');
        console.log(userToken)
        Database.ref('/user/' + userToken).update({ status: "offline" })
        Auth.signOut().then(() => {
            AsyncStorage.clear();
            this.props.navigation.navigate('Login');
        }).catch(error => { alert(error.message) })
    }
    
    render() {
        const { email, fullname, avatar, userid, contact } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                    <Image style={styles.imgBackground}  resizeMode="stretch" />
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                </View>
                <View style={styles.viewProfileData}>
                    <Text style={styles.txtFullname}>{fullname}</Text>
                    <Text style={styles.txtEmail}>{email}</Text>
                </View>
                <List>
                     <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('TransactionListScreenCustomer')}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="people" type="Ionicons" style={styles.iconStyle} /> Home</Text>
                            </Left>
                        </ListItem>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('EditProfileCustomer', {
                            fullname: fullname,
                            avatar: avatar,
                            email: email,
                            contact: contact,
                            id: userid,
                        })}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="person" type="Ionicons" style={styles.iconStyle} /> Profile</Text>
                            </Left>
                        </ListItem>
                    </TouchableOpacity>
                
                    <TouchableOpacity
                        onPress={() => this._handleLogout()}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="exit" type="Ionicons" style={[styles.iconStyle, { color: 'red' }]} /> Logout</Text>
                            </Left>
                        </ListItem>
                    </TouchableOpacity>
                </List>
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    txtMenu: {
        fontSize: 14,
        width: '100%'
    },
    iconStyle: {
        color: 'steelblue',
        fontSize: 20,
    },
    txtEmail: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    txtFullname: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 5
    },
    txtQRCode: {
        paddingTop: 10,
        color: 'black',
        // fontWeight: 'light',
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 5
    },
    viewProfileData: {
        position: 'absolute',
        top: 90,
        alignSelf: 'center'
    },
    avatar: {
        position: 'absolute',
        top: 25,
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 100 / 2
    },
    background: {
        backgroundColor: '#4054b5',
    },
    imgBackground: {
        width: '100%',
        height: 150,
        opacity: 0.6,
    },
    container: {
        flex: 1
    },
    container1: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    }
})

export default DrawerCustomer
