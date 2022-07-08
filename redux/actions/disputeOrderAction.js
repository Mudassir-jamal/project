import { Alert, ToastAndroid } from "react-native"
import { disputeOrderApi } from "../../apis/disputeOrderApi"

export const dispatchOrderHandle = (token, data, navigation,setLoading) => {
    

    disputeOrderApi(token,data).then((res) => {
        // if (res.data.success) {
            ToastAndroid.show("Successfully submitted!", ToastAndroid.LONG)
            navigation.navigate('ORDERS')
            setLoading(false)
        // }
        // setLoading(false)
    })
        .catch((error) => {
            ToastAndroid.show(error?.response?.data?.message?.[0], ToastAndroid.LONG);
            Alert.alert(error?.response?.data?.message?.[0])
            setLoading(false)
        })
}