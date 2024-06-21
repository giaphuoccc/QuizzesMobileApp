import {StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, Alert} from "react-native"
import { Icon, TextInput } from "react-native-paper"

import * as Progress from 'react-native-progress';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import React, {useState} from 'react'
import IconIonicons from 'react-native-vector-icons/Ionicons';

    
const ArrangeSentence = ({navigation}) => {
    const [getIsSubmit, setIsSubmit] = useState(false)
    const correctAnswer = "I love to eat ice-cream"
    const [getQuestionText, setQuestionText] = useState("Tôi thích ăn kem.");
    const [getAnswerText, setAnswerText] = useState("");
    
    const [getNextButtonText, setNextButtonText] = useState("Xong")
    const wordArray = ["a","moon","eat","love","I","ice-cream","me","to"]
    const selectedFColor = "#00A3FF"
    const selectedBGColor = "#B6E9FF"
    const selectedBColor = "#00A3FF"
    const correctBGColor = "#81F53A"
    const wrongBGColor = "#FF4848"
    const initOpacityArray = []
    const initDisabledArray = []
    const initSelectedArray = []
    for (let index = 0; index < 8; index++) {
        initOpacityArray.push(1)
        initDisabledArray.push(false)
        initSelectedArray.push(false)
    }
    const [disabledArray, setDisabledArray] = useState(initDisabledArray);
    const [opacityArray, setOpacityArray] = useState(initOpacityArray);
    const [selectedArray, setSelectArray] = useState(initSelectedArray);
    const onPressReset = ()=>{
        setAnswerText("")
        setSelectArray(initSelectedArray)
        setOpacityArray(initOpacityArray);
        setDisabledArray(initDisabledArray);
    }
    const initAnswers = (e,i) => {
        return <TouchableOpacity 
            key={i}
            style={[styles.answerBtn ,{
                opacity: opacityArray[i],
                backgroundColor: selectedArray[i] ? selectedBGColor : 'white',
                borderColor: selectedArray[i] ? selectedBColor : 'black',
            }]} 
            disabled ={disabledArray[i]} 
            onPress={()=>{onPressWord(i)}}>
            <Text style={[styles.answerBtnText,{color:  selectedArray[i] ? selectedFColor : 'black'}]}>{e}</Text>
        </TouchableOpacity> 
    }
    const onPressWord=(index)=>{
        setAnswerText(getAnswerText + " "+ wordArray[index])
        const newSelectedeArray = selectedArray.map((e, i) => {
            if (i === index) {
                return true;
            } else {
                return e;
            }
        });
        setSelectArray(newSelectedeArray);
        const newDisableArray = disabledArray.map((e, i) => {
            if (i === index) {
                return true;
            } else {
                return e;
            }
        });
        setDisabledArray(newDisableArray);
        const newOpacityArray = opacityArray.map((e, i) => {
            if (i === index) {
                return 0.5;
            } else {
                return e;
            }
        });
        setOpacityArray(newOpacityArray);
        
    }
    const submit = ()=>{
        if(getAnswerText !== ""){
          if(!getIsSubmit){
            const newDisableArray = disabledArray.map((e, i) => {
                    return true;
            });
            setDisabledArray(newDisableArray);
            const newOpacityArray = opacityArray.map((e, i) => {
                return 0.5
            });
            setOpacityArray(newOpacityArray);
            setIsSubmit(true)
            if(correctAnswer === getAnswerText){
                //success
                Alert.alert("Bạn làm đúng r nè.")
            }else{
                //fail
                Alert.alert("Bạn làm sai r nè. lêu lêu")
            }
            setNextButtonText("Câu tiếp theo")
          }else{
            navigation.navigate("PairWord")
          }
        }else{
          //error
          Alert.alert("Bạn chưa chọn đáp án nào.")
        }
    }
    return(
        <View style={styles.container}>
      <View style={styles.heading}>
        <View style={{width: "10%", height: "100%", justifyContent: 'center',}}>
          <TouchableOpacity style={[styles.buttonClose] }>
            <IconFontisto name="close-a" style={{ fontSize: 36}} color="black" 
              onPress={()=> navigation.navigate('HomeScreen')}/>
          </TouchableOpacity> 
        </View>
        <Progress.Bar
          progress={0.9}
          unfilledColor="black"
          borderRadius={200}
          borderColor="#086CA4"
          height={1000}
          width={380}
          color="#CFFF0F"
          style={styles.processBar}
        />
      </View>
      <View style = {styles.body}>
        <Text style={styles.title}>Hoàn tất ghép câu.</Text>
        <View style={styles.questionGroup}>
            <Image source={require('../Assets/Images/man.png')} style={styles.imgMan}></Image>
            <View style={styles.chatBox}>
                <ImageBackground source={require('../Assets/Images/speech-bubble.png')} resizeMode="contain" style={styles.imgChatBox}>
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
                    {wordArray.slice(0,wordArray.length / 2).map((e,i)=>(
                        initAnswers(e,i)
                    ))}
                </View>
                <View style={styles.wordSelection}>
                    {wordArray.slice(wordArray.length / 2).map((e,i)=>(
                        initAnswers(e,i + wordArray.length / 2)
                    ))}
                </View>
            </View>
        </View>
        
        
      </View>
      <View style = {styles.footer}>
        <TouchableOpacity style={styles.buttonNext } onPress={()=>{submit()}}>
          <Text style={styles.textButtonNext}>{getNextButtonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    
)}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#086CA4',
        width: '100%',
        height: '100%',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
      },
      heading: {
        flexDirection: 'row',
        height: '5%',
        width: '100%',
        justifyContent: 'space-between',
      },
      buttonClose: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 40,
      },
      body: {
        marginVertical: '5%',
        height: '80%',
      },
      footer: {
        backgroundColor: 'white',
        width: '100%',
        height: '10%',
        borderRadius: 20,
      },
      buttonNext: {
        height: '100%',
        justifyContent: 'center',
      },
      textButtonNext: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
      },
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
        height: '85%',
    },
    imgChatBox:{
        flex: 1,
        width: '102.5%',
    },
    chatBoxContent:{
        marginLeft: '10%',
        marginTop: '7%',
        height: 130,
        textAlign: 'left',
        color: 'black',
        fontSize: 18,
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