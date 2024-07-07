import { useState, useEffect } from 'react';
import {View, Alert} from 'react-native';
import {LOCALHOST} from '../config';
import { useRoute } from '@react-navigation/native';

const QuizHolderScreen = ({navigation}) => {
  const route = useRoute();
  let idUser = route.params?.idUser ||'idUser'
  let idTest = route.params?.idTest || '667927aba50b5d3365a8b19f'
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
  useEffect(() => {
    if (quizArray.length > 0) {
      const currentQuiz = quizArray[quizIndex];
      const progress = quizIndex/quizArray.length
      if(quizIndex >= quizArray.length){
        //add new progress to server
        navigation.navigate('HomeScreen')
      }else if (currentQuiz && currentQuiz.typeDescription === "0") {
        console.log("To ArrangeSentence",quizIndex, progress, totalPoint);
        navigation.navigate('ArrangeSentence', 
          { quiz: currentQuiz, 
            idUser: idUser, 
            quizIndex: quizIndex , 
            progress: progress,
            totalPoint: totalPoint });
      } else if (currentQuiz && currentQuiz.typeDescription === '1') {
        console.log("To FillBlank",quizIndex, progress, totalPoint);
        navigation.navigate('FillBlank', 
          { quiz: currentQuiz, 
            idUser:idUser, 
            quizIndex: quizIndex , 
            progress: progress,
            totalPoint: totalPoint }); 
      } else if (currentQuiz && currentQuiz.typeDescription === '2') {
        console.log("To PairWord",quizIndex, progress, totalPoint);
        navigation.navigate('PairWord', 
          { quiz: currentQuiz, 
            idUser: idUser, 
            quizIndex: quizIndex , 
            progress: progress,
            totalPoint: totalPoint });
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
