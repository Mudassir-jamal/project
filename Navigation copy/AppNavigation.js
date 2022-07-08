import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { isJwtExpired } from "jwt-check-expiration";
import { useDispatch, useSelector } from "react-redux";
// import MainStack from './MainStack';
import MainStack, { Article } from "./MainStack"
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles, {  Globalstyles, mainColor } from '../helper/ReuseAble-StyleSheet';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { logoutUser, updateTokensAndAuth } from '../redux/actions/common';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();




const AppNavigation = () => {

  const { userState, isLoading } = useSelector(
    (state) => state.userStateReducer
    );
    
    const dispatch = useDispatch()
    
    
    useEffect(() => {
      checkAuth(dispatch)
    
    
    },[])
    

const checkAuth = async (dispatch) => {
  const accessToken = await AsyncStorage.getItem("@storage_accessToken");
  const refreshToken = await AsyncStorage.getItem("@storage_refreshToken");
  console.log(accessToken);
  if (accessToken) {
    if (isJwtExpired(accessToken) === false) {
      updateTokensAndAuth(dispatch, {
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
    } else {
      if (isJwtExpired(refreshToken) === false) {
        renewAccessTokenHandle({ refreshToken, accessToken }, dispatch);
      } else {
        logoutUser(dispatch);
      }
    }
  } else {
    logoutUser(dispatch);
  }
};
// logoutUser(dispatch);


  return (
    <>
        <NavigationContainer>
    
            

            {/* <AuthStackNavigator stack={Stack} /> */}
            {/* {AuthStackNavigator(Stack) } */}
            
            {/* {
            !userState ?
            
            <Stack.Navigator>

            <Stack.Screen   name="Login" component={Login} />
            <Stack.Screen  name="Signup" component={SignUp} />
            <Stack.Screen  name="Otp" component={Otp} />
          </Stack.Navigator> : 
          isLoading ? <ActivityIndicator /> :
           
            
            } */}
            {isLoading ? 
             <View style={GlobalStyles.center}>
                <ActivityIndicator color={mainColor} size="large"/> 
              </View>
              :
              !userState ?
              <AuthStackNavigator />
              :
              <MainStack />
            }
            

        


         

       
        </NavigationContainer>
       
    </>
  )
}

export default AppNavigation