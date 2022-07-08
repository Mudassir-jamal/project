import { renewAccessToken } from "../../apis/renewAccessTokenApi"
import { storeTokensInStorage } from "../../helper/localStorageHandles"
import { updateTokensAndAuth } from "./common"


export const renewAccessTokenHandle = (tokens,dispatch) => {
    renewAccessToken(tokens).then((res)=>{
        if(res.data.success){

            const {newAccessToken} = res?.data?.data?.[0]
            const bothTokens = {
                newAccessToken:tokens.refreshToken,
                accessToken:newAccessToken
            }
            storeTokensInStorage({...bothTokens})
            updateTokensAndAuth(dispatch,{...bothTokens})
        }
    })
}