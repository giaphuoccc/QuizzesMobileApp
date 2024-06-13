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
        <Icon name="arrow-left" style={[styles.back]}/>
        <Text style={[styles.headerText]}>What will you learn</Text>
        <Text style={[styles.hmm]}></Text>
      </View>
      <View style={[styles.mainTitle]}>
        <Icon name="book" style={[styles.titleIcon]}/>
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
    flex:1.5,
    flexDirection:'row',
    // alignContent:'center'
    // backgroundColor:'black',
    justifyContent:'space-between'
  },
  back:{
      flex:1,
      color:"white",
      fontSize:40,
      // backgroundColor:'black',
      textAlign:'center',
      textAlignVertical:'center'
  },
  headerText: {
      flex:4,
      fontSize: 30,
      fontWeight: 500,
      color: 'white',
      textAlign:'center',
      textAlignVertical: 'center',
      // backgroundColor:'yellow'
  },
  hmm:{
    flex:1,
    // backgroundColor:'yellow'
  },
  mainTitle:{
    flex:5,
    // backgroundColor:'yellow'
  },
  titleIcon: {
    flex:2,
    // backgroundColor:'black',
    fontSize:150,
    color:'white',
    textAlignVertical:'center',
    textAlign:'center'
  },
  titleText: {
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: '#FFF',
    alignSelf: 'center',
    fontStyle: 'italic',
    paddingVertical: '2%',
  },
  listOfContet: {
    flex: 8,
    margin: '1%',
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
    flex: 2,
    textAlign: 'left',
    paddingLeft: '1%',
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
    flex: 1,
    justifyContent: 'center',
    marginVertical:'2%'
  },
  buttonNext: {
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '96%',
    alignSelf: 'center',
    borderRadius: 20,
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
