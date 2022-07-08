import { apiHandle } from "./apiHandle";


//  Device id api 
export const sendDeviceIdApi= (token,data) =>{
    return apiHandle(token).post(`/registerDevice/${data}`)
}