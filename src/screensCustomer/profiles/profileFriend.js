import React, { Component } from 'react'
import { View, Image, StatusBar, StyleSheet } from 'react-native'
import { Thumbnail, Button, Icon, Text } from 'native-base'

export class ProfileFriendsCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friendData: this.props.navigation.getParam('data')
        }
    }
    render() {
        const { friendData } = this.state
        return (
            <View style={styles.root}>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Text style={styles.txtFullname}>Profile</Text>
                <Thumbnail source={{ uri: friendData.avatar }} style={styles.avatar} />
                <View style={styles.profileData}>
                    <Text style={styles.txtFullname}>Name: {friendData.fullname}</Text>
                    <Text style={styles.txtData}>Email: {friendData.email}</Text>
                    <Text style={styles.txtData}>Interest: {friendData.interest}</Text>
                    <Text style={styles.txtData}>About me: {friendData.aboutme}</Text>
                    <Text style={styles.txtData}>Location: {friendData.location}</Text>
                    <Text style={styles.txtData}>Contact: {friendData.contact}</Text>
                </View>
            </View>
        )
    }
}

export default ProfileFriendsCustomer

const styles = StyleSheet.create({
    iconStyle: {
        color: 'white',
        fontSize: 15,
    },
    btnLike: {
        backgroundColor: 'red'
    },
    txtData: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    txtFullname: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 10
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