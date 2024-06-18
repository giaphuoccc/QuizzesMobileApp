import {StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity} from "react-native"
import { Icon, TextInput } from "react-native-paper"
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors"
import React, {useState} from 'react'
import IconIonicons from 'react-native-vector-icons/Ionicons';

    
const ArrangeSentence = (navigation) => {
    const [getQuestionText, setQuestionText] = useState("Tôi thích ăn kem.");
    const [getAnswerText, setAnswerText] = useState("");
    const wordArray = ["a","moon","eat","love","I","ice-cream","me","to"]
    const initOpacityArray = []
    const initDisabledArray = []
    for (let index = 0; index < 8; index++) {
        initOpacityArray.push(1)
        initDisabledArray.push(false)
    }
    const [disabledArray, setDisabledArray] = useState(initDisabledArray);
    const [opacityArray, setOpacityArray] = useState(initOpacityArray);
    const onPressReset = ()=>{
        setAnswerText("")
        setOpacityArray(initOpacityArray);
        setDisabledArray(initDisabledArray);
    }
    const onPressWord=(index)=>{
        setAnswerText(getAnswerText + " "+ wordArray[index])
        const nextDisable = disabledArray.map((e, i) => {
            if (i === index) {
                return true;
            } else {
                return e;
            }
        });
        setDisabledArray(nextDisable);
        const nextOpacity = opacityArray.map((e, i) => {
            if (i === index) {
                return 0.5;
            } else {
                return e;
            }
        });
        setOpacityArray(nextOpacity);
    }
    return(
    <View >
        <Text style={styles.title}>Hoàn tất ghép câu.</Text>
        <View style={styles.questionGroup}>
            <Image source={require('../Assets/Images/man.png')} style={styles.imgMan}></Image>
            <View style={styles.chatBox}>
                <ImageBackground source={require('../Assets/Images/speech-bubble.png')} resizeMode="cover" style={styles.imgChatBox}>
                    <Text style={styles.chatBoxContent}>{getQuestionText}</Text>
                </ImageBackground>
            </View>
        </View>
        <View style={styles.answerGroup}>
            <View style={styles.answerHeader}>
                <View style={styles.sentenceHolder}>
                    <Text style={styles.sentenceHolderText}>{getAnswerText} </Text>
                </View>
                <IconIonicons name="reload" style={{ fontSize: 36}} color="black" 
                        onPress={()=> {onPressReset()}}/>
            </View>
            <View style={styles.answerFooter}>
                <View style={styles.wordSelection}>
                    <TouchableOpacity style={[styles.answerBtn ,{opacity: opacityArray[0]}]} disabled ={disabledArray[0]} onPress={()=>{onPressWord(0)}}>
                        <Text style={styles.answerBtnText}>{wordArray[0]}</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity  style={[styles.answerBtn ,{opacity: opacityArray[1]}]} disabled ={disabledArray[1]} onPress={()=>{onPressWord(1)}}>
                        <Text style={styles.answerBtnText} >{wordArray[1]}</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity  style={[styles.answerBtn ,{opacity: opacityArray[2]}]} disabled ={disabledArray[2]} onPress={()=>{onPressWord(2)}}>
                        <Text style={styles.answerBtnText}>{wordArray[2]}</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity  style={[styles.answerBtn ,{opacity: opacityArray[3]}]} disabled ={disabledArray[3]} onPress={()=>{onPressWord(3)}}>
                        <Text style={styles.answerBtnText}>{wordArray[3]}</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.wordSelection}>
                    <TouchableOpacity  style={[styles.answerBtn ,{opacity: opacityArray[4]}]} disabled ={disabledArray[4]} onPress={()=>{onPressWord(4)}}>
                        <Text style={styles.answerBtnText}>{wordArray[4]}</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity  style={[styles.answerBtn ,{opacity: opacityArray[5]}]} disabled ={disabledArray[5]} onPress={()=>{onPressWord(5)}}>
                        <Text style={styles.answerBtnText}>{wordArray[5]}</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity  style={[styles.answerBtn ,{opacity: opacityArray[6]}]} disabled ={disabledArray[6]} onPress={()=>{onPressWord(6)}}>
                        <Text style={styles.answerBtnText}>{wordArray[6]}</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity  style={[styles.answerBtn ,{opacity: opacityArray[7]}]} disabled ={disabledArray[7]} onPress={()=>{onPressWord(7)}}>
                        <Text style={styles.answerBtnText}>{wordArray[7]}</Text>
                </TouchableOpacity> 
                </View>
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
    answerHeader:{
        // backgroundColor: 'blue',
        width: '100%',
        height: '40%',
        flexDirection: 'row'
    },
    sentenceHolder:{
        // backgroundColor: 'red',
        width: '90%',
        height: '100%',
    },
    sentenceHolderText:{
        color: 'black',
        fontSize: 26,
    },
    
    answerFooter:{
        width: '100%',
        height: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wordSelection:{
        width: '47.5%',
        height: '100%',
        justifyContent: 'space-between'
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
export default ArrangeSentence