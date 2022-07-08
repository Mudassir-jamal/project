import { apiHandle } from "./apiHandle";


// Renew Access Token
export const renewAccessToken = (tokens) => {
    const {accessToken,refreshToken} = tokens
    return apiHandle(accessToken).post(`/renewAccessToken`,{refreshToken:refreshToken})
}