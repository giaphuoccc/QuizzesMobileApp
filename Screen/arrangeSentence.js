import {StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity} from "react-native"
import { Icon, TextInput } from "react-native-paper"
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors"
import IconIonicons from 'react-native-vector-icons/Ionicons';
const ArragaSentence = (navigation) => {return(
    <View >
        <Text style={styles.title}>Hoàn tất ghép câu.</Text>
        <View style={styles.questionGroup}>
            <Image source={require('../Assets/Images/man.png')} style={styles.imgMan}></Image>
            <View style={styles.chatBox}>
                <ImageBackground source={require('../Assets/Images/speech-bubble.png')} resizeMode="cover" style={styles.imgChatBox}>
                    <Text style={styles.chatBoxContent}>Last night, i got _____ heart attack. Then i die the next morning.</Text>
                </ImageBackground>
            </View>
        </View>
        <View style={styles.answerGroup}>
        <IconIonicons name="reload" 
                          style={{ fontSize: 36}} 
                          color="black" 
                          onPress={()=> navigation.navigate('QuizHolderScreen')}/>
            <View style={styles.sentenceHolder}>
                <Text style={styles.sentenceHolderText}>A new day of life</Text>
            </View>
            <View style={styles.wordSelection}>
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>a</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>an</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>the</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>once</Text>
            </TouchableOpacity> 
            </View>
        </View>
        
        
    </View>
)}
const styles = StyleSheet.create({
    title:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        height: 40,
    },
    questionGroup:{
        marginTop: 20,
        paddingLeft: 20,
        height: '35%',
        width: '100%',
        flexDirection: 'row',
    },
    imgMan:{
        flex: 3,
        height: '100%',
        alignSelf: 'flex-end'
    },
    chatBox:{
        flex: 7,
        height: '60%',
        // backgroundColor: 'red',
    },
    imgChatBox:{
        flex: 1,
        width: '102.5%',
        justifyContent: 'center',
        // backgroundColor: 'green',
    },
    chatBoxContent:{
        marginLeft: '17%',
        marginRight: '7%',
        paddingTop: 5,
        height: 100,
        textAlign: 'left',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
    },



    answerGroup:{
        padding: '5%',
        height: '55%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,

    },
    sentenceHolder:{
        backgroundColor: 'red',
        width: '100%',
        height: '40%',
    },
    sentenceHolderText:{
        color: 'black',
        fontSize: 26,
    },
    answerBtn:{
        backgroundColor: "white",
        borderColor: 'black',
        borderWidth: 1.5,
        height: '20%',
        justifyContent: 'center',
        borderRadius: 20
    },
    answerBtnText:{
        alignSelf: 'center',
        color: 'black',
        fontSize: 26
    },
    
})
export default ArragaSentence