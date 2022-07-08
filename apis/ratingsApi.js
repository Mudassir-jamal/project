import { apiHandle } from "./apiHandle"




// post constumer ratings By ID Api
export const postRatingsApiHandle = (token,data,orderId) =>{
    console.log(data,orderId,"id=====================")
    return apiHandle(token).post(`/ratings/${orderId}`,data)
}
