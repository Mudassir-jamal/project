import { apiHandle } from "./apiHandle"


// GetvUser Dashboard Api
export const userDashboardApi = (token) =>{
    return apiHandle(token).get(`/dashboard`)
}
