import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const RankingScreen = ({navigation}) => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#086CA4',
        flexDirection: 'column',
        
      }}>
      <View style={styles.headerSection}>
        <Icon name="arrow-left" style={[styles.back]} onPress={() => navigation.popToTop()}/>
        <Text style={[styles.headerText]}>LEADERBOARD</Text>
        <Text style={[styles.hmm]}></Text>
      </View>
      <View style={[styles.mainTitle]}>
        <Icon name="globe" style={[styles.rankIcon]}/>   
        <Text style={styles.titleText}>Compete with your friend</Text>
        <View style={[styles.counter]}>
            <Text style={[styles.textTimer]}>Update after:</Text>
            <Text style={[styles.timer]}>00:00:00</Text>
        </View>
      </View>
      <View style={[styles.listOfRank]}>
        <View style={[styles.memberContent]}>
            <Text style={styles.placement}>1</Text>
            <Icon name="user" style={[styles.avatar]} />
            <Text style={styles.memberName}>Name</Text>
            <Text style={styles.rankValue}>20</Text>
            <Icon name="rocket" style={[styles.measurement]} />
        </View>
        <View style={[styles.memberContent]}>
            <Text style={styles.placement}>1</Text>
            <Icon name="user" style={[styles.avatar]} />
            <Text style={styles.memberName}>Name</Text>
            <Text style={styles.rankValue}>20</Text>
            <Icon name="rocket" style={[styles.measurement]} />
        </View>
        <View style={[styles.memberContent]}>
            <Text style={styles.placement}>1</Text>
            <Icon name="user" style={[styles.avatar]} />
            <Text style={styles.memberName}>Name</Text>
            <Text style={styles.rankValue}>20</Text>
            <Icon name="rocket" style={[styles.measurement]} />
        </View>
        <View style={[styles.memberContent]}>
            <Text style={styles.placement}>1</Text>
            <Icon name="user" style={[styles.avatar]} />
            <Text style={styles.memberName}>Name</Text>
            <Text style={styles.rankValue}>20</Text>
            <Icon name="rocket" style={[styles.measurement]} />
        </View>
        <View style={[styles.memberContent]}>
            <Text style={styles.placement}>1</Text>
            <Icon name="user" style={[styles.avatar]} />
            <Text style={styles.memberName}>Name</Text>
            <Text style={styles.rankValue}>20</Text>
            <Icon name="rocket" style={[styles.measurement]} />
        </View>
        <View style={[styles.memberContent]}>
            <Text style={styles.placement}>1</Text>
            <Icon name="user" style={[styles.avatar]} />
            <Text style={styles.memberName}>Name</Text>
            <Text style={styles.rankValue}>20</Text>
            <Icon name="rocket" style={[styles.measurement]} />
        </View>
      </View>
    </View>
  )
}

export default RankingScreen

const styles = StyleSheet.create({
    headerSection: {
        flex:0.5,
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
        flex:2,
        justifyContent:'space-around',
    },
    rankIcon:{
        flex:2,
        // backgroundColor:'black',
        fontSize:150,
        color:'white',
        textAlignVertical:'center',
        textAlign:'center'
    },
    titleText:{
        color:'white',
        fontWeight:'350',
        fontStyle:'italic',
        fontSize:25,
        textAlign:'center'
    },
    counter:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textTimer:{
        color:'white',
        fontWeight:'bold',
        fontSize:23,
    },
    timer:{
        color:'red',
        fontWeight:'bold',
        fontSize:23,
    },
    listOfRank:{
        flex:3,
        margin:'1%',
        justifyContent:'space-between',
    },
    memberContent: {
        flex: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 7,
        marginVertical: '1%',
        width: '99%',
        alignSelf: 'center',
      },
    placement: {
        flex: 0.5,
        textAlignVertical: 'center',
        textAlign:'right',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#33B6FF',
        // backgroundColor:'black',
    },
    avatar: {
        flex:1,
        // backgroundColor:'#33B6FF',
        textAlign:'center',
        textAlignVertical:'center',
        color:'#33B6FF',
        fontSize:40,
    },
    memberName: {
        flex:4,
        textAlignVertical: 'center',
        paddingLeft:'2%',
        fontSize: 20,
        fontWeight: '400',
        color: '#33B6FF',
        // backgroundColor:'yellow'
    },
    rankValue: {
        flex: 0.75,
        textAlignVertical: 'center',
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        // backgroundColor:'blue',
    },
    measurement: {
        flex:1,
        // backgroundColor:'black',
        color:"red",
        fontSize:30,
        textAlign:'center',
        textAlignVertical:'center'
     
    },
     

})