import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, ScrollView, AsyncStorage} from 'react-native'
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

export class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.navigation.state.params.id,
            avatar: props.navigation.state.params.avatar,
            ic: props.navigation.state.params.ic,
            address: props.navigation.state.params.address,
            bank_account: props.navigation.state.params.bank_account,
            fullname: props.navigation.state.params.fullname,
            contact: props.navigation.state.params.contact,
        }
    }

        handleChoosePhoto = () => {
        const options = {
            noData: true,
        }

        ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
                this.setState({ avatar: response })
            }
        })
    }

        componentDidMount = async () => {
            await this.uploadImage()
        }

        //     uploadImage = (uri, avatar, mime = 'image/jpg') => {
//         return new Promise((resolve, reject) => {
//             const uploadUri = uri
//             let uploadBlob = null

//             const imageRef = firebase.storage().ref('posts').child(avatar)
//             fs.readFile(uploadUri, 'base64')
//                 .then((data) => {
//                     return Blob.build(data, { type: `${mime};BASE64` })
//                 })
//                 .then((blob) => {
//                     uploadBlob = blob
//                     return imageRef.put(blob, { contentType: mime })
//                 })
//                 .then(() => {
//                     uploadBlob.close()
//                     return imageRef.getDownloadURL()
//                 })
//                 .then((url) => {
//                     resolve(url)
//                     Database.ref('user/' + Auth.currentUser.uid).update({ fullname: this.state.fullname, avatar: url })
//                     this.props.navigation.navigate('AuthLoading')
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         })
//     }

    // uploadImage = () => {
    //     AsyncStorage.setItem('ic', this.state.ic);
    //     AsyncStorage.setItem('fullname', this.state.fullname);
    //     AsyncStorage.setItem('contact', this.state.contact);
    //     AsyncStorage.setItem('bank_account', this.state.bank_account);
    //     AsyncStorage.setItem('address', this.state.address);

    uploadImage = (uri, avatar, mime = 'image/jpg') => {
        return new Promise((resolve, reject) => {
            const uploadUri = uri
            let uploadBlob = null

            const imageRef = firebase.storage().ref('posts').child(avatar)
            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                    Database.ref('user/' + this.state.id).update({ bisName: this.state.fullname, fullname: this.state.fullname, contact: this.state.contact, bank_account: this.state.bank_account, ic: this.state.ic, address: this.state.address, avatar: this.state.avatar})
                    alert('Updated profile. Data will be shown in the next logged in session')
                    this.props.navigation.navigate('TransactionListScreen')
                })
                .catch((error) => {
                    reject(error)
                })
            `   `})
            }

    luploadImage = () => {
        Database.ref('user/' + this.state.id).update({ fullname: this.state.fullname, contact: this.state.contact, bank_account: this.state.bank_account, ic: this.state.ic, address: this.state.address})
        alert('Updated profile. Data will be shown in the next logged in session')
        this.props.navigation.navigate('TransactionListScreen')
    }

    render() {
        const {avatar, fullname, currentAvatar, location, bank_account, ic, address, contact, imgURL } = this.state
        console.warn('fullname: ', fullname)
        console.warn('current avatar: ', currentAvatar)
        return (
            <><StatusBar translucent={false} backgroundColor="transparent" />
                <Header>
                    <Left>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('TransactionListScreen',{})}
                    >
                        <Icon name="arrow-round-back" type="Ionicons" style={{ color: 'white' }} />
                    </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                </Header>
                <ScrollView>
                <View style={styles.root}>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.handleChoosePhoto}>
                        {avatar && (<Thumbnail source={{ uri: avatar.uri }} style={styles.avatar} />) || currentAvatar && (<Thumbnail source={{ uri: currentAvatar }} style={styles.avatar} />)}
                    </TouchableOpacity>
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
                        <Label style={styles.icon}>Address</Label>
                        <Input onChangeText={address => this.setState({ address })} style={styles.textInput} value={address} />
                    </Item>
                    <Item style={styles.formInput} floatingLabel>
                        <Icon name="user" type="FontAwesome" style={styles.icon} />
                        <Label style={styles.icon}>IC</Label>
                        <Input onChangeText={ic => this.setState({ ic })} style={styles.textInput} value={ic} />
                    </Item>
                    <Item style={styles.formInput} floatingLabel>
                        <Icon name="user" type="FontAwesome" style={styles.icon} />
                        <Label style={styles.icon}>Bank Account</Label>
                        <Input onChangeText={bank_account => this.setState({ bank_account })} style={styles.textInput} value={bank_account} />
                    </Item>
                    <Button primary rounded style={{ width: 300 }} onPress={() => this.luploadImage()}>
                        <Text style={{ textAlign: 'center', width: '100%' }}>Update</Text>
                    </Button>
                </View>
                </ScrollView>
            </>
        )
    }
}

export default EditProfile

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