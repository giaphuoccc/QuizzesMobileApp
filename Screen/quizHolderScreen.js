import { useState, useEffect } from 'react';
import {View, Alert} from 'react-native';
import {LOCALHOST} from '../config';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const QuizHolderScreen = ({navigation}) => {
  const route = useRoute();
  //Bear1@gmail.com
  let idUser = route.params?.idUser ||'6682771561e69b48ae1cb9c7' 
  //Test 1
  let idTest = route.params?.idTest || '667927aba50b5d3365a8b19f'
  let maxPoint = 10;
  const totalPoint = route.params?.totalPoint || 0; 
  const quizIndex = route.params?.quizIndex || 0;
  const [quizArray, setQuizArray] = useState([])
  useEffect(() => {
    const loadQuizs = async () => {
      try {
        const quizs = await fetch(`${LOCALHOST}/quiz/getQuizsByIdTest/${idTest}`);
        const quizsJson = await quizs.json();
        
        const fetchedQuizzes = await Promise.all(quizsJson.map(async (e) => {
          const quizType = await fetch(`${LOCALHOST}/typeQuiz/getTypeQuiz/${e.quizType}`);
          const quizTypeJson = await quizType.json();
          return {
            testId: e.testId,
            typeDescription: quizTypeJson[0].typeDescription,
            question: e.question,
            choice: e.choice,
            result: e.result
          };
        }));

        setQuizArray(fetchedQuizzes);
      } catch (err) {
        console.log('Error loading quizzes:', err);
        Alert.alert('Error', 'Failed to load quizzes.');
      }
    };

    loadQuizs();
  }, []);
  const saveProgress = () =>{
    const progress = {
      userId: idUser,
      testId: idTest,
      status: 1,
      point: totalPoint
    }
    console.log(progress);
    axios
      .post(`${LOCALHOST}/progress/created`, progress)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Update progress successful'
        );
        navigation.navigate('HomeScreen')
      })
      .catch(error => {
        Alert.alert(
          'Update progress failed',
        );
        console.log('Update progress failed', error);
      });
  }
  useEffect(() => {
    if (quizArray.length > 0) {
      const currentQuiz = quizArray[quizIndex];
      const progress = quizIndex/quizArray.length
      const pointPerQuiz = maxPoint / quizArray.length
      const output = { 
        quiz: currentQuiz, 
        idUser: idUser, 
        quizIndex: quizIndex , 
        progress: progress,
        totalPoint: totalPoint,
        quizPoint: pointPerQuiz}
      if(quizIndex >= quizArray.length){
        //add new progress to server
        saveProgress();
      }else if (currentQuiz && currentQuiz.typeDescription === "0") {
        console.log("To ArrangeSentence",quizIndex, progress, totalPoint,pointPerQuiz);
        navigation.navigate('ArrangeSentence', output);
      } else if (currentQuiz && currentQuiz.typeDescription === '1') {
        console.log("To FillBlank",quizIndex, progress, totalPoint,pointPerQuiz);
        navigation.navigate('FillBlank', output); 
      } else if (currentQuiz && currentQuiz.typeDescription === '2') {
        console.log("To PairWord",quizIndex, progress, totalPoint,pointPerQuiz);
        navigation.navigate('PairWord', output); 
      } else {
        Alert.alert('Error', 'Unknown quiz type.');
      }
    }
  }, [quizArray, route.params?.quizIndex, navigation]);

  return (
    <View></View>
  );
};
export default QuizHolderScreen;
