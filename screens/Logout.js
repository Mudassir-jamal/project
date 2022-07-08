import { View, Text,ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { logoutUser } from '../redux/actions/common'
import { useDispatch } from 'react-redux'

export const Logout = (props) => {
    const dispatch = useDispatch()



useEffect(() => {
    logoutUser(dispatch)
    
}, [])


  return (
    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size='large' color='#ec9b01' />
    </View>
  )
}

