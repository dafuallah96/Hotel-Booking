import React, { Component } from 'react'
import { FlatList, AsyncStorage as storage } from 'react-native'
import { Text, Left, Body, List, ListItem, Thumbnail, Right, StyleSheet } from 'native-base';
import { Database } from '../publics/configs/db';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native';

export class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            data: [],
            userid: ''

        }
    }

    componentWillMount = async () => {
        storage.getItem('id', (err, result) => {
            if (result) {
                this.setState({ userid: result })
            }
        })

        let dbref = Database.ref('/user')
        let userid = await storage.getItem('userid')
        dbref.on('child_added', (val) => {
            let person = val.val()
            console.warn("person", person.id)
            console.warn("email", userid)
            if (person.id === userid) {
                userid = person.id
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
        
    }

    _renderItem = ({ item }) => {
        const {userid} = this.state

        return (

            <List key={item.id}>
                <ListItem avatar>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('ProfileFriend', { data: item })}>
                        <Left>
                            <Thumbnail source={{ uri: item.avatar }} />
                        </Left>
                    </TouchableOpacity>
                    <Body>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Chat', { data: item, userid })}>
                            <Text>{item.fullname}</Text>
                            <Text note>{item.status}</Text>
                        </TouchableOpacity>
                    </Body>
                    <Right>
                        {/* <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Chat', { data: item })}>
                            <Text>{item.fullname}</Text>
                            <Text note>{item.status}</Text>
                        </TouchableOpacity> */}
                    </Right>
                </ListItem>
            </List>
        )
    }


    render() {
        console.warn("list user: ", this.state.users)
        return (
            <FlatList
                data={this.state.users}
                renderItem={this._renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        )
    }

}


export default withNavigation(UserList)
