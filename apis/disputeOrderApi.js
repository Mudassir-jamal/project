import { apiHandle } from "./apiHandle"


// Dispute Order Api
export const disputeOrderApi = (token,data) =>{
    return apiHandle(token).post(`/orderDisputes`,data)
}
