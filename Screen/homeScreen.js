import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import { LOCALHOST } from '../config';
import { UserContext } from './UserContext';

const HomeScreen = ({ navigation }) => {
  const unavaliableTestColor = 'gray';
  const finishTestColor = '#61FF00';
  const currentTestColor = 'yellow';
  const unDiffColor = '#EEEEEE';
  const [getChapter, setChapter] = useState([]);
  const [getIndex, setIndex] = useState(0);
  const [getDiff, setDiff] = useState(0);
  const [getTest, setTest] = useState([]);
  const [getTestStatus, setTestStatus] = useState(1);
  const [getCompletion, setCompletion] = useState(0.2);
  const [getCountTestComplete, setCountTestComplete] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchDataChapterandTest = async () => {
      try {
        const responseChater = await fetch(`${LOCALHOST}/chapter/getChapter`);
        const ChapterData = await responseChater.json();

        if (responseChater.ok) {
          setChapter(ChapterData);
          let allTests = [];
          
          for (const chapter of ChapterData) {
            // let counter=0;
            // let counterArray =[]
            const responseTest = await axios.get(
              `${LOCALHOST}/test/${chapter._id}`,
            );
            const TestData = responseTest.data;
            if (TestData.length > 0) {
              allTests.push(...TestData);
            } 
            // if(TestData.status == 1 && TestData.chapterId == chapter._id)
            // {
            //   counter+=1;
            // }
            // counterArray.push(counter);
            
          }

          setTest(allTests);
          // setCountTestComplete(counterArray)
        }
      } catch (error) {
        console.log('Error message', error);
      }
    };

    fetchDataChapterandTest();
   
  }, []);
  // console.log(status.length);



  // const fetchStatusCountByChapter = ()=>{
  //     const currentChapter = getTest[0]
  //     console.log(getTest);
  //     let counter = 0;
  //     getTest.map((e,index) =>{
  //       if(e[2]===currentChapter)
  //       {
  //         counter +=1;
  //       }
  //       else{
  //         getCountTestComplete.push(counter);
  //         counter = 0;
  //         currentChapter = e[2];
  //       }
  //     })
  // }

  // useEffect(() => {
  //   const fetchAllTests = async (chapterId) => {
  //     try {
  //       const promises = axios.get(`${LOCALHOST}/test/${chapterId}`);
  //       const responses = await Promise.all(promises);
  //       const tests = responses.map(response => response.data);
  //       setTest(tests);
  //     } catch (error) {
  //       console.error('Error fetching test data', error);
  //     }
  //   };

  //   if (getChapter.length > 0) {
  //     fetchAllTests();
  //   }
  // },[]);

  // console.log(getChapter);
  // console.log(getTest);
  // console.log(getCountTestComplete);

  //   useEffect(() => {
  //     fetchAllChapter();
  //   }, []);

  const updateCompleteTest = () => {
    setCountTestComplete(getCountTestComplete + 1);
  };

  const updateCompletionBar = count => {
    setCompletion(parseFloat(count / 6).toFixed(2));
  };

  const getProgressBarColor = () => {
    if (getCompletion <= 0.4) {
      return '#FF6347';
    } else if (getCompletion <= 0.7) {
      return '#FFD700';
    } else {
      return '#32CD32';
    }
  };

  const showAlert = (testId, chapterName, testName) => {
    console.log(testId);
    Alert.alert(
      'Start learning?',
      `Do ${testName} of ${chapterName}`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => handleAlertPress(testId),

        },
      ],
      { cancelable: false },
    );
  };
  const handleAlertPress = (testId) => {
    // navigation.navigate("FillBlank");
    console.log(testId);
    navigation.navigate('PairWord', { testId });
  };
  getTest.map((item, index) => {
    if (item.status == 1 && item.length / 6  ) {
      setCountTestComplete(getCountTestComplete + 1);
      console.log(getCountTestComplete);
    }
  })
  


  return (
    <ScrollView>
      {getChapter.length > 0 ? (
        getChapter.map((chapter, i) =>
          i % 2 === 0 ? (
            <View key={i}>
              <View style={[styles.head]}>
                <View style={[styles.topicContainer]}>
                  <View style={[styles.topicText]}>
                    <Text style={[styles.topicName]}>
                      {chapter.chapterName}
                    </Text>
                    <Text style={[styles.topicDescription]}>
                      {chapter.chapterDescription}
                    </Text>
                  </View>
                  <View style={[styles.progessIndicator]}>
                    <Progress.Bar
                      progress={getCompletion}
                      unfilledColor="gray"
                      borderRadius={100}
                      borderColor="#086CA4"
                      color={getProgressBarColor()}
                      height={'100%'}
                      style={styles.processBar}
                    />
                    <Text style={[styles.indicator]}>
                      {getCompletion * 100}%
                    </Text>
                  </View>
                  <View style={[styles.difficultContainer]}>
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '20%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '1'
                              ? '#61FF00'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '25%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '2'
                              ? '#61FF00'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '30%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '3'
                              ? '#ECFF15'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '35%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '4'
                              ? '#ECFF15'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '40%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '5'
                              ? '#F00000'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '45%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '6'
                              ? '#F00000'
                              : unDiffColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
              {getTest.length > 0 && (
                <View style={[styles.content]}>
                  <ImageBackground resizeMode="contain" style={[styles.image]} source={require('../Assets/Images/man.png')} />
                  <View style={[styles.anotherContent]}>
                    {getTest.slice(getIndex).map((item, index) => (
                      <View key={index}>
                        {(index === chapter.chapterName.slice(-1) * 6 - 6 || index === chapter.chapterName.slice(-1) * 6 - 1) && (
                          <View style={[styles.iconContainer_16_1]}>
                            <TouchableOpacity
                              style={[
                                styles.iconBackground_1,
                                {
                                  backgroundColor:
                                    item.status === 0
                                      ? unavaliableTestColor
                                      : '#61FF00',
                                },
                              ]}
                              onPress={() =>
                                showAlert(
                                  item._id,
                                  chapter.chapterName,
                                  item.testName,
                                )
                              }>
                              <Icon
                                name="check-circle-fill"
                                style={[styles.icon]}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                        {(index === chapter.chapterName.slice(-1) * 6 - 5 || index === chapter.chapterName.slice(-1) * 6 - 2) && (
                          <View>
                            <View style={[styles.layout_14_1]}>
                              <View style={[styles.iconContainer_25_1]}>
                                <TouchableOpacity
                                  style={[
                                    styles.iconBackground_5,
                                    {
                                      backgroundColor:
                                        item.status === 0
                                          ? unavaliableTestColor
                                          : '#61FF00',
                                    },
                                  ]}
                                  onPress={() =>
                                    showAlert(
                                      item._id,
                                      chapter.chapterName,
                                      item.testName,
                                    )
                                  }>
                                  <Icon name="feed-rocket" style={[styles.icon]} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                        {(index === chapter.chapterName.slice(-1) * 6 - 4 || index === chapter.chapterName.slice(-1) * 6 - 3) && (
                          <View>
                            <View style={[styles.layout_23_1]}>

                              <View style={[styles.iconContainer_34_1]}>
                                <TouchableOpacity
                                  style={[
                                    styles.iconBackground_5,
                                    {
                                      backgroundColor:
                                        item.status === 0
                                          ? unavaliableTestColor
                                          : '#61FF00',
                                    },
                                  ]}
                                  onPress={() =>
                                    showAlert(
                                      item._id,
                                      chapter.chapterName,
                                      item.testName,
                                    )
                                  }>
                                  <Icon name="feed-star" style={[styles.icon]} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>

                    ))}
                  </View>

                </View>
              )}
            </View>
          ) : (
            <View key={i}>
              <View style={[styles.head]}>
                <View style={[styles.topicContainer]}>
                  <View style={[styles.topicText]}>
                    <Text style={[styles.topicName]}>
                      {chapter.chapterName}
                    </Text>
                    <Text style={[styles.topicDescription]}>
                      {chapter.chapterDescription}
                    </Text>
                  </View>
                  <View style={[styles.progessIndicator]}>
                    <Progress.Bar
                      progress={getCompletion}
                      unfilledColor="gray"
                      borderRadius={100}
                      borderColor="#086CA4"
                      color={getProgressBarColor()}
                      height={'100%'}
                      style={styles.processBar}
                    />
                    <Text style={[styles.indicator]}>
                      {getCompletion * 100}%
                    </Text>
                  </View>
                  <View style={[styles.difficultContainer]}>
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '20%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '1'
                              ? '#61FF00'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '25%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '2'
                              ? '#61FF00'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '30%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '3'
                              ? '#ECFF15'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '35%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '4'
                              ? '#ECFF15'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '40%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '5'
                              ? '#F00000'
                              : unDiffColor,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.diffLevel,
                        { height: '45%' },
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '6'
                              ? '#F00000'
                              : unDiffColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
              {getTest.length > 0 && (
                <View style={[styles.content]}>
                  <View style={[styles.anotherContent]}>
                    {getTest.slice(getIndex).map((item, index) => (
                      <View key={index}>
                        {(index === chapter.chapterName.slice(-1) * 6 - 6 || index === chapter.chapterName.slice(-1) * 6 - 1) && (
                          <View style={[styles.iconContainer_16_2]}>
                            <TouchableOpacity
                              style={[
                                styles.iconBackground_1,
                                {
                                  backgroundColor:
                                    item.status === 0
                                      ? unavaliableTestColor
                                      : '#61FF00',
                                },
                              ]}
                              onPress={() =>
                                showAlert(
                                  item._id,
                                  chapter.chapterName,
                                  item.testName,
                                )
                              }>
                              <Icon
                                name="check-circle-fill"
                                style={[styles.icon]}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                        {(index === chapter.chapterName.slice(-1) * 6 - 5 || index === chapter.chapterName.slice(-1) * 6 - 2) && (
                          <View>
                            <View style={[styles.layout_14_1]}>
                              <View style={[styles.iconContainer_25_2]}>
                                <TouchableOpacity
                                  style={[
                                    styles.iconBackground_5,
                                    {
                                      backgroundColor:
                                        item.status === 0
                                          ? unavaliableTestColor
                                          : '#61FF00',
                                    },
                                  ]}
                                  onPress={() =>
                                    showAlert(
                                      item._id,
                                      chapter.chapterName,
                                      item.testName,
                                    )
                                  }>
                                  <Icon name="feed-rocket" style={[styles.icon]} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                        {(index === chapter.chapterName.slice(-1) * 6 - 4 || index === chapter.chapterName.slice(-1) * 6 - 3) && (
                          <View>
                            <View style={[styles.layout_23_1]}>

                              <View style={[styles.iconContainer_34_2]}>
                                <TouchableOpacity
                                  style={[
                                    styles.iconBackground_5,
                                    {
                                      backgroundColor:
                                        item.status === 0
                                          ? unavaliableTestColor
                                          : '#61FF00',
                                    },
                                  ]}
                                  onPress={() =>
                                    showAlert(
                                      item._id,
                                      chapter.chapterName,
                                      item.testName,
                                    )
                                  }>
                                  <Icon name="feed-star" style={[styles.icon]} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                  <ImageBackground resizeMode="contain" style={[styles.image_2]} source={require('../Assets/Images/man.png')} />
                </View>
              )}
            </View>
          ),
        )
      ) : (
        <View key="empty">
          <Text>No items to display</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  head: {
    flex: 1,
    backgroundColor: '#2C3C67',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingVertical: '5%',
  },
  topicContainer: {
    flexDirection: 'row',
    flex: 4,
  },
  topicText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',

    // backgroundColor:'red'
  },
  topicName: {
    color: 'cyan',
    fontSize: 25,
    fontWeight: 'bold',
  },
  topicDescription: {
    color: 'cyan',
    fontSize: 22,
    fontStyle: 'italic',
  },
  difficultContainer: {
    flex: 1,
    top: 20,
    // backgroundColor:'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // diffLevel: {
  //     width: '50%',
  //     height: 7,
  //     margin: 2,
  //     backgroundColor: 'grey',
  //     alignSelf: 'center',
  //     borderRadius: 4,
  // },
  diffLevel: {
    width: 7,
    height: '50%',
    margin: 2,
    backgroundColor: 'grey',
    alignSelf: 'baseline',
    borderRadius: 4,
  },
  progessIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'yellow'
  },
  processBar: {
    height: '20%',
    marginTop: '8%',
  },
  indicator: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  content: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: '#2E4583',
    paddingHorizontal: '7%',
    paddingVertical: '2%',
  },
  anotherContent: {
    flex: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  iconContainer_16_1: {
    width: '55%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer_25_1: {
    width: '75%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer_16_2: {
    width: '75%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer_25_2: {
    width: '55%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 10,
    alignItems: 'center',
    // backgroundColor:'red'
  },
  iconContainer_34_1: {
    paddingVertical: 5,
    width: '80%',
    // backgroundColor: 'blue',
    alignItems: 'flex-end'

  },
  iconContainer_34_2: {
    width: '75%',
    flexDirection: 'column',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 5

  },
  iconBackground_1: {
    backgroundColor: 'green',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground_2: {
    backgroundColor: 'yellow',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground_3: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },
  iconBackground_4: {
    backgroundColor: 'gray',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },
  iconBackground_5: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  iconBackground_6: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 85,
    color: 'white',
  },
  layout_14_1: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  layout_23_1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    height: 200,
    width: 200,
    alignSelf: 'center',
    // backgroundColor:'red'
  },
  image_2: {
    flex: 1.5,
    height: 200,
    width: 200,
    alignSelf: 'center',
    transform: [{ scaleX: -1 }],
  },
  iconLayout: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  NavBar: {
    flex: 1,
  },
});
