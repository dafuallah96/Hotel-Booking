import React, { Component } from 'react';
import { Alert, StyleSheet, AsyncStorage as storage } from 'react-native';
import { StatusBar } from 'react-native'
import { Container, Header, Left, Body, Title, Subtitle, Content, Footer, FooterTab, Button, Icon, Text, List } from 'native-base';
import { Database, Auth } from '../../publics/configs/db'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewList from '../../components/ViewList';
import PropTypes from 'prop-types';
import PushNotification from "react-native-push-notification";

export default class ListScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
    clients: [],
    userid: '',
    email: '',
    fullname: '',
    bisName: '',
    description: null
    };

    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
    
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
}

  static propTypes = {
    clients: PropTypes.array.isRequired
};

async componentDidMount()  {
  this.testPush();
    // let a = Auth.currentUser.uid
    await AsyncStorage.getItem('userid', (err, result) => {
      if (result) {
          this.setState({ userid: result })
          console.log(this.state.userid)
      }
  })

  await AsyncStorage.getItem('email', (err, result) => {
    if (result) {
        this.setState({ email: result })
        console.log(this.state.email)
    }
})

await AsyncStorage.getItem('fullname', (err, result) => {
  if (result) {
      this.setState({ fullname: result })
      console.log(this.state.fullname)
  }
})

await AsyncStorage.getItem('bisName', (err, result) => {
  if (result) {
      this.setState({ bisName: result })
      console.log(this.state.bisName)
  }
})

await AsyncStorage.getItem('userid', (err, result) => {
  if (result) {
      this.setState({ userid: result })
      console.log(this.state.userid)
  }
})
  

    let token = this.state.userid

    let query = Database.ref('/services/' + token)
    query.on('value', (snapshot) => {
        let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({clients: firebaseData});
            console.log(this.state.clients);
          }
     });
     
  }
  testPush = () => [
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
    })
  ]
  
  deleteConfirmation = (travel_date) =>{
    Database().ref('/services/' + this.state.userid + '/' + travel_date).remove();
    Alert.alert('Status', 'Success');
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
              <Title>Services</Title>
              <Subtitle>Home</Subtitle>
          </Body>
      </Header>
      <Container>
        
        <Content padder>
        {/* <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Booking</Text> */}
        <List vertical={true}>
        <ViewList clients={this.state.clients}  onPress={(travel_date) => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('ViewScreen', {
            travel_date: travel_date,
            userid: this.state.userid,
            email: this.state.email,
            fullname: this.state.fullname
          })}} />
        </List>
        <Text>{this.props.travel_date}</Text>
        </Content>
  
        <Footer>
          <FooterTab>
          </FooterTab>
        </Footer>

      </Container>
      </>
    );
  }
}
