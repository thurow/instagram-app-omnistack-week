import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import api from '../services/api'
import camera from '../assets/camera.png'

export default class Feed extends Component {

    state = {
        feed: []
    }

    async componentDidMount() {
        // this.registerToSocket()

        const response = await api.get('posts')

        this.setState({ feed: response.data })
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New')}>
                <Image source={camera} />
            </TouchableOpacity>
        )
    })

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.feed}
                    keyExtractor={post => post._id}
                    renderItem={({ item }) => (
                        <Text>{item.author}</Text>
                    )}
                />
            </View>
        )
    }
}
