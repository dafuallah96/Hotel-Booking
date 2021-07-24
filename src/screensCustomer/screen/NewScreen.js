import React, { Component } from 'react';
import { Alert, StyleSheet, AsyncStorage as storage }  from 'react-native';
import { Container, Content, Header, Left, Body, Title, Subtitle, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker, View, DatePicker } from 'native-base';
import { addService } from '../../publics/services/DataService';
import { Database, Auth } from '../../publics/configs/db'
import { addTransaction } from '../../publics/services/DataService';

 
export default class NewScreenCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    service_description: null,
    service_name: null,
    service_type: null,
    service_price: null,
    fullname: props.navigation.state.params.fullname,
    _id: props.navigation.state.params.userid,
    };

    // this.setTravelDate = this.setTravelDate.bind(this)
    // this.setSummonTime = this.setSummonTime.bind(this)
  }
  
  componentDidMount() {
    console.log(this.state.fullname)
}


  setServiceType= (value) => {
    this.setState({ service_type: value });
  }

  setServiceName = (value) =>{
    this.setState({ service_name: value });
  }

  setServicePrice = (value) =>{
    this.setState({ service_price: value });
  }

  setDescription = (value) => {
    this.setState({ service_description: value });
  }

  saveData = () => {
    if(this.state.service_type && this.state.service_name && this.state.service_price && this.state.service_description){
      if(!(this.state.service_type)){
        Alert.alert('Status','Invalid Service Type!');
      }
      else{
        addService(this.state.service_type, this.state.service_name, this.state.service_price, this.state.service_description, this.state._id, this.state.fullname);
      }
    } else{
       Alert.alert('Status','Empty Field(s)!');
    }
  }


  render() {
    const { fullname, avatar } = this.state
    console.warn('fullname: ', fullname)
    return (
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Add your services</Text>
        <Form>
        <Item fixedLabel last>
              <Label>Service Type</Label>
              <Input onChangeText={this.setServiceType} />
        </Item>
        <Item fixedLabel last>
              <Label>Service Name</Label>
              <Input onChangeText={this.setServiceName} />
        </Item>
        <Item fixedLabel last>
              <Label>Price in MYR</Label>
              <Input onChangeText={this.setServicePrice} />
        </Item>
        <Item fixedLabel last>
              <Label>Description</Label>
              <Input onChangeText={this.setDescription} />
        </Item>
        </Form>

          <Button block last style={{marginTop: 50}} onPress={this.saveData}>
            <Text style={{fontWeight: "bold"}}>Add</Text>
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
