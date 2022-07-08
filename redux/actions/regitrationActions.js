import { registrationApi, verifyRegistrationApi } from "../../apis/registrationApi"
import { USER_ACTIVE_STATE } from "../contants/user_state_constants"
import { UPDATE_USER_AUTH_TOKENS } from "../contants/user_tokens_constants"
import { Alert, ToastAndroid } from 'react-native'
import { storeLocation, storeTokensInStorage } from "../../helper/localStorageHandles"
import { updateTokensAndAuth } from "./common"
import { SAVE_LOCATION_AND_ADDRESS, SAVE_LOCATION_COORDINATES } from "../contants/location_constants"
import { dispatchDeviceIdHandler } from "./deviceIdAction"
import Toast from 'react-native-toast-message'




export const registrationHandle = (data, navigation, setLoading) => {
    registrationApi(data).then((res) => {

        if (res.data.success) {
            
            navigation.navigate('Otp', { phone: data.phone, origin: 'registration' })
             

            setLoading(false)
        }
    })
        .catch((error) => {
            // console.log('registrationHandle===========>', error?.response?.data?.message?.[0])
            setLoading(false)
            Toast.show({
                type: 'error',
                text1:error?.response?.data?.message?.[0] 
              });
      
            // ToastAndroid.show(error?.response?.data?.message?.[0], ToastAndroid.LONG);
            // Alert.alert(error?.response?.data?.message?.[0])
        })
}



export const verifyRegistrationHandle = (data, dispatch, navigation,expoPushToken) => {
    verifyRegistrationApi(data).then((res) => {
        if (res.data.success) {


            const { refreshToken, accessToken } = res?.data?.data?.[0]

            updateTokensAndAuth(dispatch, { refreshToken, accessToken })
            storeTokensInStorage({ refreshToken, accessToken })
            
            
          console.log(accessToken)
            // navigation.navigate('Home')
            
            Toast.show({
                type: 'success',
                text1:'Phone number registered Successfully'
              });
            // ToastAndroid.show("Phone number registered Successfully", ToastAndroid.LONG)
            
            // if(expoPushToken)
            // {
                
            //     dispatchDeviceIdHandler(accessToken,expoPushToken)
            // }


            // if (location_coordinates !== null) {
            //     storeLocation(location_coordinates)
            //     dispatch({
            //         type: SAVE_LOCATION_COORDINATES,
            //         payload: location_coordinates
            //     })
            // }
            // else{
            //     dispatch({
            //         type:SAVE_LOCATION_AND_ADDRESS,
            //         payload:null
            //     })
            // }

            // alert('Phone number registered successfully!')
        }
    })
        .catch((error) => {
            Toast.show({
                type: 'error',
                text1:error?.response?.data?.message?.[0]
              });
            // ToastAndroid.show(error?.response?.data?.message?.[0], ToastAndroid.LONG);
            // Alert.alert(error?.response?.data?.message?.[0])   
             })
}
