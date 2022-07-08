import { apiHandle } from "./apiHandle";


// registration customer api
export const registrationApi = (data) =>{
    return apiHandle().post(`/sendOtpForRegistration`,data)
}

// verify registration customer api
export const verifyRegistrationApi = (data) =>{
    return apiHandle().post(`/verifyRegistration`,data)
}