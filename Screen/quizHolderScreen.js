import { useState, useEffect } from 'react';
import {View} from 'react-native';
import {LOCALHOST} from '../config';
import { useRoute } from '@react-navigation/native';

const QuizHolderScreen = ({navigation}) => {
  let idUser = 'idUser'
  let idTest = '667927aba50b5d3365a8b19f'
  let quiz = [];
  const route = useRoute();
  const [quizIndex, setQuizIndex] = useState(0);
  // try {
  //   setQuizIndex(route.params.QuizIndex) 
  // } catch (error) {
  //   console.log(error);
  // }
  
  const[totalPoint, getTotalPoint] = useState(0)
  const[progress, setProgess] = useState(0)
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
      const quizIndex = route.params?.quizIndex || 0; 
      const currentQuiz = quizArray[quizIndex];
      
      if (currentQuiz && currentQuiz.typeDescription === "0") {
        navigation.navigate('ArrangeSentence', { quiz: currentQuiz, idUser: 'idUser' });
      } else if (currentQuiz && currentQuiz.typeDescription === '1') {
        navigation.navigate('FillBlank', { quiz: currentQuiz, idUser: 'idUser' });
      } else if (currentQuiz && currentQuiz.typeDescription === '2') {
        navigation.navigate('PairWord', { quiz: currentQuiz, idUser: 'idUser' });
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
