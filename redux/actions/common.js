import AsyncStorage from "@react-native-async-storage/async-storage"
import { logoutApi } from "../../apis/logoutApi"
import { LOGOUT_USER } from "../contants/logout_constants"
import { USER_ACTIVE_STATE } from "../contants/user_state_constants"
import { UPDATE_USER_AUTH_TOKENS } from "../contants/user_tokens_constants"
// import { LOGOUT_USER } from "../contants/logout_constants"
// import { USER_ACTIVE_STATE } from "../contants/user_state_constants"
// import { UPDATE_USER_AUTH_TOKENS } from "../contants/user_tokens_constants"




export const updateTokensAndAuth = (dispatch,tokens) => {
    dispatch({
        type : USER_ACTIVE_STATE,
        
    })

    dispatch({
        type : UPDATE_USER_AUTH_TOKENS,
        payload : tokens
    })


}



export const logoutUser = (dispatch) => {

    // logoutApi(token).then((res)=>{

    // })
    //  AsyncStorage.removeItem("@storage_accessToken");
    //  AsyncStorage.removeItem("@storage_refreshToken");

    // const accessToken =  AsyncStorage.getItem("@storage_accessToken");
    // const refreshToken = await AsyncStorage.getItem("@storage_refreshToken");
    // console.log('Data removed')
    AsyncStorage.clear()
    dispatch({
        type:LOGOUT_USER,
    })
}