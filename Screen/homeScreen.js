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
import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import {LOCALHOST} from '../config';
import {UserContext} from './userContext';

const HomeScreen = ({navigation}) => {
  const unavaliableTestColor = 'gray';
  const finishTestColor = '#61FF00';
  const currentTestColor = 'yellow';
  const unDiffColor = '#EEEEEE';
  const [getChapter, setChapter] = useState([]);
  const [getDiff, setDiff] = useState(0);
  const [getTest, setTest] = useState([]);
  const [getTestStatus, setTestStatus] = useState(1);
  const [getCompletion, setCompletion] = useState(0.2);
  const [getCountTestComplete, setCountTestComplete] = useState(4);

  useEffect(() => {
    const fetchDataChapterandTest = async () => {
      try {
        const responseChater = await fetch(`${LOCALHOST}/chapter/getChapter`);
        const ChapterData = await responseChater.json();

        if (responseChater.ok) {
          setChapter(ChapterData);
          let allTests = [];
          for (const chapter of ChapterData) {
            const responseTest = await axios.get(
              `${LOCALHOST}/test/${chapter._id}`,
            );
            const TestData = responseTest.data;
            if (TestData.length > 0) {
              allTests.push(...TestData);
            }
          }
          setTest(allTests);
        }
      } catch (error) {
        console.log('Error message', error);
      }
    };

    fetchDataChapterandTest();
  }, []);

  //   console.log(getChapter);
  console.log(getTest);

  //   useEffect(() => {
  //     fetchAllChapter();
  //   }, []);

  useEffect(() => {
    updateCompletionBar(getCountTestComplete);
  }, [getCountTestComplete]);

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
          onPress: () => handleAlertPress(),
        },
      ],
      {cancelable: true},
    );
  };
  const handleAlertPress = () => {
    // navigation.navigate("FillBlank");
    navigation.navigate('PairWord');
  };

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
                        {height: '20%'},
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
                        {height: '25%'},
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
                        {height: '30%'},
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
                        {height: '35%'},
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
                        {height: '40%'},
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
                        {height: '45%'},
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
                  {getTest.map((item, index) => (
                    <View key={index}>
                      {(index === 0 || index === 5) && (
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
                      {(index === 1 || index === 4) && (
                        <View>
                          <View style={[styles.layout]}>
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
                                <Icon name="feed-tag" style={[styles.icon]} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )}
                      {(index === 2 || index === 3) && (
                        <View>
                          <View style={[styles.layout]}>
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
                                <Icon name="feed-tag" style={[styles.icon]} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
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
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '1'
                              ? '#61FF00'
                              : unDiffColor,
                          height: '20%',
                        },
                      ]}></View>
                    <View
                      style={[
                        styles.diffLevel,
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '2'
                              ? '#61FF00'
                              : unDiffColor,
                          height: '25%',
                        },
                      ]}></View>
                    <View
                      style={[
                        styles.diffLevel,
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '3'
                              ? '#ECFF15'
                              : unDiffColor,
                          height: '30%',
                        },
                      ]}></View>
                    <View
                      style={[
                        styles.diffLevel,
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '4'
                              ? '#ECFF15'
                              : unDiffColor,
                          height: '35%',
                        },
                      ]}></View>
                    <View
                      style={[
                        styles.diffLevel,
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '5'
                              ? '#F00000'
                              : unDiffColor,
                          height: '40%',
                        },
                      ]}></View>
                    <View
                      style={[
                        styles.diffLevel,
                        {
                          backgroundColor:
                            chapter.chapterDifficulties >= '6'
                              ? '#F00000'
                              : unDiffColor,
                          height: '45%',
                        },
                      ]}></View>
                  </View>
                </View>
              </View>
              <View style={[styles.content]}>
                <View style={[styles.iconContainer_16_2]}>
                  <TouchableOpacity
                    style={[
                      styles.iconBackground_1,
                      {
                        backgroundColor:
                          getTestStatus == 0
                            ? unavaliableTestColor
                            : finishTestColor,
                      },
                    ]}
                    onPress={() =>
                      showAlert(chapter._id, chapter.chapterName, 0)
                    }>
                    <Icon name="check-circle-fill" style={[styles.icon]} />
                  </TouchableOpacity>
                </View>

                <View style={[styles.layout]}>
                  <View style={[styles.iconLayout]}>
                    <View style={[styles.iconContainer_25_2]}>
                      <TouchableOpacity
                        style={[
                          styles.iconBackground_2,
                          {
                            backgroundColor:
                              getTestStatus == 0
                                ? unavaliableTestColor
                                : finishTestColor,
                          },
                        ]}
                        onPress={() =>
                          showAlert(chapter._id, chapter.chapterName, 1)
                        }>
                        <Icon name="feed-star" style={[styles.icon]} />
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.iconContainer_34_2]}>
                      <View style={[styles.iconContainer]}>
                        <TouchableOpacity
                          style={[
                            styles.iconBackground_3,
                            {
                              backgroundColor:
                                getTestStatus == 0
                                  ? unavaliableTestColor
                                  : finishTestColor,
                            },
                          ]}
                          onPress={() =>
                            showAlert(chapter._id, chapter.chapterName, 2)
                          }>
                          <Icon name="feed-heart" style={[styles.icon]} />
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.iconContainer]}>
                        <TouchableOpacity
                          style={[
                            styles.iconBackground_4,
                            {
                              backgroundColor:
                                getTestStatus == 0
                                  ? unavaliableTestColor
                                  : finishTestColor,
                            },
                          ]}
                          onPress={() =>
                            showAlert(chapter._id, chapter.chapterName, 3)
                          }>
                          <Icon name="feed-tag" style={[styles.icon]} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={[styles.iconContainer_25_2]}>
                      <TouchableOpacity
                        style={[
                          styles.iconBackground_5,
                          {
                            backgroundColor:
                              getTestStatus == 0
                                ? unavaliableTestColor
                                : finishTestColor,
                          },
                        ]}
                        onPress={() =>
                          showAlert(chapter._id, chapter.chapterName, 4)
                        }>
                        <Icon name="feed-rocket" style={[styles.icon]} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <ImageBackground
                    resizeMode="contain"
                    style={[styles.image_2]}
                    source={require('../Assets/Images/man.png')}
                  />
                </View>
                <View style={[styles.iconContainer_16_2]}>
                  <TouchableOpacity
                    style={[
                      styles.iconBackground_6,
                      {
                        backgroundColor:
                          getTestStatus == 0
                            ? unavaliableTestColor
                            : finishTestColor,
                      },
                    ]}
                    onPress={() =>
                      showAlert(chapter._id, chapter.chapterName, 5)
                    }>
                    <Icon name="x-circle-fill" style={[styles.icon]} />
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: '#2E4583',
    paddingHorizontal: '7%',
    paddingVertical: '2%',
  },
  iconContainer_16_1: {
    width: '65%',
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer_25_1: {
    width: '20%',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer_16_2: {
    width: '60%',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer_25_2: {
    width: '45%',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 10,
    alignItems: 'center',
    // backgroundColor:'red'
  },
  iconContainer_34_1: {
    flex: 1,
    width: '70%',
    flexDirection: 'column',
    // backgroundColor: 'blue',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-end',
  },
  iconContainer_34_2: {
    flex: 1,
    width: '60%',
    flexDirection: 'column',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'flex-start',
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
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: 200,
    width: 200,
    // backgroundColor:'red'
  },
  image_2: {
    flex: 1.5,
    height: 200,
    width: 200,
    transform: [{scaleX: -1}],
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
