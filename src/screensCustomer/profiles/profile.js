import React, { Component } from 'react'
import { View, Image, StatusBar, StyleSheet, AsyncStorage as storage } from 'react-native'
import { Thumbnail, Button, Icon, Text } from 'native-base'

export class ProfileCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: props.navigation.state.params.fullname,
            contact: props.navigation.state.params.contact,
            id: props.navigation.state.params.id

        }
    }

    render() {
        const { fullname, contact, id} = this.state
        console.warn('fullname: ', fullname)
        return (
            <View style={styles.root}>
                <StatusBar/>
                <View style={styles.profileData}>
                    <Text style={styles.txtFullname}>{this.props.navigation.getParam('fullname')}</Text>
                    <Text style={styles.txtEmail}>{this.props.navigation.getParam('email')}</Text>
                </View>
                <Button style={styles.btnEdit} onPress={() => this.props.navigation.navigate('EditProfileCustomer', {
                    fullname,
                    contact,
                    id
                })}>
                    <Text>Edit Profile</Text><Icon name="ios-create" type="Ionicons" style={styles.iconStyle} />
                </Button>
            </View>
        )
    }
}

export default ProfileCustomer

const styles = StyleSheet.create({
    iconStyle: {
        color: 'white',
        fontSize: 20,
    },
    btnEdit: {
        backgroundColor: '#666666'
    },
    txtEmail: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    txtFullname: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
    profileData: {
        marginVertical: 20
    },
    avatar: {
        borderColor: 'white',
        borderWidth: 2,
        width: 90,
        height: 90,
        borderRadius: 100 / 2
    },
    root: {
        flex: 1,
        backgroundColor: 'black',
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.7
    }
})