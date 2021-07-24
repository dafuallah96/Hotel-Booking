import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Alert, AsyncStorage as storage} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, CheckBox, ListItem, Body, Item, Label, Input, Picker, Textarea } from 'native-base';
import { Database, Auth } from '../../publics/configs/db';
import stripe from 'tipsi-stripe';
import { addTransaction } from '../../publics/services/DataService';


let studentRef = Database.ref('/services');

export default class ViewScreenCustomer extends Component {
  constructor(props){
   super(props);
   console.log(this.props)
   this.state = {
    clients: [],
     destination: null,
     token: props.navigation.state.params.userid,
     service_name: props.navigation.state.params.travel_date,
     searchID: props.navigation.state.params.searchID,
     zero: '00',
     activity: null,
     fullname: props.navigation.state.params.fullname,
     email: props.navigation.state.params.email,
     description: null,
     user: null,
     item1: null,
     item_checked1: null,
     remarks: null,
     success: 'true'
   }
  }

  async componentDidMount() {
    console.log(this.state.token)
    console.log(this.state.service_name)
    console.log(this.state.email)



    console.log(this.state.token)
    let query = Database.ref('/services/' + this.state.searchID).orderByChild("service_name").equalTo(this.state.service_name);
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
                  id: element._id
                });
              });
            });
          }
     });
  };


  setDescription = (value) => {
    this.setState({ service_description: value });
  }

  setServiceName = (value) =>{
    this.setState({ service_name: value });
  }

  setPrice = (value) =>{
    this.setState({ service_price: value });
  }

  setRemarks = (value) => {
    this.setState({ remarks: value });
  }


  render() {
    const {user} = this.state
    const {stripe} = this.props;
    return (
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Service Details</Text>
        <Form>
        <Item fixedLabel last>
              <Label>Serivce Type</Label>
              <Input value={this.state.service_type} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Name</Label>
              <Input value={this.state.service_name} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Price</Label>
              <Input value={this.state.service_price} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Description</Label>
              <Input value={this.state.service_description} />
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
        </Form>

            <Button block onPress={() => this.props.navigation.navigate('CardFormScreenCustomer', {
            price: this.state.service_price + this.state.zero,
            userid: this.state.token,
            searchID: this.state.searchID,
            email: this.state.email,
            service_type: this.state.service_type,
            service_name: this.state.service_name,
            remarks: this.state.item1
                  })}>
                  <Text>Pay by Card</Text>
                </Button>
        
        </Content>
        <Footer>
          <FooterTab>
          <Button vertical onPress={() => this.props.navigation.navigate('ListScreenCustomer')}>
              <Icon name="list-box" />
              <Text>Back</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      );
  }
}

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

