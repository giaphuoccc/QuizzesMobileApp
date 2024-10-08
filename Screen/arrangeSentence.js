import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon, TextInput} from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import React, {useEffect, useState} from 'react';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const ArrangeSentence = ({navigation}) => {
  const route = useRoute();
  const quiz = route.params.quiz;
  const idTest = quiz.testId
  const idUser = route.params.idUser;
  const [quizPoint, setQuizPoint] = useState(route.params.quizPoint)
  const totalPoint = route.params.totalPoint + quizPoint
  const nextQuizIndex = route.params.quizIndex + 1;
  const progress = route.params.progress;
  const wordArray = quiz.choice;
  const correctAnswer = quiz.result[0];
  const questionText = quiz.question

  const [isSubmit, setIsSubmit] = useState(false);
  let [answerText, setAnswerText] = useState('');
  let [getNextButtonText, setNextButtonText] = useState('Xong');

  const selectedFColor = '#00A3FF';
  const selectedBGColor = '#B6E9FF';
  const selectedBColor = '#00A3FF';
  const correctBGColor = '#81F53A';
  const wrongBGColor = '#FF4848';

  let initOpacityArray = [];
  let initDisabledArray = [];
  let initSelectedArray = [];
  for (let index = 0; index < wordArray.length; index++) {
    initOpacityArray.push(1);
    initDisabledArray.push(false);
    initSelectedArray.push(false);
  }
  let [disabledReset, setDisabledReset] = useState(false);
  let [disabledArray, setDisabledArray] = useState(initDisabledArray);
  let [opacityArray, setOpacityArray] = useState(initOpacityArray);
  let [selectedArray, setSelectArray] = useState(initSelectedArray);
  const onPressReset = () => {
    if (disabledReset) {
      return;
    }
    setAnswerText('');
    setSelectArray(initSelectedArray);
    setOpacityArray(initOpacityArray);
    setDisabledArray(initDisabledArray);
  };
  const initAnswers = (e, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={[
          styles.answerBtn,
          {
            backgroundColor: selectedArray[i] ? selectedBGColor : 'white',
            borderColor: selectedArray[i] ? selectedBColor : 'black',
          },
        ]}
        disabled={disabledArray[i]}
        onPress={() => {
          onPressWord(i);
        }}>
        <Text
          style={[
            styles.answerBtnText,
            {
              color: selectedArray[i] ? selectedFColor : 'black',
              opacity: opacityArray[i],
            },
          ]}>
          {e}
        </Text>
      </TouchableOpacity>
    );
  };

  const onPressWord = index => {
    if (answerText === '') {
      setAnswerText(wordArray[index]);
    } else {
      setAnswerText(answerText + ' ' + wordArray[index]);
    }
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
    
  };
  const submit = () => {
    if (answerText !== '') {
      if (!isSubmit) {
        const newDisableArray = disabledArray.map((e, i) => {
          return true;
        });
        setDisabledArray(newDisableArray);
        const newOpacityArray = opacityArray.map((e, i) => {
          return 0.5;
        });
        setOpacityArray(newOpacityArray);
        setIsSubmit(true);
        setDisabledReset(true);
        if (correctAnswer === answerText) {
          //success
          Alert.alert('Bạn làm đúng r nè.');
        } else {
          //fail
          Alert.alert('Bạn làm sai r nè. lêu lêu \nĐáp án đúng là: '+correctAnswer);
          setQuizPoint(0)
        }
        setNextButtonText('Câu tiếp theo');
      } else {
        setDisabledReset(false)
        setAnswerText('');
        setIsSubmit(false)
        setSelectArray(initSelectedArray);
        setOpacityArray(initOpacityArray);
        setDisabledArray(initDisabledArray);
        setNextButtonText('Xong')
        console.log("In arrange",totalPoint);
        navigation.navigate('QuizHolderScreen', 
          {idTest: idTest, 
            idUser: idUser, 
            totalPoint: totalPoint, 
            quizIndex: nextQuizIndex});
      }
    } else {
      //error
      Alert.alert('Bạn chưa chọn đáp án nào.');
    }
  };
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
        <Text style={styles.title}>Hoàn tất ghép câu.</Text>
        <View style={styles.questionGroup}>
          <Image
            source={require('../Assets/Images/man.png')}
            style={styles.imgMan}></Image>
          <View style={styles.chatBox}>
            <ImageBackground
              source={require('../Assets/Images/speech-bubble.png')}
              resizeMode="contain"
              style={styles.imgChatBox}>
              <Text style={styles.chatBoxContent}>{questionText}</Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.answerGroup}>
          <View style={styles.answerHeader}>
            <View style={styles.sentenceHolder}>
              <Text style={styles.sentenceHolderText}>{answerText} </Text>
            </View>
            <IconIonicons
              name="reload"
              style={{fontSize: 36}}
              color="black"
              onPress={() => {
                onPressReset();
              }}
            />
          </View>
          <View style={styles.answerFooter}>
            <View style={styles.wordSelection}>
              {wordArray
                .slice(0, Math.round(wordArray.length / 2))
                .map((e, i) => initAnswers(e, i))}
            </View>
            <View style={styles.wordSelection}>
              {wordArray
                .slice(Math.round(wordArray.length / 2))
                .map((e, i) => initAnswers(e, Math.round(i + wordArray.length / 2)))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={() => {
            submit();
          }}>
          <Text style={styles.textButtonNext}>{getNextButtonText}</Text>
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
  questionGroup: {
    marginTop: 20,
    paddingLeft: 20,
    height: '35%',
    width: '100%',
    flexDirection: 'row',
  },
  imgMan: {
    flex: 3,
    height: '100%',
    alignSelf: 'flex-end',
  },
  chatBox: {
    flex: 7,
    height: '85%',
  },
  imgChatBox: {
    flex: 1,
    width: '102.5%',
  },
  chatBoxContent: {
    marginLeft: '10%',
    marginTop: '7%',
    height: 130,
    textAlign: 'left',
    color: 'black',
    fontSize: 22,
  },

  answerGroup: {
    padding: '5%',
    height: '55%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  answerHeader: {
    // backgroundColor: 'blue',
    width: '100%',
    height: '30%',
    flexDirection: 'row',
  },
  sentenceHolder: {
    // backgroundColor: 'red',
    width: '90%',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  sentenceHolderText: {
    color: 'black',
    fontSize: 26,
  },

  answerFooter: {
    width: '100%',
    height: '70%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wordSelection: {
    width: '47.5%',
    height: '100%',
    justifyContent: 'space-between',
  },
  answerBtn: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1.5,
    height: '18%',
    justifyContent: 'center',
    borderRadius: 20,
  },
  answerBtnText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 22,
  },
});
export default ArrangeSentence;
