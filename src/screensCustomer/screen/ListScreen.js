import React, { Component } from 'react';
import { Alert, StyleSheet, AsyncStorage as storage } from 'react-native';
import { StatusBar } from 'react-native'
import { Container, Header, Left, Body, Title, Subtitle, Content, Footer, FooterTab, Button, Icon, Text, List } from 'native-base';
import { Database, Auth } from '../../publics/configs/db'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewList from '../../components/ViewList';
import PropTypes from 'prop-types';


export default class ListScreenCustomer extends Component {
  constructor(props){
    super(props);

    this.state = {
    clients: [],
    userid: '',
    email: '',
    fullname: '',
    bisName: '',
    token: props.navigation.state.params.qruid ,
    description: null
    };
}

  static propTypes = {
    clients: PropTypes.array.isRequired
};

async componentDidMount()  {
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
  
    let a = this.state.token
    console.log(a)
    let query = Database.ref('/services/' + a)
    query.on('value', (snapshot) => {
        let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({clients: firebaseData});
            console.log(this.state.clients);
          }
     });
     
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
          this.props.navigation.navigate('ViewScreenCustomer', {
            travel_date: travel_date,
            userid: this.state.userid,
            searchID: this.state.token,
            email: this.state.email,
            fullname: this.state.fullname
          })}}
           onLongPress={(travel_date) => {this.deleteConfirmation(travel_date)}} />
        </List>
        <Text>{this.props.travel_date}</Text>
        </Content>
  
        <Footer>
          <FooterTab>
          <Button vertical onPress={() => this.props.navigation.navigate('TransactionListScreenCustomer')}>
              <Icon name="list-box" />
              <Text>Back</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
      </>
    );
  }
}
