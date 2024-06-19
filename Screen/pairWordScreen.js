import {StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity} from "react-native"
import { TextInput } from "react-native-paper"
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors"

const PairWord = () => {return(
    <View >
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
)}
const styles = StyleSheet.create({
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