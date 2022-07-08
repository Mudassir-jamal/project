import { View, Text,StyleSheet,ActivityIndicator,TouchableOpacity } from 'react-native'
import React from 'react'

const DisputeOrderButton = (props) => {
    const {loading, onPressHandle, buttonCaption} = props

    return (
        <View>
            {loading ? <View style={styles.loadingButton}>
                <ActivityIndicator color="#EBA620" />
            </View> :  <TouchableOpacity style={{...styles.button}} onPress={onPressHandle}>
                <Text style={{...styles.text}}>{buttonCaption}</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default DisputeOrderButton



const styles = StyleSheet.create({
    
    loadingButton: {
        paddingVertical: 15, 
        width: '100%', 
        borderColor: '#EBA620',
         borderWidth: 1, 
         borderRadius: 10,
         justifyContent:'center',
    },
    button: {
        paddingVertical: 15, 
        width: '100%', 
        borderColor: 'red',
         borderWidth: 1, 
         borderRadius: 10,
    },
    text: {
        textAlign: 'center', 
        color: 'red' 
      },
  });
  