import {StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity} from "react-native"
import * as Progress from 'react-native-progress';
import IconFontisto from 'react-native-vector-icons/Fontisto';
const PairWord = ({navigation}) => {return(
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={{width: "10%", height: "100%", justifyContent: 'center',}}>
          <TouchableOpacity style={[styles.buttonClose] }>
            <IconFontisto name="close-a" style={{ fontSize: 36}} color="black" 
              onPress={()=> navigation.navigate('HomeScreen')}/>
          </TouchableOpacity> 
        </View>
        <Progress.Bar
          progress={0.9}
          unfilledColor="black"
          borderRadius={200}
          borderColor="#086CA4"
          height={1000}
          width={380}
          color="#CFFF0F"
          style={styles.processBar}
        />
      </View>
      <View style = {styles.body}>
        <Text style={styles.title}>Chọn cặp từ tương ứng.</Text>
        <View style={styles.answerGroup}>
            <View style={styles.leftColumn}>
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>a</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>an</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>the</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>once</Text>
                </TouchableOpacity> 
            </View>
            <View style={styles.rightColumn}>
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>a</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>an</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>the</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.answerBtn }>
                    <Text style={styles.answerBtnText}>once</Text>
                </TouchableOpacity> 
                
            </View>
        </View>
      </View>
      <View style = {styles.footer}>
        <TouchableOpacity style={styles.buttonNext } onPress={()=>{}}>
          <Text style={styles.textButtonNext}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
    
)}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#086CA4',
        width: '100%',
        height: '100%',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
    },
    heading: {
    flexDirection: 'row',
    height: '5%',
    width: '100%',
    justifyContent: 'space-between',
    },
    buttonClose: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 40,
    },
    body: {
    marginVertical: '5%',
    height: '80%',
    },
    footer: {
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    borderRadius: 20,
    },
    buttonNext: {
    height: '100%',
    justifyContent: 'center',
    },
    textButtonNext: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    title:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        height: 40,
    },
    answerGroup:{
        marginTop: '5%',
        height: '90%',
        // backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    leftColumn:{
        // backgroundColor: 'red',
        width: '47.5%',
        justifyContent: 'space-evenly'
    },
    rightColumn:{
        // backgroundColor: 'blue',
        width: '47.5%',
        justifyContent: 'space-evenly'
    },
    answerBtn:{
        backgroundColor: "white",
        height: '20%',
        justifyContent: 'center',
        borderRadius: 20
    },
    answerBtnText:{
        alignSelf: 'center',
        color: 'black',
        fontSize: 26
    },
        
    
})
export default PairWord