import { apiHandle } from "./apiHandle";


// logout customer api
export const logoutApi = (token) =>{
    return apiHandle(token).post(`/logout`)
}