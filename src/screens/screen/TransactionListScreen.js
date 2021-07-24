import React, { Component } from 'react';
import { removeStudent } from '../../publics/services/DataService';
import { Alert, StyleSheet, AsyncStorage as storage } from 'react-native';
import { StatusBar } from 'react-native'
import { Container, Header, Left, Body, Title, Subtitle, Content, Footer, FooterTab, Button, Icon, Text, List } from 'native-base';
import { Database, Auth } from '../../publics/configs/db'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionList from '../../components/TransactionList';
import PropTypes from 'prop-types';


let studentRef = Database.ref('/services');

export default class TransactionListScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
    clients: [],
    userid: '',
    email: '',
    fullname: '',
    destination: null,
    travel_date: null,
    activity: null,
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

await AsyncStorage.getItem('userid', (err, result) => {
  if (result) {
      this.setState({ userid: result })
      console.log(this.state.userid)
  }
})
  

    let token = this.state.userid

    let query = Database.ref('/transactions/' + token)
    console.log("lol", this.state.userid)
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
              <Title>Transactions</Title>
              <Subtitle>Home</Subtitle>
          </Body>
      </Header>
      <Container>
        
        <Content padder>
        {/* <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Booking</Text> */}
        <List vertical={true}>
        <TransactionList clients={this.state.clients}  onPress={(token) => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('TransactionScreen', {
            uid: this.state.userid,
            token: token,
          })}}
            />
        </List>
        <Text>{this.props.token}</Text>
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
