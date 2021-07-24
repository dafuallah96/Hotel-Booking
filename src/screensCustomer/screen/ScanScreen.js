'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  StatusBar
} from 'react-native';
import { Container, Header, Left, Body, Title, Subtitle, Content, Footer, FooterTab, Button, Icon, List } from 'native-base';


import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';

export default class ScanScreenCustomer extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
}

  onSuccess = e => {
    this.props.navigation.navigate('ListScreenCustomer', {
      qruid: e.data,
    })
    console.log(e.data)
  };

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
              <Title>Scanner</Title>
              <Subtitle>Scan the QR Code</Subtitle>
          </Body>
      </Header>

      <QRCodeScanner
        showMarker = {true}
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            Scan your Serivce QR Code
          </Text>
        }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
      <Footer>
          <FooterTab>
          <Button vertical onPress={() => this.props.navigation.navigate('TransactionListScreenCustomer')}>
              <Icon name="list-box" />
              <Text>Back</Text>
            </Button>
          </FooterTab>
        </Footer>
    </>
    );
  }
  
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

