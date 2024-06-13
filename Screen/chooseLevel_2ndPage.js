import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const BriefPage = () => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#086CA4',
        flexDirection: 'column',
      }}>
      <View style={styles.headerSection}>
        {/* <Icon name="left" style={{ fontSize: 20 }} color="white" /> */}
        <Text style={[styles.headerText]}>What will you learns</Text>
      </View>
      <View>
        <View style={[styles.later]}></View>
        {/* <Icon name="" style={{ fontSize: 20 }} color="white" /> */}
        <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
          Let's see what you will be learning through topics, skills and
          difficulties
        </Text>
      </View>
      <View style={styles.listOfContet}>
        <View style={styles.contents}>
          <Text style={styles.topicContent}>Music</Text>
          <Text
            style={styles.skillContent}
            numberOfLines={2}
            ellipsizeMode="tail">
            Grammer, Vocabularies, Reading
          </Text>
          <View style={styles.difficulty}>
            <View style={styles.indicatorContainer}>
              <View
                style={[styles.indicator, {backgroundColor: '#61FF00'}]}></View>
              <View
                style={[styles.indicator, {backgroundColor: '#ECFF15'}]}></View>
              <View
                style={[styles.indicator, {backgroundColor: '#FF0000'}]}></View>
            </View>
          </View>
        </View>
        <View style={styles.contents}>
          <Text style={styles.topicContent}>hehe</Text>
          <Text style={styles.skillContent}>hmmm</Text>
          <View style={styles.difficulty}>
            <View
              style={[styles.indicator, {backgroundColor: '#FF0000'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#ECFF15'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#61FF00'}]}></View>
          </View>
        </View>
        <View style={styles.contents}>
          <Text style={styles.topicContent}>hehe</Text>
          <Text style={styles.skillContent}>hmmm</Text>
          <View style={styles.difficulty}>
            <View
              style={[styles.indicator, {backgroundColor: '#FF0000'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#ECFF15'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#61FF00'}]}></View>
          </View>
        </View>
        <View style={styles.contents}>
          <Text style={styles.topicContent}>hehe</Text>
          <Text style={styles.skillContent}>hmmm</Text>
          <View style={styles.difficulty}>
            <View
              style={[styles.indicator, {backgroundColor: '#FF0000'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#ECFF15'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#61FF00'}]}></View>
          </View>
        </View>
        <View style={styles.contents}>
          <Text style={styles.topicContent}>hehe</Text>
          <Text style={styles.skillContent}>hmmm</Text>
          <View style={styles.difficulty}>
            <View
              style={[styles.indicator, {backgroundColor: '#FF0000'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#ECFF15'}]}></View>
            <View
              style={[styles.indicator, {backgroundColor: '#61FF00'}]}></View>
          </View>
        </View>
      </View>
      <View style={[styles.button]}>
        <TouchableOpacity style={[styles.buttonNext]}>
          <Text style={styles.buttonText}>LET'S START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BriefPage;

const styles = StyleSheet.create({
  headerSection: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 500,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  later: {
    height: 150,
  },
  titleText: {
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: '#FFF',
    alignSelf: 'center',
    fontStyle: 'italic',
    paddingVertical: '5%',
  },
  listOfContet: {
    flex: 9,
    marginHorizontal: '1%',
  },
  contents: {
    flex: 13,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: '1%',
    width: '99%',
    alignSelf: 'center',
  },
  topicContent: {
    flex: 3,
    textAlign: 'left',
    paddingLeft: '5%',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#33B6FF',
  },
  skillContent: {
    flex: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#33B6FF',
  },
  difficulty: {
    flex: 3,
    justifyContent: 'center',
  },
  indicatorContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: '27%',
    height: 7,
    marginHorizontal: 1,
    backgroundColor: 'black',
    alignSelf: 'center',
    borderRadius: 4,
  },
  button: {
    flex: 2,
    justifyContent: 'center',
  },
  buttonNext: {
    height: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '98%',
    alignSelf: 'center',
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: '#3572EF',
  },
  buttonText: {
    color: '#33B6FF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
