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
import React, { useState, useEffect, useContext, useCallback } from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import { LOCALHOST } from '../config';
import { UserContext } from './UserContext';
import { get } from 'mongoose';

const HomeScreen = ({ navigation }) => {
  const unavaliableTestColor = 'gray';
  const finishTestColor = '#61FF00';
  const currentTestColor = 'yellow';
  const unDiffColor = '#EEEEEE';
  const { userId, users } = useContext(UserContext);
  const [getChapter, setChapter] = useState([]);
  const [getIndex, setIndex] = useState(0);
  const [getUserProgress, setUserProgress] = useState([]);
  const [getTest, setTest] = useState([]);
  const [getCompletion, setCompletion] = useState(0.2);
  const [status, setStatus] = useState([]);
  const [statusPercent, setStatusPercent] = useState([]);

  useEffect(() => {
    const fetchDataProgressAndChapterAndTest = async () => {
      try {
        const responseChapter = await fetch(`${LOCALHOST}/chapter/getChapter`);
        const chapterData = await responseChapter.json();

        const responseProgress = await fetch(`${LOCALHOST}/progress/getProgressByUser/${userId}`);
        const progressData = await responseProgress.json();

        if (responseChapter.ok) {
          setChapter(chapterData);

          let allTests = [];
          for (const chapter of chapterData) {
            const responseTest = await axios.get(`${LOCALHOST}/test/${chapter._id}`);
            const testData = responseTest.data;
            if (testData.length > 0) {
              allTests.push(...testData);
            }
          }
          setTest(allTests);

        }
        if (responseProgress.ok) {
          setUserProgress(progressData);
        }
        // console.log("CHAPPP");
        // console.log(chapterData);
        // console.log("TESTTTT");
        // console.log(allTests);
        // console.log("PROGRESSSSSS");
        // console.log(progressData);
      } catch (error) {
        console.log('Error message', error);
      }
    };
    fetchDataProgressAndChapterAndTest();
  }, [userId]);

  useEffect(() => {
    if (getChapter.length > 0 && getTest.length > 0 && getUserProgress.length > 0) {
      const getCompletedTestsByChapter = (UserID) => {
        // Lọc các bài kiểm tra hoàn thành của người dùng cụ thể
        const completedTests = getUserProgress.filter(progress => progress.userId === UserID && progress.status === 1);
        // Liên kết bài kiểm tra hoàn thành với chương của chúng
        const completedTestsByChapter = completedTests.reduce((acc, progress) => {
          const test = getTest.find(test => test._id === progress.testId);
          if (test) {
            const chapterID = test.chapterId;
            if (!acc[chapterID]) {
              acc[chapterID] = 0;
            }
            acc[chapterID] += 1;
          }
          return acc;
        }, {});
        // Tạo một danh sách kết quả bao gồm tên chương và số lượng bài kiểm tra đã hoàn thành
        const result = getChapter.map(chapter => {
          return {
            chapterId: chapter._id,
            chapterName: chapter.chapterName,
            chapterDescription: chapter.chapterDescription,
            chapterDifficulties: chapter.chapterDifficulties,
            CompletedTests: completedTestsByChapter[chapter._id] || 0
          };
        });
        return result;
      };
      // Gọi hàm với userID cụ thể
      const completedTestsByChapter = getCompletedTestsByChapter(userId);
      setChapter(completedTestsByChapter);
      // console.log("NEWWCHAPPPP");
      // console.log(completedTestsByChapter);
    }
  }, [getUserProgress, userId]);

  useEffect(() => {
    const getUserTestsWithDetails = (UserID) => {
      // Lọc các bài kiểm tra của người dùng cụ thể
      const userProgressMap = getUserProgress.reduce((acc, progress) => {
        if (progress.userId === UserID) {
          acc[progress.testId] = {
            status: progress.status,
            point: progress.point
          };
        }
        return acc;
      }, {});
      // Liên kết tất cả các bài kiểm tra với thông tin chương và thêm thông tin status, point nếu có
      const userTestsWithDetails = getTest.map(test => {
        const progress = userProgressMap[test._id];
        return {
          testId: test._id,
          chapterId: test.chapterId,
          testName: test.testName,
          status: progress ? progress.status : 0,  // 0 nếu không có trong userProgress
          point: progress ? progress.point : 0   // 0 nếu không có trong userProgress
        };
      });
      return userTestsWithDetails;
    };
    const userTestsWithDetail = getUserTestsWithDetails(userId);
    setTest(userTestsWithDetail);
    // console.log("NEWWTESTTTT");
    // console.log(userTestsWithDetail);
  }, [getUserProgress, userId]);

  const getProgressBarColor = () => {
    if (getCompletion <= 0.4) {
      return '#FF6347';
    } else if (getCompletion <= 0.7) {
      return '#FFD700';
    } else {
      return '#32CD32';
    }
  };

  const showAlert = (test, chapterName) => {
    // console.log(test);
    Alert.alert(
      'Start learning?',
      `Do ${test.testName} of ${chapterName}\nPrevious point: ${test.point.toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => handleAlertPress(test.testId),
        },
      ],
      { cancelable: true },
    );
  };
  const handleAlertPress = testId => {
    navigation.navigate('QuizHolderScreen', { testId });
  };

  return (
    <ScrollView>
      {getChapter.length > 0 ? (
        getChapter.map((chapter, i) => {
          const chapterCompletion = (chapter.CompletedTests / 6 || 0).toFixed(2);
          return (
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
                        progress={Number(chapterCompletion)}
                        unfilledColor="gray"
                        borderRadius={100}
                        borderColor="#086CA4"
                        color={getProgressBarColor()}
                        style={styles.processBar}
                      />
                      <Text style={[styles.indicator]}>
                        {chapterCompletion * 100}%
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
                    <ImageBackground
                      resizeMode="contain"
                      style={[styles.image]}
                      source={require('../Assets/Images/man.png')}
                    />
                    <View style={[styles.anotherContent]}>
                      {getTest.slice(getIndex).map((item, index) => (
                        <View key={index}>
                          {(index === chapter.chapterName.slice(-1) * 6 - 6 ||
                            index === chapter.chapterName.slice(-1) * 6 - 1) && (
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
                                      item,
                                      chapter.chapterName,
                                    )
                                  }>
                                  <Icon
                                    name="check-circle-fill"
                                    style={[styles.icon]}
                                  />
                                </TouchableOpacity>
                              </View>
                            )}
                          {(index === chapter.chapterName.slice(-1) * 6 - 5 ||
                            index === chapter.chapterName.slice(-1) * 6 - 2) && (
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
                                          item,
                                          chapter.chapterName,
                                        )
                                      }>
                                      <Icon
                                        name="feed-rocket"
                                        style={[styles.icon]}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            )}
                          {(index === chapter.chapterName.slice(-1) * 6 - 4 ||
                            index === chapter.chapterName.slice(-1) * 6 - 3) && (
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
                                      item,
                                      chapter.chapterName,
                                    )
                                      }>
                                      <Icon
                                        name="feed-star"
                                        style={[styles.icon]}
                                      />
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
                        progress={Number(chapterCompletion)}
                        unfilledColor="gray"
                        borderRadius={100}
                        borderColor="#086CA4"
                        color={getProgressBarColor()}
                        style={styles.processBar}
                      />
                      <Text style={[styles.indicator]}>
                        {chapterCompletion * 100}%
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
                          {(index === chapter.chapterName.slice(-1) * 6 - 6 ||
                            index === chapter.chapterName.slice(-1) * 6 - 1) && (
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
                                      item,
                                      chapter.chapterName,
                                    )
                                  }>
                                  <Icon
                                    name="check-circle-fill"
                                    style={[styles.icon]}
                                  />
                                </TouchableOpacity>
                              </View>
                            )}
                          {(index === chapter.chapterName.slice(-1) * 6 - 5 ||
                            index === chapter.chapterName.slice(-1) * 6 - 2) && (
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
                                      item,
                                      chapter.chapterName,
                                    )
                                      }>
                                      <Icon
                                        name="feed-rocket"
                                        style={[styles.icon]}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            )}
                          {(index === chapter.chapterName.slice(-1) * 6 - 4 ||
                            index === chapter.chapterName.slice(-1) * 6 - 3) && (
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
                                          item,
                                          chapter.chapterName,
                                        )
                                      }>
                                      <Icon
                                        name="feed-star"
                                        style={[styles.icon]}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            )}
                        </View>
                      ))}
                    </View>
                    <ImageBackground
                      resizeMode="contain"
                      style={[styles.image_2]}
                      source={require('../Assets/Images/man.png')}
                    />
                  </View>
                )}
              </View>
            )
          )
        }
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
    justifyContent: 'center',
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
    alignItems: 'flex-end',
  },
  iconContainer_34_2: {
    width: '75%',
    flexDirection: 'column',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 5,
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
    justifyContent: 'center',
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
