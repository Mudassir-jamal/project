import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Otp from '../screens/Otp';
import { createStackNavigator } from '@react-navigation/stack';
// import { mainColor } from '../Helper/ReuseAble-StyleSheet';

const Stack = createStackNavigator();



const AuthStackNavigator = () => {

const options={
    
    // headerStyle: {
    //   backgroundColor: mainColor,
    // },
    // headerTintColor: '#fff',
    // headerTitleAlign: 'center',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    
    // },
    headerShown :false
  }
  return (
    <>
    {/* <Stack.Screen name="Login" component={HomeScreen} /> */}
   
    <Stack.Navigator>

      <Stack.Screen  options={options} name="Login" component={Login} />
      <Stack.Screen options={options} name="Signup" component={SignUp} />
      <Stack.Screen options={options} name="Otp" component={Otp} />
    </Stack.Navigator>
    

    </>
  
  )
}

export default AuthStackNavigator