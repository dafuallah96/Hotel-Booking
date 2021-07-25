import React, { Component } from 'react';
// import QRCode from 'react-qr-code';
import QRCode from 'react-native-qrcode-svg';
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import { removeStudent } from '../../publics/services/DataService';
import { Text, View, StyleSheet, Image, AsyncStorage, Link } from 'react-native';
import { StatusBar, ToastAndroid } from 'react-native';
import { Container, Header, Left, Body, Title, Subtitle, Content, Footer, FooterTab, Button, Icon, List } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class QrScreen extends Component {
  svg;
  constructor(props){
    super(props);
    this.state = {
    userid: props.navigation.state.params.userid,
    };
}
  
  render() {
    return (
      <>
      <StatusBar translucent={false} backgroundColor="transparent" />
      <Header>
          <Left>
              <Button transparent rounded onPress={() => this.props.navigation.openDrawer()}>
                  <Icon name='menu' />
              </Button>
          </Left>
          <Body>
              <Title>QR Code</Title>
              <Subtitle></Subtitle>
          </Body>
      </Header>
      <Container>
        <Content padder>
      <Text style={styles.txtQRCode}>This your unique QR code!</Text>
                <View style={styles.container1}>
                {/* <TouchableOpacity onPress={() => this.saveQrToDisk(this.state.userid)}> */}
                <QRCode 
                id="123456"
                value = {this.state.userid}
                size={300}
                getRef={(ref) => (this.svg = ref)}
                />
                {/* </TouchableOpacity> */}
                </View>
                <TouchableOpacity vertical onPress={() => 
                   	this.svg.toDataURL((data) => {
                      RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
                        .then((success) => {
                          return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
                        })
                        .then(() => {
                          this.setState({ busy: false, imageSaved: true  })
                          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
                        })
                    })}>
                  <View style={styles.instructions}>
                    <Text>Share QR code</Text>
                  </View>
                </TouchableOpacity>
          </Content>
          <Footer>
          <FooterTab>
          <Button vertical onPress={() => this.props.navigation.navigate('TransactionListScreen')}>
              <Text>Back</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
      top: 20,
      alignSelf: 'center'
  },
  // avatar: {
  //     position: 'absolute',
  //     top: 25,
  //     alignSelf: 'center',
  //     width: 70,
  //     height: 70,
  //     borderColor: 'white',
  //     borderWidth: 1,
  //     borderRadius: 100 / 2
  // },
  instructions: {
      marginTop: 50,
      color: 'gray',
      fontWeight: 'bold',
      fontSize: 20,
  },
  background: {
      backgroundColor: '#4054b5',
  },
  imgBackground: {
      width: '100%',
      height: 100,
      opacity: 0.6,
  },
  container: {
      flex: 1
  },
  container1: {
      marginTop: 10,
      width: 300,
      height: 300,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'

  }
})