import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const apiUrl = 'https://faizy-back.herokuapp.com/rider'






// export const apiHandle = async (token) => {

//   const accessToken = await AsyncStorage.getItem('@storage_accessToken')
//   const refreshToken = await AsyncStorage.getItem('@storage_refreshToken')



//   return axios.create({
//     baseURL: apiUrl,
//     headers: token ? {
//       ...axios.defaults.headers,
//       Authorization: `Bearer ${token}`
//     } : {
//       ...axios.defaults.headers,
//       // Authorization: `Bearer ${token}`
//     }
//   })
// }


export const apiHandle =  (token, multipart=false) => {

  let multipartData = multipart?{"Content-Type":"multipart/form-data", Accept:"application/json"}:"";
  return axios.create({
    baseURL: apiUrl,
    headers: token ? {
      ...axios.defaults.headers,
      Authorization: `Bearer ${token}`,
      ...multipartData
    } : {
      ...axios.defaults.headers,
      // Authorization: `Bearer ${token}`
    }
  })
}