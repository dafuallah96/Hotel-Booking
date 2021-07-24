import React, { Component } from 'react'
import { Text, View, AsyncStorage as storage } from 'react-native'
import { Thumbnail, Row, Col, Icon, Button } from 'native-base'
import Modal from "react-native-modal"
import { withNavigation } from 'react-navigation'

class ModalProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userDetail: this.props.data,
            uid: ''
        }

        storage.getItem('userid', (err, result) => {
            if (result) {
                this.setState({
                    uid: result
                })
            }
        })
    }
    render() {
        console.warn("detail modal user: ", this.props.data)
        return (
            <Modal isVisible={this.props.isVisible} animationIn='tada' animationInTiming={1000} animationOut='fadeOutDown'
                animationOutTiming={800} backdropOpacity={0.2}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    height: 150,
                    elevation: 10
                }} >
                    <Thumbnail
                        source={{ uri: this.props.data.avatar }}
                        large
                        resizeMode='center'
                    />
                    <Text>{this.props.data.fullname}</Text>
                    <Text>{this.props.data.location}</Text>
                    <Row style={{ marginTop: 10 }}>
                        {
                            this.state.uid === this.props.data.id ?
                                <>
                                    <Col><Button transparent onPress={this.props.onClose}><Text style={{ textAlign: 'center', width: '100%' }}><Icon name="ios-close-circle" type='Ionicons' /></Text></Button></Col>
                                </>
                                :
                                <>
                                    <Col><Button transparent><Text style={{ textAlign: 'center', width: '100%' }} onPress={this.props.onClose
                                    }><Icon name="ios-chatbubbles" type='Ionicons' /></Text></Button></Col>
                                    <Col><Button transparent onPress={this.props.onClose}><Text style={{ textAlign: 'center', width: '100%' }}><Icon name="person" type='Ionicons' /></Text></Button></Col>
                                    <Col><Button transparent onPress={this.props.onClose}><Text style={{ textAlign: 'center', width: '100%' }}><Icon name="ios-close-circle" type='Ionicons' /></Text></Button></Col>
                                </>
                        }
                    </Row>
                </View>
            </Modal>
        )
    }
}
export default withNavigation(ModalProfile)