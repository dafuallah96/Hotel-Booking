import React, { Component } from 'react';
import { Alert, StyleSheet, AsyncStorage as storage }  from 'react-native';
import { Container, Content, Header, Left, Body, Title, Subtitle, Footer, Textarea, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker, View, DatePicker } from 'native-base';
import { addService } from '../../publics/services/DataService';
import { Database, Auth } from '../../publics/configs/db'
 
export default class NewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    service_description: null,
    service_name: null,
    service_type: null,
    service_price: null,
    totprice: null,
    type0: null,
    type1: null,
    type2: null,
    type3: null,
    type4: null,
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

  setItem = (value) => {
    this.setState({ item: value });
  }

  setButton = () => {
    this.setState({ type0: "1" });
  }

  setItem1 = (value) => {
    this.setState({ item1: value });
  }
  setItem2 = (value) => {
    this.setState({ item2: "3" });
  }
  setItem3 = (value) => {
    this.setState({ item3: "4" });
  }

  setItem4 = (value) => {
    this.setState({ item4: "5" });
  }

  saveData = () => {
    const re = /^[0-9\b]+$/; //rules
    if(this.state.service_type && this.state.service_name && this.state.service_price && this.state.service_description){
      if (this.state.service_type === null || !re.test(this.state.service_price)) {
        Alert.alert('Status','Invalid Service Type or Price!');
      }
      else{
        var ttprice = Number(this.state.item) + Number(this.state.item1);
        var totprice = '' + ttprice;
        addService(this.state.service_type, this.state.service_name, this.state.service_price, this.state.service_description, this.state._id, this.state.fullname, this.state.item, this.state.item1, this.state.totprice);
        Alert.alert('Status','Record added');
        this.props.navigation.navigate('ListScreen');
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
              {/* <Label>Service Type</Label> */}
              <Textarea onChangeText={this.setServiceType} row={5} placeholder="Service Type"/>
        </Item>
        <Item fixedLabel last>
              <Textarea onChangeText={this.setServiceName} row={5} placeholder="Service Name"/>
        </Item>
        <Item fixedLabel last>
              <Textarea keyboardType="numeric" onChangeText={this.setServicePrice} row={5} placeholder="Price in MYR" />
        </Item>
        <Item fixedLabel last>
              <Textarea onChangeText={this.setDescription}row={5} placeholder="Description" />
            </Item>
            
          {this.state.type0 === "1" ?
          <Item fixedLabel last>
              <Textarea onChangeText={this.setItem} row={5} placeholder="Item 1" />
              <Textarea onChangeText={this.setItem1} row={5} placeholder="Price (MYR)" />
              </Item>
                   : null}
          <Text></Text>
            {(this.state.type1 === "2")  ?
              <Item fixedLabel last>
                <Textarea onChangeText={this.setItem3} row={5} placeholder="Item2" />
                <Textarea onChangeText={this.setItem4} row={5} placeholder="Price (RM)" />
              </Item>
              : null}
            
           {this.state.type2 === "3"  ?
              <Item fixedLabel last>
              <Textarea onChangeText={this.setItem2} row={5} placeholder="Item3" />
              <Textarea onChangeText={this.setItem2} row={5} placeholder="Price (RM)" />
            </Item>
              : null}
            
                       {this.state.type3 === "4"  ?
            <Item fixedLabel last hidden>
              <Textarea onChangeText={this.setItem3} row={5} placeholder="Item4" />
              <Textarea onChangeText={this.setItem2} row={5} placeholder="Price (RM)" />
            </Item>
              : null}
            
                         {this.state.type4 === "5"  ?
                      <Item fixedLabel last>
              <Textarea onChangeText={this.setItem4} row={5} placeholder="Item5" />
              <Textarea onChangeText={this.setItem2} row={5} placeholder="Price (RM)" />
              </Item>
                   : null}
          </Form>
          
          <Button block last style={{}} onPress={this.setButton}>
            <Text style={{fontWeight: "bold"}}>Add Item</Text>
          </Button>

          <Button block last style={{marginTop: 50}} onPress={this.saveData}>
            <Text style={{fontWeight: "bold"}}>Add</Text>
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
