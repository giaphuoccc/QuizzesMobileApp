import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <View style={{ height: '100%', flexDirection: 'column' }}>
            <View style={[styles.topic]}>
                <View style={[styles.topicText]}>
                    <Text style={[styles.topicName]}>homeScreen</Text>
                </View>
                
            </View>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    topic:{
        flex: 1,
        backgroundColor:"#2C3C67"

    }
})