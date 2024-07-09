import { useState, useEffect } from 'react';
import {View, Alert, Text,TouchableOpacity, StyleSheet} from 'react-native';
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
  const [isCompleted, setisCompleted] = useState(false)
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
    axios
      .post(`${LOCALHOST}/progress/created`, progress)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Update progress successful'
        );
        setisCompleted(true)
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
  const showSummary = () =>{
    return (<View style={styles.body}>
      <View style={styles.title}><Text style={styles.titleText}>Tổng kết</Text></View>
      <View style={styles.lineGroup}>
        <View style={styles.line}><Text style={styles.lineText}>Bài:</Text><Text style={styles.lineText}>Chương 3 - Bài 1</Text></View>
        <View style={styles.line}><Text style={styles.lineText}>Số câu:</Text><Text style={styles.lineText}>{quizArray.length}</Text></View>
        <View style={styles.line}><Text style={styles.lineText}>Tổng điểm:</Text><Text style={styles.lineText}> {(totalPoint+'').substring(0,3)} / 10.0</Text></View>
      </View>
      <TouchableOpacity style ={styles.btnFinish} onPress={()=>{
          navigation.navigate('HomeScreen')
      }}>
        <Text style ={styles.finishText}>Kết thúc</Text>
      </TouchableOpacity>
      </View>)
  }
  return (
    <View>{isCompleted ? showSummary():<View></View>}</View>
  );
};
const styles = StyleSheet.create({
  body:{
    width: '100%', 
    height: '100%', 
    backgroundColor: '#086CA4',
    // justifyContent: 'center',
    alignItems: 'center',
  },  
  title:{
    // backgroundColor: 'blue',
    width: '100%',
    height: '20%',
    marginTop: '20%',
  },
  titleText:{
    textAlign: 'center',
    fontSize: 100,
    fontWeight: 'bold',
    color: 'white'
  },
  lineGroup:{
    // backgroundColor: 'blue',
    width: '80%',
    height: '45%',
    marginLeft: '10%', 
    marginRight: '10%',
    marginBottom: '10%',
    justifyContent: 'space-around'
  },
  line:{
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineText:{
    textAlign: 'center',
    // fontWeight: 'bold',
    color: 'white',
    fontSize: 40
  },
  btnFinish:{
    backgroundColor: 'white',
    height: '10%',
    width: '80%', 
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  finishText:{
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold'
  }
});
export default QuizHolderScreen;
