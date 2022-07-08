import { View, Text,StyleSheet,ActivityIndicator,TouchableOpacity } from 'react-native'
import React from 'react'
import { mainColor } from '../../helper/ReuseAble-StyleSheet'

const FormSubmitButton = (props) => {
    const {loading, onPressHandle, buttonCaption} = props

    return (
        <View>
            {loading ? <View style={styles.loadingButton}>
                <ActivityIndicator color="white" />
            </View> :  <TouchableOpacity style={{...styles.button}} onPress={onPressHandle}>
                <Text style={{...styles.text}}>{buttonCaption}</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default FormSubmitButton



const styles = StyleSheet.create({
    
    loadingButton: {
      marginTop: 15,
      alignItems: 'center',
      backgroundColor: '#ec9b014d',
      // borderColor:'lightgray',
      // borderWidth:1,
      borderRadius: 10,
      padding: 10,
      height: 50,
      width: 280,
      marginBottom: 20,
      marginTop: 20,
      justifyContent:'center',
    },
    button: {
      marginTop: 15,
      alignItems: 'center',
      backgroundColor: mainColor,
      borderRadius: 10,
      padding: 10,
      height: 50,
      width: 280,
      marginBottom: 20,
      marginTop: 20
    },
    text: {
        color: 'white',
        fontSize: 20,
      },
  });
  