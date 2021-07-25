import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class TransactionList extends Component {

  static propTypes = {
      clients: PropTypes.array.isRequired
  };

   onPress = (token) => {
    this.props.onPress(token);
  }

  onLongPress = (token) => {
    this.props.onLongPress(token);
  }

  render() {
    return(
      this.props.clients.map((data, index) => {
        return(
          <ListItem key={index} onPress={() => this.onPress(data.token)}>
          <Left class="row-span-3">
              <Text>{data.service_name}</Text>
            </Left>
          <Left class="row-span-3">
              <Text>{data.email}</Text>
          </Left>
          <Left class="row-span-3">
              <Text>{data.time}</Text>
          </Left>
          <Right>
          <Icon name="arrow-forward" />
          </Right>
          </ListItem>
        )
      })
    )
  }
}

const styles = StyleSheet.create({
})
