import {StyleSheet, View, Alert, TouchableOpacity, Image, ImageBackground, Text} from 'react-native';
import {Button} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import React, {useState} from 'react'
//import FastImage from 'react-native-fast-image';

const defaultImages = [
  require('../Assets/Images/turtle.png'), // Replace with your actual image paths
  require('../Assets/Images/turtle.png'),
  require('../Assets/Images/turtle.png'),
  require('../Assets/Images/turtle.png')
];

const PictureQuizScreen = ({navigation}) => {
  const [getQuestionText, setQuestionText] = useState("Tôi thích ăn kem.");
  return (
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
          height={100}
          width={380}
          color="#CFFF0F"
          style={styles.processBar}
        />
      </View>

      <View style={styles.body} >
        <Text style={styles.title}>Hoàn tất ghép câu.</Text>
        <View style={styles.questionGroup}>
            <Image source={require('../Assets/Images/man.png')} style={styles.imgMan}></Image>
            <View style={styles.chatBox}>
                <ImageBackground source={require('../Assets/Images/speech-bubble.png')} resizeMode="cover" style={styles.imgChatBox}>
                    <Text style={styles.chatBoxContent}>{getQuestionText}</Text>
                </ImageBackground>
            </View>
        </View>

        <View style={styles.imageContainer}>
        {defaultImages.map((image, index) => (
          <TouchableOpacity key={index} style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      </View>  



      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonNext} onPress={()=>{}}>
          <Text style={styles.textButtonNext}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
  questionGroup:{
    marginTop: 20,
    paddingLeft: 20,
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'black',
},
imgMan:{
    flex: 3,
    height: '100%',
    alignSelf: 'flex-end'
},
chatBox:{
  flex: 7,
  height: '100%',
  // backgroundColor: 'red',
},
imgChatBox:{
  flex: 1,
  width: '102.5%',
  justifyContent: 'center',
  //backgroundColor: 'green',
},
chatBoxContent:{
  marginLeft: '17%',
  marginRight: '7%',
  paddingTop: 5,
  height: 100,
  textAlign: 'left',
  color: 'black',
  fontWeight: 'bold',
  fontSize: 22,
},

imageContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
  padding: 10,
  
},

imageWrapper: {
  width: '48%',
  aspectRatio: 1,
  marginVertical: 10,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5
},
image: {
  width: '100%',
  height: '100%',
  borderRadius: 5
}


})
export default PictureQuizScreen;
