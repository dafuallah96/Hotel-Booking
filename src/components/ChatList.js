import React, { Component } from 'react'
import { FlatList, AsyncStorage as storage, View } from 'react-native'
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Thumbnail, List, ListItem, Body, Left, Button, Text } from 'native-base'
import { withNavigation } from 'react-navigation'

export class ChatList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chat: [],
            users: [],
            data: [],
            userid: ''
        }
    }

    componentWillMount = async () => {
        const userid = await storage.getItem('userid')
        this.setState({ userid })

        firebase.database().ref('messages/' + this.state.userid).on('child_added', (data) => {
            let person = data.val()

            person.id = data.key
            this.state.chat.push({
                id: person.id
            })
            this.setState({ chat: this.state.chat })
        })

        firebase.database().ref('user/').on('value', (result) => {
            let data = result.val()
            if (data !== null) {
                let users = Object.values(data)
                this.setState({
                    users
                })
            }
        })

    }

    _renderItem = ({ item }) => {
        return (
            <>
                {
                    item && item.length > 0
                        ?

                        <View
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 0, }}>
                        </View>
                        :
                        <TouchableOpacity key={item.id}>
                            <List>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: item.avatar }} />
                                    </Left>
                                    <Body>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Chat', { data: item })}>
                                            <Text>{item.fullname}</Text>
                                            <Text note>This some last messages</Text>
                                        </TouchableOpacity>
                                    </Body>
                                </ListItem>
                            </List>
                        </TouchableOpacity>
                }
            </>
        )
    }

    render() {
        const { users, chat, data } = this.state
        chat.forEach((item, key) => {
            data[key] = users.find((itm) => itm.id === item.id)
        })
        console.warn("chat list: ", chat)
        return (
            <>
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={this._renderItem}
                />
            </>
        )
    }
}

export default withNavigation(ChatList)
