// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";
// import { useDispatch } from "react-redux";
// import { dispatchDeviceIdHandler } from "../redux/actions/deviceIdAction";

// export const DeviceToken = () => {
//   const [expoPushToken, setExpoPushToken] = useState("");

//   const dispatch = useDispatch();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

    
    
//   }, []);

//   return (
//     <View
    
//     ></View>
//     );  
//   };
//   async function registerForPushNotificationsAsync() {
//     let token;
//     if (Device.isDevice) {
//       console.log(Device.getDeviceId);
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log(token, "==============>token");
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     return token;
//   }
    
   