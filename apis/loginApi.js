import { apiHandle } from "./apiHandle";


//  login customer api 
export const loginApi = (data) =>{
    return apiHandle().post(`/sendOtpForLogin`,data)
}
// data = {
//     "phone":"03242303168",
//     "name":"Anas"
// }



// verify login customer api 
export const verifyLoginApi = (data) =>{
    return apiHandle().post(`/verifyLogin`,data)
}
// data = {
//     "Otp":"22GtsHWR",
//     "phone":"03012671774"
// }