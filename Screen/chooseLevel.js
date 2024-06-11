import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RadioButton } from 'react-native-paper';


const homeScreen = () => {
  const [checked, setChecked] = useState('first');
  return (
    <View style={{height:'100%', flexDirection: 'column'}}>
       <View style={styles.headerSection}>
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

            <TouchableOpacity onPress={() => setChecked('fourth')} style={[styles.contentContainer]}>
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
        <Text>
          Hello</Text>
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
    fontWeight: 'bold',
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
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
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
    color: '#555'
  },
  footerSection:{
    flex: 5
  },

})

export default homeScreen