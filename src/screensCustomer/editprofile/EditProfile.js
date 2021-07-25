import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Text, Item, Icon, Input, Header, Left, Body, Title, Label, Thumbnail, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
import { Database, Auth } from '../../publics/configs/db'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export class EditProfileCustomer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.navigation.getParam('id'),            
            avatar: this.props.navigation.getParam('avatar'),
            fullname: this.props.navigation.getParam('fullname'),
            contact: this.props.navigation.getParam('contact')
        }
    }
    
    uploadImage = () => {

        
                    Database.ref('user/' + this.state.id).update({ fullname: this.state.fullname, contact: this.state.contact})
                    alert('Updated profile. Data will be shown in the next logged in session')
                    
                    this.props.navigation.navigate('TransactionListScreenCustomer')
        }

    render() {
        const {fullname, currentAvatar, location, interest, aboutme, contact, avatar } = this.state
        console.warn('fullname: ', fullname)
        console.warn('current avatar: ', currentAvatar)
        return (
            <><StatusBar translucent={false} backgroundColor="transparent" />
                <Header>
                    <Left>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('TransactionListScreenCustomer',{})}
                    >
                        <Icon name="arrow-round-back" type="Ionicons" style={{ color: 'white' }} />
                    </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                </Header>
                <View style={styles.root}>
                    <Item style={styles.formInput} floatingLabel>
                        <Icon name="user" type="FontAwesome" style={styles.icon} />
                        <Label style={styles.icon}>Fullname</Label>
                        <Input onChangeText={fullname => this.setState({ fullname })} style={styles.textInput} value={fullname} />
                    </Item>
                    <Item style={styles.formInput} floatingLabel>
                        <Icon name="user" type="FontAwesome" style={styles.icon} />
                        <Label style={styles.icon}>Contact Info</Label>
                        <Input onChangeText={contact => this.setState({ contact })} style={styles.textInput} value={contact} />
                    </Item>
                    <Item style={styles.formInput} floatingLabel>
                        <Icon name="user" type="FontAwesome" style={styles.icon} />
                        <Label style={styles.icon}>Avatar URL</Label>
                        <Input onChangeText={avatar => this.setState({ avatar })} style={styles.textInput} value={avatar} />
                    </Item>
                    <Button primary rounded style={{ width: 300 }} onPress={() => this.uploadImage()}>
                        <Text style={{ textAlign: 'center', width: '100%' }}>Update</Text>
                    </Button>
                </View>
            </>
        )
    }
}

export default EditProfileCustomer

const styles = StyleSheet.create({
    iconStyle: {
        position: 'absolute',
        top: 65,
        color: 'steelblue',
        left: 65
    },
    avatar: {
        borderColor: 'white',
        borderWidth: 2,
        width: 90,
        height: 90,
        borderRadius: 100 / 2
    },
    formInput: {
        width: 300,
        marginHorizontal: 10,
        marginVertical: 30
    },
    textInput: {
        color: 'black'
    },
    icon: {
        color: 'black',
        marginHorizontal: 10
    },
    root: {
        flex: 1,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center'
    }
})