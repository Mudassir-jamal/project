import { View, Text,StyleSheet,ActivityIndicator,TouchableOpacity } from 'react-native'
import React from 'react'

const SaveAddressButton = (props) => {
    const {loading, onPressHandle, buttonCaption,disabled} = props
  return (
      <View>
            {loading ? <View style={styles.loadingButton}>
                <ActivityIndicator color="white" />
            </View> :  <TouchableOpacity disabled={disabled} style={{...styles.button,backgroundColor:disabled ? '#d1cfcf' : '#ec9b01'}} onPress={onPressHandle}>
                <Text style={{...styles.text}}>{buttonCaption}</Text>
            </TouchableOpacity>}
        </View>
  )
}

export default SaveAddressButton


const styles = StyleSheet.create({
    
    loadingButton: {
      alignItems: 'center',
      backgroundColor: '#ec9b014d',
      // borderColor:'lightgray',
      // borderWidth:1,
      borderRadius: 10,
      padding: 10,
      width:'100%',
      height: 50,
      marginBottom: 20,
      justifyContent:'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#ec9b01',
      borderRadius: 10,
      padding: 10,
      height: 50,
      width:'100%',
      marginBottom: 20,
    },
    text: {
        color: 'white',
        fontSize: 20,
      },
  });
  