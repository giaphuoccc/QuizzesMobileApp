import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';


const homeScreen = () => {
  const [checked, setChecked] = useState('first');
  return (
    <View style={{height:'100%', flexDirection: 'column'}}>
       <View style={styles.headerSection}>
       {/* <Icon name="left" style={{ fontSize: 20 }} color="white" /> */}
       <Text 
        style={[styles.headerText]}>Greetings</Text>
      </View>
      <View style={styles.contentSection}>
        <Text style={[ styles.contentTitle]}>
          Pick Your Study Goal</Text>
          <View style={[styles.contentSelection]}>

            <TouchableOpacity onPress={() => setChecked('first')} style={[styles.contentContainer]}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <View style={styles.contentDescription}>
                <Text style={styles.label}>Casual</Text>
                <Text style={styles.description}>5 minutes a day</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setChecked('secound')} style={[styles.contentContainer]}>
              <RadioButton
                value="secound"
                status={checked === 'secound' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('secound')}
              />
              <View style={styles.contentDescription}>
                <Text style={styles.label}>Regular</Text>
                <Text style={styles.description}>10 minutes a day</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setChecked('third')} style={[styles.contentContainer]}>
              <RadioButton
                value="third"
                status={checked === 'third' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('third')}
              />
              <View style={styles.contentDescription}>
                <Text style={styles.label}>Serious</Text>
                <Text style={styles.description}>15 minutes a day</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setChecked('fourth')} style={[styles.contentContainer, { borderBottomWidth:0}]}>
              <RadioButton
                value="fourth"
                status={checked === 'fourth' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('fourth')}
              />
              <View style={styles.contentDescription}>
                <Text style={styles.label}>Extreme</Text>
                <Text style={styles.description}>20 minutes a day</Text>
              </View>
            </TouchableOpacity>

          </View>
      </View>
      <View style={styles.footerSection}>
        <View style={styles.footerTips}>
          <Image 
            source={require('../Assets/Images/turtle.png')}
            style={styles.footerImage}></Image>
          <Text style={styles.tips} numberOfLines={2} ellipsizeMode='tail'>
            You can always change your goals later.</Text>
        </View>
        <View style={[styles.button]}>
          <TouchableOpacity style={[styles.buttonNext]}>
              <Text style={styles.buttonText}>Set My Goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerSection:{
    flex: 1,
    backgroundColor: '#086CA4',
    justifyContent:'center'
  },
  headerText:{
    fontSize: 30,
    fontWeight: 500,
    color: 'white',
    textAlign: 'center',
    textAlignVertical:'center'
  },
  contentSection:{
    flex: 6,
    flexDirection:'column',
    justifyContent:'center',
  },
  contentTitle:{
    flex: 1,
    fontSize: 30,
    color:'#3572EF',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical:'center', 
    width: '97%',
    fontWeight: '350',
  },
  contentSelection:{
    flex:5,
    textAlign: 'center',
    alignItems: 'center'
  },
  contentContainer:{
    flexDirection: 'row',
    flex:1,
    paddingHorizontal: 0.5,
    alignItems: 'center',
    borderColor:'black',
    borderBottomWidth: 0.2,
    width: '99%',
  },
  contentDescription:{
    flexDirection: 'row',
    flex:10
  },
  label: {
    flex:3,
    fontSize: 22,
    textAlign:'left',
    color:"#3572EF"
  },
  description: {
    flex: 7,
    fontSize: 18,
    textAlign:'right',
    color: '#555',
    fontStyle:'italic'
  },
  footerSection:{
    flex:5,
    flexDirection:'column',
    backgroundColor:'#EEEEEE'
  },
  footerTips:{
    flex: 9,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    
  },
  footerImage:{
    height: '50%',
    width: '45%',
    top:'10%'
  },
  tips:{
    width:'50%',
    textAlign:'center',
    fontSize:15,
    padding:18,
    fontWeight:'bold',
    color:"#3572EF",
    borderColor:'black',
    borderRadius: 10,
    borderWidth: 1,
    bottom:'5%'
  },
  button:{
    flex: 5,
    justifyContent: 'center',
  },
  buttonNext:{
    height:'50%',
    backgroundColor:'white',
    justifyContent: 'center',
    width:'80%',
    alignSelf:'center',
    borderRadius:40,
    borderWidth:0.5,
    borderColor:'#3572EF'
  },
  buttonText:{
    color: '#3572EF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    textTransform:'uppercase'
  }

})

export default homeScreen