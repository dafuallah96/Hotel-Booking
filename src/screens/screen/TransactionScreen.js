import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Alert, AsyncStorage as storage} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker } from 'native-base';
import { Database, Auth } from '../../publics/configs/db';

export default class TransactionScreen extends Component {
  constructor(props){
   super(props);
   console.log(this.props)
   this.state = {
    clients: [],
     destination: null,
     userid: props.navigation.state.params.uid,
     uniqueid: props.navigation.state.params.token,
     token: null,
     tokenCard: null,
     remarks: null,
     service_name: null,
     price: null,
     time: null,
     service_name: null,
     service_type: null,
     email: null,
     success: null,
     id: null
   }
  }


  async componentDidMount() {
    console.log(this.state.uniqueid)
    console.log(this.state.userid)


    let a = this.state.uniqueid;
    let query = Database.ref('/transactions/'+ this.state.userid).orderByChild("token").equalTo(this.state.uniqueid);
    console.log(query)
      query.once('value', (snapshot) => {
      let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({clients: firebaseData},()=>{
              this.state.clients.map((element) => {
                this.setState({
                  
                  email: element.email,
                  price: element.price,
                  time: element.time,
                  service_name: element.service_name,
                  service_type: element.service_type,
                  token: element.token,
                  tokenCard: element.tokenCard,
                  remarks: element.remarks,
                  success: element.success,
                  id: element._id
                });
              });
            });
          }
     });
  };


  render() {
    const {user} = this.state
    return (
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Transaction Details</Text>
        <Form>
        <Item fixedLabel last>
        {/* <Text>{JSON.stringify(this.props)}</Text> */}
              <Label>Serivce Type</Label>
              <Input value={this.state.service_type} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Name</Label>
              <Input value={this.state.service_name} />
        </Item>
        <Item fixedLabel last>
              <Label>Email</Label>
              <Input value={this.state.email} />
        </Item>
        <Item fixedLabel last>
              <Label>Payment</Label>
              <Input value={"RM " + this.state.price} />
        </Item>
        <Item fixedLabel last>
              <Label>Payment Success</Label>
              <Input value= {"Status: " + this.state.success} />
        </Item>
        <Item fixedLabel last>
              <Label>Token</Label>
              <Input value={this.state.token} />
            </Item>
          <Item fixedLabel last>
              <Label>Remarks</Label>
              <Input value={this.state.remarks} />
        </Item>
        <Item fixedLabel last>
              <Label>Time Stamp</Label>
              <Input value={this.state.time} />
        </Item>
        </Form>

          {/* <Button block last style={{marginTop: 50}} onPress={this.updateData}>
            <Text style={{fontWeight: "bold"}}>Update</Text>
          </Button>  */}
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

