import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useSelector } from "react-redux";
import React, { useState } from 'react'
import FormSubmitButton from '../assets/buttons/FormSubmitButton';
import SaveAddressButton from '../assets/buttons/SaveAddressButton';
import { updateLocationApi } from '../apis/userLocationApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAVE_LOCATION_COORDINATES } from '../redux/contants/location_constants';
import { dispatchOrderHandle } from '../redux/actions/disputeOrderAction';

const DisputeOrder = (props) => {
    const { route, navigation } = props

    const paramsRoute = route.params

    const {accessToken,refreshToken} = useSelector(state=>state.userTokensReducer.userTokens)

    const [comments, setComments] = useState('')
    const [loading, setLoading] = useState(false)


    const disputeHandle = () => {
 
        const data =  {
            order_id:paramsRoute.id,
            comments:comments
        }

        dispatchOrderHandle(accessToken, data, navigation,setLoading)


    }



    // const {accessToken,refreshToken} = useSelector(state=>state.userTokensReducer.userTokens)

    // const updateLocationHandle = async () => {


    //     setLoading(true)
    //     const accessToken = await AsyncStorage.getItem('@storage_accessToken')

    //     const dataObj = {
    //         location_coordinates: paramsRoute.coordinates,
    //         // location_coordinates:,
    //         address: address
    //     }


    //     updateLocationApi(accessToken, dataObj).then(async (res) => {
    //         setLoading(false)
    //         alert('Address and location saved successfully!')
    //         navigation.navigate('Tabs')

    //         if (dataObj.location_coordinates) {
    //             dispatch({
    //                 type: SAVE_LOCATION_COORDINATES,
    //                 payload: dataObj.location_coordinates
    //             })

    //             await AsyncStorage.setItem('@storage_location', dataObj.location_coordinates)
    //         }
    //     })
    //         .catch((error) => {
    //             setLoading(false)
    //             console.log(error);
    //             // alert(error?.response?.data?.message?.[0])
    //         })
    // }


    return (
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
            <View style={{ marginBottom: 10 }}>
                <TextInput
                    style={styles.additionalInfo}
                    multiline
                    onChangeText={setComments}
                    numberOfLines={6}
                    placeholder="Please write the issue here..."
                    placeholderStyle={{ justifyContent: "flex-start" }}
                />
            </View>

            <SaveAddressButton 
            loading={loading} disabled={comments ? false : true} 
            onPressHandle={disputeHandle} 
            buttonCaption='Submit'
             />

            {/* {address ? <TouchableOpacity  style={{justifyContent:'center',backgroundColor:'#ec9b01',paddingVertical:12,borderRadius:10}}>
                <Text style={{textAlign:'center',color:'white'}}>Save Address</Text>
            </TouchableOpacity> :
            <TouchableOpacity disabled style={{justifyContent:'center',backgroundColor:'#d1cfcf',paddingVertical:12,borderRadius:10}}>
                <Text style={{textAlign:'center',color:'white'}}>Save Address</Text>
            </TouchableOpacity>} */}

        </View>
    )
}

export default DisputeOrder

const styles = StyleSheet.create({
    additionalInfo: {
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: "#D9D9D9",
        marginTop: 20,
        // width: "100%",
        borderRadius: 8,
        paddingHorizontal: 20,
    },
})