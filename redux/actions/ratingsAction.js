import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ToastAndroid } from "react-native";
import { postRatingsApiHandle } from "../../apis/ratingsApi";
import { getOrdersHandle } from "./ordersActions";



export const createRatingsHandle = (token,data,navigation,orderId,dispatch,setLoading) => {
    postRatingsApiHandle(token,data,orderId).then((res)=>{
        console.log('res=================>',res.status    );
        if(res.status >= 200 && res.status <= 215){
            
                ToastAndroid.show("Thankew For FeedBack...!", ToastAndroid.LONG)
                     getOrdersHandle(token,dispatch)
               getOrderByIdHandle(token, orderId, dispatch);

                
                navigation.goBack()
                     setLoading(false)
            // getOrdersHandle(token,dispatch)
        }
    })
    .catch((error)=>{
        // console.log('error ==============> ',error);
        ToastAndroid.show(error?.response?.data?.message?.[0], ToastAndroid.LONG);
        Alert.alert(error?.response?.data?.message?.[0])
        navigation.goBack()

        console.log(error?.response.status,"error  =============")
        setLoading(false)
    })
}
