import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeTokensInStorage = async (value) => {
      // const jsonValue = JSON.stringify(value)
      // { refreshToken, accessToken }
      await AsyncStorage.setItem('@storage_accessToken', value.accessToken)
      await AsyncStorage.setItem('@storage_refreshToken', value.refreshToken)
    
}



export const storeLocation = async (value) => {

      await AsyncStorage.setItem('@storage_location', value)
            
}