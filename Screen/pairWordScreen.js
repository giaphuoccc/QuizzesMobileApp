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
  const testId = route.params.testId;
  // console.log("123+"+testId);
  const a = route.params.quiz;
  console.log(a );
  const initLAA = ['cat', 'gun', 'chair', 'fire'];
  const copyLAArray = ['cat', 'gun', 'chair', 'fire'];
  const [leftAnsArray, setLAnsArray] = useState([]);
  const [ansLCorrectArray, setAnsLCorrectArray] = useState([false,false,false,false]);
  const initRAA = ['mèo', 'súng', 'ghế', 'lửa'];
  const copyRAArray = ['mèo', 'súng', 'ghế', 'lửa'];
  const [rightAnsArray, setRAnsArray] = useState([]);
  const [ansRCorrectArray, setAnsRCorrectArray] = useState([false,false,false,false]);
  const [selectedColumn, setSelectedColumn] = useState(-1)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [nextBtnText, setNextBtnText] = useState('Tiếp theo')
  const selectedFColor = '#00A3FF';
  const selectedBGColor = '#B6E9FF';
  const selectedBColor = '#00A3FF';
  const correctBGColor = '#81F53A';
  const wrongBGColor = '#FF4848';
  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
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
      disabled = {column === 0 ? ansLCorrectArray[i] : ansRCorrectArray[i]}
      style={[
        styles.answerBtn,
        {
          backgroundColor: 
            column === 0 ? 
            ansLCorrectArray[i] ? 
            correctBGColor : selectedAnswer === e ?
            selectedBGColor :'white'
            : 
            ansRCorrectArray[i] ? 
            correctBGColor : selectedAnswer === e ?
            selectedBGColor :'white'
            ,
          borderColor:  selectedAnswer === e ? selectedBColor :'black',
          opacity: column === 0 ? ansLCorrectArray[i] ? 0.6 : 1 : ansRCorrectArray[i] ? 0.6 : 1
        }
      ]} 
      onPress={()=>onPressChoice(e,i,column)}>
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
        //update bg br fcolor to hide
        setSelectedAC('',-1, -1)
        const newALCArray = ansLCorrectArray.map((e, i) => {
          if (i === leftIndex) {
            return true;
          } else {
            return e;
          }
        });
        setAnsLCorrectArray(newALCArray);
        const newARCArray = ansRCorrectArray.map((e, i) => {
          if (i === rightIndex) {
            return true;
          } else {
            return e;
          }
        });
        setAnsRCorrectArray(newARCArray);
      }else{
        //fail
        setSelectedAC('', -1, -1)
        //update bg br fcolor to normal
        console.log(e,column);
      }
    } else if(selectedAnswer === e) {
      setSelectedAC('', -1, -1)
      //update bg br fcolor to normal
    }else {
      setSelectedAC(e,index, column)
      //update bg br fcolor to selected
    }
  }
  const setSelectedAC = (answer,index, column) => {
    setSelectedColumn(column)
    setSelectedIndex(index)
    setSelectedAnswer(answer)
  }
  const submit = () =>{
    let isDone = true
    ansLCorrectArray.map((e,i)=>{
      if(e === false){
        isDone = false
      }
    })
    if(isDone){
      navigation.navigate("FillBlank")
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
