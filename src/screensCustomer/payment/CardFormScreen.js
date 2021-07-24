import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../../components/Button'
import { addTransaction } from '../../publics/services/DataService';
import {Footer, FooterTab, Content, Container, Icon, Header, Left } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

stripe.setOptions({
  publishableKey:
  "pk_test_51IMNIME5NOi7OAe0ahymOtrMKaxbjbVQwbzVHAFiwNessYy0s3CsI7X1LGwpmvufR484M73JlYJajJaHW2SsOHg200PGu1so0A",
});

export default class CardFormScreenCustomer extends PureComponent {
  static title = 'Card Form'
  constructor(props){
    super(props);
    console.log(this.props)
    this.state = {
    loading: false,
    token: null,
    success: null,
    price: props.navigation.state.params.price,
    email: props.navigation.state.params.email,
    service_type: props.navigation.state.params.service_type,
    searchID: props.navigation.state.params.searchID,
    service_name: props.navigation.state.params.service_name,
    id: props.navigation.state.params.userid,
    remarks: props.navigation.state.params.remarks,
  }
  console.log(this.state.id)
  console.log(this.state.service_name)
  console.log(this.state.email)
}

  doPayment = async () => {

    // Use firebase serve for local testing if you don't have a paid firebase account
    fetch('https://us-central1-hotelbooking-e4531.cloudfunctions.net/payWithStripe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: this.state.price ,
        currency: "myr",
        token: this.state.token
      }),
    })
      // .then((response) => response.json())
      .then((response) => {
        console.log(response)
        this.setState({
          success: response.status == 200 ? true : false,
          response: response,
        })
        
        addTransaction(this.state.email, this.state.success, this.state.price, this.state.service_name, this.state.service_type, this.state.id, this.state.token, this.state.remarks);
        addTransaction(this.state.email, this.state.success, this.state.price, this.state.service_name, this.state.service_type, this.state.searchID, this.state.token, this.state.remarks);
        Alert.alert('Status','Payment Succesful');
        this.props.navigation.navigate('TransactionListScreenCustomer');

      })
      .catch((error) => {
        console.error(error);
      });;
  }

  handleCardPayPress = async () => {
    try {
      console.log(token)
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm()
      console.log('Token from Card ', token)
      this.setState({ loading: false, token: token.id })
      console.log('Token Card from ID', token.id)

    } catch (error) {
      console.log('handleCardPayPress Error ', error)
    }
  }

  render() {
    const { loading, token, success, response } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>
            Enter Card and Make Payment
        </Text>
        </View>
        <Text style={styles.header}>
          Fast Payment
        </Text>
        <Text style={styles.instruction}>
          Enter card info then make payment
        </Text>
        <Button
          text="Enter you card and pay"
          onPress={this.handleCardPayPress}
        />
        <View
          style={styles.token}>
          {token &&
            <>
              <Text style={styles.instruction}>
                Kindly press the make Payment Button to make payment
              </Text> 
              <Button
                text="Make Payment"
                onPress={this.doPayment}
                />
            </>
          }
          {success &&
            <>
              <Text style={styles.instruction}>
                Status: {response.status}
              </Text>
              <Text style={styles.instruction}>
                Message: Payment is Succsesful
              </Text> 
              {/* <Button onPress={() => this.props.navigation.navigate('ListScreenCustomer')}
              text="Return to Home Page"
            /> */}
            </>
            
          }
        </View>
        <Button
          style={styles.button}
          text="Cancel"
          onPress={() => this.props.navigation.navigate('ViewScreenCustomer',{})}
      >
      </Button>
      </View>


/* 
        <Footer>
          <FooterTab>
          <Button vertical onPress={() => this.props.navigation.navigate('TransactionListScreenCustomer')}>
              <Text>Back</Text>
            </Button>
          </FooterTab>
        </Footer> */



    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle:{
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 16
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    marginTop: 200
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})
