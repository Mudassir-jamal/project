// import { userDashboardApi } from "../../apis/userDashboardApi"
import { ERROR_IN_GETTING_USER_DASHBOARD_DATA, SAVE_USER_DASHBOARD_DATA, START_GETTING_USER_DASHBOARD_DATA } from "../contants/user_dashboard_constants"

// export const getUserDashboard = (token,dispatch) => {


//     dispatch({
//         type:START_GETTING_USER_DASHBOARD_DATA
//     })
    

//     userDashboardApi(token).then((res)=>{
//         if(res.data.success){
//             dispatch({
//                 type:SAVE_USER_DASHBOARD_DATA,
//                 payload:res?.data?.data
//             })
//         }
//     })
//     .catch((error)=>{
//         dispatch({
//             type:ERROR_IN_GETTING_USER_DASHBOARD_DATA,
//             payload:error?.response?.data?.message?.[0]
//         })
//         console.log(error?.response?.data?.message?.[0])
//         setLoading(false)
//     })

// }