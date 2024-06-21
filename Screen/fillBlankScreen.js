import { useState } from "react"
import {StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, Alert} from "react-native"
import * as Progress from 'react-native-progress';
import IconFontisto from 'react-native-vector-icons/Fontisto';


const FillBlank = ({navigation}) => {    
    const answerArray = ["a","an","on","in"]
    const question = "Last night, i got _____ heart attack. Then i die the next morning."
    const blank = question.slice(question.indexOf("_"),question.lastIndexOf("_"))
    const [getBlank, setBlank] = useState(blank)
    const correctAnswer = "a"
    const wrongAnswer = -1
    const [getSelectedAnswer, setSelectedAnswer] = useState(wrongAnswer)
    const selectedFColor = "#00A3FF"
    const selectedBGColor = "#B6E9FF"
    const selectedBColor = "#00A3FF"
    const correctBGColor = "#81F53A"
    const wrongBGColor = "#FF4848"
    const [getIsSubmit, setIsSubmit] = useState(false)
    const [getDisableChoice,setDisableChoice] = useState(false)
    const leftQuest = question.slice(0,question.indexOf("_"))
    const rightQuest = question.slice(question.lastIndexOf("_") + 1,question.length)
    const [getNextButtonText, setNextButtonText] = useState("Xong")
    const progress = 0.1
    const submit = ()=>{
      if(getSelectedAnswer !== wrongAnswer){
        if(!getIsSubmit){
          setDisableChoice(true)
          setIsSubmit(true)
          setBlank(correctAnswer)
          if(correctAnswer === getSelectedAnswer){
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
          progress={progress}
          unfilledColor="black"
          borderRadius={200}
          borderColor="#086CA4"
          height={1000}
          width={380}
          color="#CFFF0F"
        />
      </View>
      <View style = {styles.body}>
        <Text style={styles.title}>Hoàn tất bản dịch.</Text>
        <View style={styles.questionGroup}>
            <Image source={require('../Assets/Images/man.png')} style={styles.imgMan}></Image>
            <View style={styles.chatBox}>
                <ImageBackground source={require('../Assets/Images/speech-bubble.png')} resizeMode="contain" style={styles.imgChatBox}>
                    <Text style={styles.chatBoxContent}>
                        <Text>{leftQuest}</Text>
                        
                        <Text 
                            style={{
                                color: getBlank !== blank ? selectedFColor: "black", 
                                fontStyle: "italic",
                                fontWeight: 'bold',
                                fontSize: 22,
                            }}>{getBlank}</Text>
                        <Text>{rightQuest}</Text>
                    </Text> 
                </ImageBackground>
            </View>
        </View>
        <View style={styles.answerGroup}>
            {answerArray.map((e,i)=>(
                <TouchableOpacity key={i}
                disabled = {getDisableChoice}
                style={[styles.answerBtn,{
                    backgroundColor:  getIsSubmit === true ? 
                      (correctAnswer === e ? correctBGColor : getSelectedAnswer === e ? wrongBGColor : "white") : 
                      getSelectedAnswer === e ? selectedBGColor : "white",
                    borderColor: getIsSubmit === true ? 
                    (correctAnswer === e ? correctBGColor : getSelectedAnswer === e ? wrongBGColor : "black") : 
                    getSelectedAnswer === e ? selectedBColor : "black",
                } ] } 
                onPress={()=>{
                    setSelectedAnswer(e)
                    setBlank(e)
                    }}>
                <Text style={[
                    styles.answerBtnText,{
                    color: getIsSubmit === false ? getSelectedAnswer === e ? selectedFColor:"black":"black",}]}>{e}</Text>
            </TouchableOpacity> 
            ))}
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
    answerGroup:{
        padding: '5%',
        height: '55%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'space-evenly'

    },
    answerBtn:{
        borderColor: 'gray',
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
    imgMan:{
        flex: 3,
        height: '100%',
        alignSelf: 'flex-end',
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
        marginTop: '5%',
        height: 130,
        textAlign: 'left',
        color: 'black',
        fontSize: 18,
    },
    
})
export default FillBlank