import { View, Text,StyleSheet,ActivityIndicator,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'

const {height,width} = Dimensions.get('window')
const OrderNowButton = (props) => {
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

export default OrderNowButton



const styles = StyleSheet.create({
    
    loadingButton: {
      marginTop: 15,
      alignItems: 'center',
      backgroundColor: '#ec9b014d',
      // borderColor:'lightgray',
      // borderWidth:1,
      borderRadius: 15,
      paddingVertical: 20,
      width: width - 135,
      marginBottom: 20,
      marginTop: 20,
      justifyContent:'center',
    },
    button: {
      marginTop: 15,
      alignItems: 'center',
      backgroundColor: '#ec9b01',
      borderRadius: 15,
      paddingVertical: 15,
      width: width - 135,
      marginBottom: 20,
      marginTop: 20
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight:'bold'
      },
  });
  