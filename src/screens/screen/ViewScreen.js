import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Alert, StyleSheet, AsyncStorage as storage} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Body, Icon, Text, Form, Item, Label, Input, Picker, ListItem, CheckBox } from 'native-base';
import { Database, Auth } from '../../publics/configs/db';
import { addTransaction } from '../../publics/services/DataService';
import { addService } from '../../publics/services/DataService';

let studentRef = Database.ref('/services');

export default class ViewScreen extends Component {
  constructor(props){
   super(props);
   console.log(this.props)
   this.state = {
    clients: [],
     destination: null,
     token: props.navigation.state.params.userid,
     tokenCash: 'cash',
     success: 'true',
     service_name: props.navigation.state.params.travel_date,
     zero: '00',
     activity: null,
     fullname: props.navigation.state.params.fullname,
     email: props.navigation.state.params.email,
     description: null,
     user: null,
     checkedItem1: Boolean,
     item1: null,
     item2: null,
     item_checked1: null,
     remarks: null,
     phoneNumber: null
   }
  }

  async componentDidMount() {
    console.log(this.state.token)
    console.log(this.state.service_name)
    console.log(this.state.email)



    console.log(this.state.token)
    let query = Database.ref('/services/' + this.state.token).orderByChild("service_name").equalTo(this.state.service_name);
    console.log(query)
      query.once('value', (snapshot) => {
      let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({clients: firebaseData},()=>{
              this.state.clients.map((element) => {
                this.setState({
                  service_description: element.service_description,
                  service_name: element.service_name,
                  service_price: element.service_price,
                  service_type: element.service_type,
                  item1: element.item1,   
                  item2: element.item2,   
                  id: element._id
                });
              });
            });
          }
     });
  };


  setServiceType= (value) => {
    this.setState({ service_type: value });
  }

  ItemChecked= (value) => {
    this.setState({ item_checked1: value });
    this.setState({ checkedItem1: true });
  }

  setServicePrice = (value) =>{
    this.setState({ service_price: value });
  }

  setDescription = (value) => {
    this.setState({ service_description: value });
  }

  setAddOn = (value) => {
    this.setState({ item1: value });
  }


  setUserNumber = (value) => {
    this.setState({ phoneNumber: value });
  }

  updateData = () =>{
    const re = /^[0-9\b]+$/; //rules
    if(this.state.service_type && this.state.service_name && this.state.service_price && this.state.service_description){
      if (this.state.service_type === null || !re.test(this.state.service_price)) {
        Alert.alert('Status','Invalid Service Type or Price!');
      }
       else{
        addService(this.state.service_type, this.state.service_name, this.state.service_price, this.state.service_description, this.state.token, this.state.fullname);
        Alert.alert('Status','Updated');
        this.props.navigation.navigate('ListScreen');
       }
    } else{
       Alert.alert('Status','Empty Field(s)!');
    }
  }

  deleteConfirmation = (service_name) =>{
    Database.ref('/services/' + this.state.token + '/' + service_name).remove();
    Alert.alert('Status', 'Record Deleted');
    this.props.navigation.navigate('ListScreen');
  }

  handleCash = () => {
    const re = /^[0-9\b]+$/; //rules
    if (this.state.phoneNumber === null || !re.test(this.state.phoneNumber)) {
      alert('Kindly add user phone number')
  } else {
    var ttprice = Number(this.state.item2) + Number(this.state.service_price);
    var totprice = '' + ttprice;
    var date = new Date().toLocaleString();

    addTransaction(this.state.email, this.state.success, totprice, this.state.service_name, this.state.service_type, this.state.token, this.state.phoneNumber + this.state.service_name, this.state.remarks, date);
    Alert.alert('Status','Transaction is succesful');
    this.props.navigation.navigate('TransactionListScreen')
  }
}

  render() {
    const {user} = this.state
    const {stripe} = this.props;

    var ttprice = Number(this.state.item2) + Number(this.state.service_price);
    var totprice = '' + ttprice;
    return (
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Service Details</Text>
        <Form>
        <Item fixedLabel last>
        {/* <Text>{JSON.stringify(this.props)}</Text> */}
              <Label>Serivce Type</Label>
              <Input  value={this.state.service_type}  onChangeText={this.setServiceType} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Name</Label>
              <Input value={this.state.service_name} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Price</Label>
              <Input  onChangeText={this.setServicePrice} value={this.state.service_price} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Description</Label>
              <Input  onChangeText={this.setDescription} value={this.state.service_description} />
            </Item>

            <ListItem fixedLabel last>
              <CheckBox
                style={{ borderColor: 'blue' }}
                checked={true}
                color={'blue'}
                onPress={() => true}
              />               

              <Body>
              <Text>{this.state.item1} </Text>
            </Body>
        </ListItem>
        
        <Item fixedLabel last>
              <Label>User Phone Number</Label>
              <Input 
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
              keyboardType="numeric"  onChangeText={this.setUserNumber} />
              
        </Item>
        
        <Item fixedLabel last>
              <Label>Add-On</Label>
              <Input  onChangeText={this.item1} value={this.state.item1} />
        </Item>

        <Item fixedLabel last>
          <Label>Add-On Price</Label>
          <Input onChangeText={this.item2} value={this.state.item2} />
        </Item>

        <Item fixedLabel last>
          <Label>Total Price</Label>
          <Input onChangeText={this.item3} value={totprice} />
        </Item>

        </Form>


        <Button style={styles.btnDelete} block onPress={() => this.handleCash()}>
            <Text>Pay by Cash</Text>
        </Button>

        <Button style={styles.btnDelete} block onPress={() => this.updateData()}>
            <Text>Update</Text>
        </Button>

                <Button style block onPress={() => this.deleteConfirmation(this.state.service_name)} style={styles.btnDelete}>
                  <Text>Delete</Text>
                </Button>
                
        </Content>
        <Footer>
          <FooterTab>
          <Button vertical onPress={() => this.props.navigation.navigate('TransactionListScreen')}>
              <Icon name="list-box" />
              <Text>Back</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      );
  }
}

const styles = StyleSheet.create({

  btnDelete:{
    marginTop: 30,
  }
  

})

// const InjectedCheckoutForm = () => (
//   <ElementsConsumer>
//     {({stripe, elements}) => (
//       <CheckoutForm stripe={stripe} elements={elements} />
//     )}
//   </ElementsConsumer>
// );

// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

// const App = () => (
//   <Elements stripe={stripePromise}>
//     <InjectedCheckoutForm />
//   </Elements>
// );

