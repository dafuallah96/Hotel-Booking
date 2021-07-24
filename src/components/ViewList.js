import React, { Component } from 'react';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class ViewList extends Component {

  static propTypes = {
      clients: PropTypes.array.isRequired
  };

   onPress = (service_name) => {
    this.props.onPress(service_name);
  }

  onLongPress = (service_name) => {
    this.props.onLongPress(service_name);
  }

  render() {
    return(
      this.props.clients.map((data, index) => {
        return(
          <ListItem key={index} onPress={() => this.onPress(data.service_name)}>
          <Left>
          <Text>{data.service_name}</Text>
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