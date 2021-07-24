import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, StatusBar } from 'react-native'

export default class Splash extends Component {
    render() {
        return (
            <>
                <StatusBar translucent={true} hidden />
                <View style={styles.container}>
                <Image  style={{width: 150,height:160}} source={require('../login/logo.png')} />
                    <Text style={styles.title}>Hotel Booking System</Text>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center',
        width: '100%'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.7
    },
    container: {
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})