import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Octicons';


const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ height: '100%', flexDirection: 'column' }}>
            <View style={[styles.topic]}>
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
                <View style={[styles.iconContainer_16_1]}>
                    <TouchableOpacity style={[styles.iconBackground_1]} onPress={() => navigation.navigate("QuizHolderScreen")}>
                        <Icon name="check-circle-fill" style={[styles.icon]} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.layout]}>
                    <ImageBackground resizeMode="contain" style={[styles.image]} source={require('../Assets/Images/man.png')} />
                    <View style={[styles.iconLayout]}>
                        <View style={[styles.iconContainer_25_1]}>
                            <TouchableOpacity style={[styles.iconBackground_2]}>
                                <Icon name="feed-star" style={[styles.icon]} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.iconContainer_34_1]}>
                            <View style={[styles.iconContainer]}>
                                <TouchableOpacity style={[styles.iconBackground_34]}>
                                    <Icon name="x-circle-fill" style={[styles.icon]} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.iconContainer]}>
                                <TouchableOpacity style={[styles.iconBackground_34]}>
                                    <Icon name="x-circle-fill" style={[styles.icon]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.iconContainer_25_1]}>
                            <TouchableOpacity style={[styles.iconBackground_5]}>
                                <Icon name="x-circle-fill" style={[styles.icon]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.iconContainer_16_1]}>
                    <TouchableOpacity style={[styles.iconBackground_6]}>
                        <Icon name="x-circle-fill" style={[styles.icon]} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={[styles.topic]}>
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
                <View style={[styles.iconContainer_16_2]}>
                    <TouchableOpacity style={[styles.iconBackground_1]} onPress={() => navigation.navigate("QuizHolderScreen")}>
                        <Icon name="check-circle-fill" style={[styles.icon]} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.layout]}>
                    <View style={[styles.iconLayout]}>
                        <View style={[styles.iconContainer_25_2]}>
                            <TouchableOpacity style={[styles.iconBackground_2]}>
                                <Icon name="feed-star" style={[styles.icon]} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.iconContainer_34_2]}>
                            <View style={[styles.iconContainer]}>
                                <TouchableOpacity style={[styles.iconBackground_34]}>
                                    <Icon name="x-circle-fill" style={[styles.icon]} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.iconContainer]}>
                                <TouchableOpacity style={[styles.iconBackground_34]}>
                                    <Icon name="x-circle-fill" style={[styles.icon]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.iconContainer_25_2]}>
                            <TouchableOpacity style={[styles.iconBackground_5]}>
                                <Icon name="x-circle-fill" style={[styles.icon]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ImageBackground resizeMode="contain" style={[styles.image_2]} source={require('../Assets/Images/man.png')} />
                </View>
                <View style={[styles.iconContainer_16_2]}>
                    <TouchableOpacity style={[styles.iconBackground_6]}>
                        <Icon name="x-circle-fill" style={[styles.icon]} />
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    topic: {
        flex: 1,
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
        flex: 5,
        backgroundColor: '#2E4583',
        paddingHorizontal: '10%',
        paddingVertical:'5%'

    },
    iconContainer_16_1: {
        width:'55%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconContainer_25_1: {
        width:'20%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconContainer_16_2: {
        width:'65%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconContainer_25_2: {
        width:'45%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'red'
    },
    iconContainer_34_1: {
        flex: 2,
        width:'55%',
        flexDirection:'column',
        // backgroundColor: 'red',
        justifyContent:'center',
        alignSelf: 'flex-end',  
    },
    iconContainer_34_2: {
        flex: 2,
        width:'60%',
        flexDirection:'column',
        // backgroundColor: 'red',
        justifyContent:'center',
        alignSelf: 'flex-start',  
    },
    iconBackground_1:
    {
        backgroundColor: 'green',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBackground_2:
    {
        backgroundColor: 'yellow',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBackground_34:
    {
        backgroundColor: 'red',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBackground_5:
    {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    iconBackground_6:
    {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 85,
        color: 'white',
    },
    icon_1: {
        flex: 1,
        fontSize: 100,
        color: '#61FF00',
    },
    icon_2: {

    },
    layout: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        flex: 2,
        height: 200,
        width: 200,
        // backgroundColor:'red'
    },
    image_2: {
        flex: 1.5,
        height: 200,
        width: 200,
        transform: 'scaleX(-1);'
    },
    iconLayout: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    NavBar: {
        flex: 1
    }

})