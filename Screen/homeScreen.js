import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Octicons';


const HomeScreen = () => {
    return (
        <View style={{ height: '100%', flexDirection: 'column' }}>
            {/* <View style={[styles.topic]}>
                <View style={[styles.topicContainer]}>
                    <View style={[styles.topicText]}>
                        <Text style={[styles.topicName]}>Chapter I</Text>
                        <Text style={[styles.topicDescription]}>Music</Text>
                    </View>
                    <View style={[styles.progessIndicator]}>
                        <Progress.Bar
                            progress={0.9}
                            unfilledColor="black"
                            borderRadius={200}
                            borderColor="#086CA4"
                            color="#CFFF0F"
                            height={1000}
                            style={styles.processBar} />
                        <Text style={[styles.indicator]}>80%</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.content]} >
                <Icon name="check-circle-fill" style={[styles.icon_1]} />
                <View style={[styles.layout]}>
                    <ImageBackground style={[styles.image]} source={require('../Assets/Images/turtle.png')} />
                    <View style={[styles.iconLayout]}>
                        <Icon name="feed-star" style={[styles.icon_2]} />
                        <Icon name="x-circle-fill" style={[styles.icon_34]} />
                        <Icon name="x-circle-fill" style={[styles.icon_34]} />
                        <Icon name="feed-star" style={[styles.icon_5]} />
                    </View>
                </View>
                <Icon name="check-circle-fill" style={[styles.icon_6]} />
            </View> */}
            <View style={[styles.topic]}>
                <View style={[styles.topicContainer]}>
                    <View style={[styles.topicText]}>
                        <Text style={[styles.topicName]}>Chapter II</Text>
                        <Text style={[styles.topicDescription]}>School</Text>
                    </View>
                    <View style={[styles.progessIndicator]}>
                        <Progress.Bar
                            progress={0.5}
                            unfilledColor="black"
                            borderRadius={200}
                            borderColor="#086CA4"
                            color="#CFFF0F"
                            height={1000}
                            style={styles.processBar} />
                        <Text style={[styles.indicator]}>50%</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.content]} >
                <Icon name="check-circle-fill" style={[styles.icon_1]} />
                <View style={[styles.layout]}>
                    <View style={[styles.iconLayout]}>
                        <Icon name="feed-star" style={[styles.icon_2]} />
                        <Icon name="x-circle-fill" style={[styles.icon_34_2]} />
                        <Icon name="x-circle-fill" style={[styles.icon_34_2]} />
                        <Icon name="feed-star" style={[styles.icon_5]} />
                    </View>
                    <ImageBackground style={[styles.image_2]} source={require('../Assets/Images/turtle.png')} />
                </View>
                <Icon name="check-circle-fill" style={[styles.icon_6]} />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    topic: {
        flex: 2,
        backgroundColor: '#2C3C67',
    },
    topicContainer: {
        flexDirection: 'row',
        flex: 2
    },
    topicText: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    topicName: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: 'bold'
    },
    topicDescription: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    progessIndicator: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    processBar: {
        height: '15%',
    },
    indicator: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: 'bold'
    },
    content: {
        flex: 12,
        backgroundColor: '#2E4583',
        paddingHorizontal: '5%'
    },
    icon_1: {
        flex: 1,
        fontSize: 100,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#61FF00'
    },
    icon_2: {
        flex: 2,
        fontSize: 100,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'yellow',
    },
    layout: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        flex: 1.5,
        height: 200,
        width: 350,
        // backgroundColor:'red'
    },
    image_2:{
        flex: 1.5,
        height: 200,
        width: 350,
        transform:'scaleX(-1);'
    },
    iconLayout: {
        flex: 2,
    },
    icon_34: {
        flex: 2,
        fontSize: 100,
        textAlignVertical: 'center',
        textAlign: 'right',
        color: 'red',
    },
    icon_34_2:{
        flex: 2,
        fontSize: 100,
        textAlignVertical: 'center',
        textAlign: 'left',
        color: 'red',
    },
    icon_5: {
        flex: 2,
        fontSize: 100,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#EEEEEE',
    },
    icon_6: {
        flex: 1,
        fontSize: 100,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    NavBar: {
        flex: 1
    }

})