import { View, Text } from "react-native";
import React,{useEffect} from "react";
import { NavigationApp } from "./navigation/NavigationApp";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerNavigation from "./navigation/DrawerNavigation";
import UserAddress from "./screens/UserAddress";
import * as ScreenOrientation from 'expo-screen-orientation';
import AppNavigation from "./Navigation copy/AppNavigation";
import Toast from 'react-native-toast-message';

export const App = () => {
  useEffect(() => {
    changeScreenOrientation()
  },[])


  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  
  return (

    <Provider store={store}>
      {/* <PaperProvider> */}
        {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
        {/* <DrawerNavigation /> */}
        {/* <UserAddress /> */}
       
        <AppNavigation />
        <Toast
        position='bottom'
        bottomOffset={20}
      />
        {/* <NavigationApp /> */}

      {/* </PaperProvider> */}
      {/* <DrawerNavigation  /> */}
      {/* </GestureHandlerRootView> */}
    </Provider>


    //   <Provider store={store}>
    //     <Login />
    //   </Provider>
  );
};
