import React, { Component } from 'react'
import { Text, View, ActivityIndicator, AsyncStorage as storage, StyleSheet } from 'react-native'

export class AuthLoadingCustomer extends Component {
    constructor(props) {
        super(props)

        this._handleAuth()
    }

    _handleAuth = async () => {
        const uid = await storage.getItem('userid')

        this.props.navigation.navigate(uid ? 'App1' : 'Auth1')
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={"red"} />
                <Text>Loading...</Text>
            </View>
        )
    }
}

export default AuthLoadingCustomer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})