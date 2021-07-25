import React, { Component } from 'react';
import QRCode from 'react-qr-code';
import { Text, View, StyleSheet, Image, AsyncStorage, Link } from 'react-native';
import { List, ListItem, Left, Icon, Body, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';


import { Database, Auth } from '../publics/configs/db'


// var React = require('react');
// var QRCode = require('qrcode.react');

export class Drawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            avatar: '',
            check: '',
            fullname: '',
            userid: '',
            address: '',
            contact: '',
            bank_account: '',
            ic: '',
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

        AsyncStorage.getItem('contact', (err, result) => {
            if (result) {
                this.setState({ contact: result })
            }
        })

        AsyncStorage.getItem('check', (err, result) => {
            if (result) {
                this.setState({ check: result })
            }
        })
        AsyncStorage.getItem('fullname', (err, result) => {
            if (result) {
                this.setState({ fullname: result })
            }
        })

        AsyncStorage.getItem('ic', (err, result) => {
            if (result) {
                this.setState({ ic: result })
            }
        })

        AsyncStorage.getItem('address', (err, result) => {
            if (result) {
                this.setState({ address: result })
            }
        })

        AsyncStorage.getItem('bank_account', (err, result) => {
            if (result) {
                this.setState({ bank_account: result })
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
        const { email, fullname, avatar, userid, contact, ic, address, bank_account } = this.state
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
                        onPress={() => this.props.navigation.navigate('TransactionListScreen')}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="people" type="Ionicons" style={styles.iconStyle} /> Home</Text>
                            </Left>
                        </ListItem>
                    </TouchableOpacity>

                    {this.state.check === "checked" ?
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('EditProfile', {
                            fullname: fullname,
                            email: email,
                            id: userid,
                            address: address,
                            contact: contact,
                            ic: ic,
                            bank_account: bank_account,
                            avatar: avatar

                        })}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="person" type="Ionicons" style={styles.iconStyle} />Business Profile</Text>
                            </Left>
                        </ListItem>
                    </TouchableOpacity>
                        : null}
                    
                    {this.state.check === "checked" ?
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('NewScreen', {
                            fullname: fullname,
                            userid: userid,

                        })}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="add" type="Ionicons" style={styles.iconStyle} /> Add Service</Text>
                            </Left>
                        </ListItem>
                    </TouchableOpacity>
                    : null}
            
            <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ListScreen',{
                        userid: userid
                        })}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="service" type="Ionicons" style={styles.iconStyle} /> Services</Text>
                            </Left>
                        </ListItem>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('QrScreen',{
                        userid: userid
                        })}
                    >
                        <ListItem>
                            <Left>
                                <Text style={styles.txtMenu}><Icon name="code" type="Ionicons" style={styles.iconStyle} /> QR Code</Text>
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
                {/* <Text style={styles.txtQRCode}>This your unique QR code!</Text>
                <View style={styles.container1}>
                <QRCode 
                id="123456"
                value = {this.state.userid}
                level={"H"}
                size={170}
                includeMargin={true}
                /> */}
                {/* <Link onClick={downloadQR}> Download QR </Link> */}
                {/* </View> */}
            </View>
        )
        
    }
}

// const downloadQR = () => {
//     const canvas = document.getElementById("123456");
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     let downloadLink = document.createElement("a");
//     downloadLink.href = pngUrl;
//     downloadLink.download = "123456.png";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

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
        top: 100,
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
        height: 170,
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

export default Drawer
