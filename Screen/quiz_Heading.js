import {StyleSheet, View, Alert, TouchableOpacity } from "react-native"
import { Button, Text } from "react-native-paper"
import * as Progress from 'react-native-progress';

const Heading = () => {return(
    <View style={styles.container}>
        <View style={styles.heading}>
        <View style={[styles.button]}>
          <TouchableOpacity style={[styles.buttonNext]}>
              <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
        </View>
        <Progress.Bar 
            progress={0.9}  
            unfilledColor="black"
            borderRadius={200}
            borderColor="#086CA4"
            height={"100%"}
            width={800}
            color= "#CFFF0F"
            style={styles.processBar}/>
        </View>
    </View>
)}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#086CA4", 
        width: '100%', 
        height: '100%',
        paddingVertical: '2.5%',
        paddingHorizontal: '5%'
    },
    heading:{
        flexDirection: 'row',
        height: '8%',
        backgroundColor: "blue",
        justifyContent: "space-between"
    },
    button:{
        height: "100%",
        justifyContent: 'center',
      },
      buttonNext:{
        backgroundColor:'white',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius:40,
        borderWidth:0.5,
        borderColor:'#3572EF'
      },
      buttonText:{
        color: '#33B6FF',
        fontSize: 120,
        fontWeight: 'bold',
        textAlign:'center',
        textTransform:'uppercase'
      },
      processBar:{
        justifyContent: 'center',
      },

})
export default Heading