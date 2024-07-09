import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { stopMapper } from 'react-native-reanimated';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { useRoute } from '@react-navigation/native';

const PairWord = ({navigation}) => {
  const route = useRoute();
  const quiz = route.params.quiz;
  const idTest = quiz.testId
  const idUser = route.params.idUser;
  const quizPoint = route.params.quizPoint
  const totalPoint = route.params.totalPoint 
  const nextQuizIndex = route.params.quizIndex + 1;
  const progress = route.params.progress;
  const initLAA = quiz.choice
  const copyLAArray = Array.from(initLAA)
  const initRAA = quiz.result
  const copyRAArray = Array.from(initRAA)

  const state = {
    RIGHT: "right",
    NEUTRAL: "neutral",
    WRONG: "wrong"
  }
  
  const [leftAnsArray, setLAnsArray] = useState([]);
  const [ansLStateArray, setAnsLStateArray] = useState([state.NEUTRAL,state.NEUTRAL,state.NEUTRAL,state.NEUTRAL]);
  const [rightAnsArray, setRAnsArray] = useState([]);
  const [ansRStateArray, setAnsRStateArray] = useState([state.NEUTRAL,state.NEUTRAL,state.NEUTRAL,state.NEUTRAL]);
  const [selectedColumn, setSelectedColumn] = useState(-1)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [coupleSelectedIndex, setCoupleSelectedIndex] = useState([])
  const [nextBtnText, setNextBtnText] = useState('Tiếp theo')
  const selectedFColor = '#00A3FF';
  const selectedBGColor = '#B6E9FF';
  const selectedBColor = '#00A3FF';
  const correctBGColor = '#81F53A';
  const wrongBGColor = '#FF4848';
  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
  };
  const [isFirstGenerate, setIsFirstGenerate] = useState(true)
  if(isFirstGenerate){
    generateAnswers()
    setIsFirstGenerate(false)
  }
  function generateAnswers(){

    for (let index = 0; index < initLAA.length; index++) {
      let randomIndex = getRandomIntInclusive(0, copyLAArray.length - 1);
      leftAnsArray.push(copyLAArray[randomIndex]);
      copyLAArray.splice(randomIndex, 1);
      randomIndex = getRandomIntInclusive(0, copyRAArray.length - 1);
      rightAnsArray.push(copyRAArray[randomIndex]);
      copyRAArray.splice(randomIndex, 1);
    }
  }
  const initAnswers = (e, i, column) => {
    return (
      <TouchableOpacity 
      key={i} 
      disabled = {
        column === 0 ? 
        ansLStateArray[i] === state.RIGHT || ansLStateArray[i] === state.WRONG ? true : false : 
        ansRStateArray[i] === state.RIGHT || ansRStateArray[i] === state.WRONG ? true : false}
      style={[
        styles.answerBtn,
        {
          backgroundColor: 
            column === 0 ? 
            ansLStateArray[i] === state.RIGHT ? correctBGColor : 
            ansLStateArray[i] === state.WRONG ? wrongBGColor :
            selectedAnswer === e ? selectedBGColor :
            'white'
            : 
            ansRStateArray[i] === state.RIGHT ? correctBGColor : 
            ansRStateArray[i] === state.WRONG ? wrongBGColor :
            selectedAnswer === e ? selectedBGColor :
            'white'
            ,
          borderColor:  selectedAnswer === e ? selectedBColor :'black',
        }
      ]} 
      onPress={()=>onPressChoice(e,i,column)}>
        <View style={{
          position: 'absolute', 
          top: -12.5, 
          left: -12.5,
          backgroundColor: 'white', 
          padding: 10,
          borderRadius: 100,
          width: 50,
          height: 50,
          justifyContent: 'center',
          opacity: column === 0 ?
          ansLStateArray[i] === state.RIGHT || ansLStateArray[i] === state.WRONG ? 1 : 0 :
           ansRStateArray[i] === state.RIGHT ||ansRStateArray[i] === state.WRONG ? 1 : 0}}>
            <Text style={{
              textAlign: 'center', 
              fontSize: 20,
              fontWeight: 'bold'}}>
                {coupleSelectedIndex.map((element,index)=>{
                  if(column === 0){
                    if(element[0] === i){
                      return index + 1
                    }
                  }else{
                    if(element[1] === i){
                      return index + 1
                    }
                  }
                })}
            </Text>
          </View>
        <Text 
        style={[
          styles.answerBtnText,
          {
            color: selectedAnswer === e ? selectedFColor :'black'
          }
        ]}>{e}</Text>
      </TouchableOpacity>
    );
  };
  const onPressChoice = (e,index, column) =>{
    if(selectedColumn !== -1 && selectedColumn !== column){
      let leftAnswer, rightAnswer = ""
      let leftIndex, rightIndex = 0
      let column = 0;
      switch (selectedColumn) {
        case 0:
          leftAnswer = selectedAnswer
          leftIndex = selectedIndex
          rightAnswer = e
          rightIndex = index
          break;
        default:
          leftAnswer = e
          leftIndex = index
          rightAnswer = selectedAnswer
          rightIndex = selectedIndex
          column = 1
          break;
      }
      const checkLeftAnswer = (string) => {
        return string === leftAnswer
      }
      const checkRightAnswer = (string) => {
        return string === rightAnswer
      }
      if(initLAA.findIndex(checkLeftAnswer) === initRAA.findIndex(checkRightAnswer)){
        //success 
        const newALSArray = ansLStateArray.map((e, i) => {
          if (i === leftIndex) {
            return state.RIGHT;
          } else {
            return e;
          }
        });
        setAnsLStateArray(newALSArray);
        const newARSArray = ansRStateArray.map((e, i) => {
          if (i === rightIndex) {
            return state.RIGHT;
          } else {
            return e;
          }
        });
        setAnsRStateArray(newARSArray);
      }else{
        //fail
        if(column === 0){
          const newALSArray = ansLStateArray.map((e, i) => {
            if (i === leftIndex) {
              return state.WRONG;
            } else {
              return e;
            }
          });
          setAnsLStateArray(newALSArray);
          rightAnsArray.map((e, i)=>{
            rightAnswer = e
            if(initLAA.findIndex(checkLeftAnswer) === initRAA.findIndex(checkRightAnswer)){
              rightIndex = i
            }
          })
          const newARSArray = ansRStateArray.map((e, i) => {
            if (i === rightIndex) {
              return state.WRONG;
            } else {
              return e;
            }
          });
          setAnsRStateArray(newARSArray);
        }else{
          leftAnsArray.map((e, i)=>{
            leftAnswer = e
            if(initLAA.findIndex(checkLeftAnswer) === initRAA.findIndex(checkRightAnswer)){
              leftIndex = i
            }
          })
          const newALSArray = ansLStateArray.map((e, i) => {
            if (i === leftIndex) {
              return state.WRONG;
            } else {
              return e;
            }
          });
          setAnsLStateArray(newALSArray);
          const newARSArray = ansRStateArray.map((e, i) => {
            if (i === rightIndex) {
              return state.WRONG;
            } else {
              return e;
            }
          });
          setAnsRStateArray(newARSArray);
        }
      }
      coupleSelectedIndex.push([leftIndex,rightIndex])
      setSelectedAC('', -1, -1)
    } else if(selectedAnswer === e) {
      setSelectedAC('', -1, -1)
    }else {
      setSelectedAC(e,index, column)
    }
  }
  const setSelectedAC = (answer,index, column) => {
    setSelectedColumn(column)
    setSelectedIndex(index)
    setSelectedAnswer(answer)
  }
  const submit = () =>{
    let point = totalPoint
    let counter = 0
    ansLStateArray.map((e,i)=>{
      if(e === state.RIGHT){
        point += quizPoint / initLAA.length
      }
      if(e === state.RIGHT || e === state.WRONG){
        counter++
      }
    })
    if(counter === initLAA.length){
      navigation.navigate('QuizHolderScreen', 
        {idTest: idTest, 
          idUser: idUser, 
          totalPoint: point, 
          quizIndex: nextQuizIndex});
    }else{
      Alert.alert('Bạn chưa hoàn thành ghép các cặp tương ứng.');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={{width: '10%', height: '100%', justifyContent: 'center'}}>
          <TouchableOpacity style={[styles.buttonClose]}>
            <IconFontisto
              name="close-a"
              style={{fontSize: 36}}
              color="black"
              onPress={() => navigation.navigate('HomeScreen')}
            />
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
          style={styles.processBar}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Chọn cặp từ tương ứng.</Text>
        <View style={styles.answerGroup}>
          <View style={styles.leftColumn}>
            {leftAnsArray.map((e, i) => 
              initAnswers(e,i, 0)
            )}
          </View>
          <View style={styles.rightColumn}>
            {rightAnsArray.map((e, i) => 
              initAnswers(e,i, 1)
            )}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonNext} onPress={() => submit()}>
          <Text style={styles.textButtonNext}>{nextBtnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    height: 40,
  },
  answerGroup: {
    marginTop: '5%',
    height: '90%',
    // backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftColumn: {
    // backgroundColor: 'red',
    width: '47.5%',
    justifyContent: 'space-evenly',
  },
  rightColumn: {
    // backgroundColor: 'blue',
    width: '47.5%',
    justifyContent: 'space-evenly',
  },
  answerBtn: {
    backgroundColor: 'white',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 20,
  },
  answerBtnText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 26,
  },
});
export default PairWord;
