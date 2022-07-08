// import { createDrawerNavigator } from "@react-navigation/drawer";
// import MyTabs, { NavigationApp } from "./NavigationApp";

// import { Button, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import Dashboard from "../screens/Dashboard";
// import { useDispatch, useSelector } from "react-redux";
// import { isJwtExpired } from "jwt-check-expiration";
// import { logoutUser, updateTokensAndAuth } from "../redux/actions/common";
// import { useEffect } from "react";
// import SignUp from "../screens/SignUp";
// import Login from "../screens/Login";
// import Otp from "../screens/Otp";
// import FTasks from "../screens/FTasks";
// import Purchase from "../screens/Purchase";
// import Orders from "../screens/Orders";
// import { OrderDetails } from "../screens/OrderDetails";
// import BottomTabs from "./BottomTabs";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Logout } from "../screens/Logout";

// // function HomeScreen({ navigation }) {
// //   return (
// //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //       <Button
// //         onPress={() => navigation.navigate('Notifications')}
// //         title="Go to notifications"
// //       />
// //     </View>
// //   );
// // }

// // function NotificationsScreen({ navigation }) {
// //     return (
// //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //             <Button onPress={() => navigation.openDrawer()} title="Go back home" />
// //         </View>
// //     );
// // }

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigation() {
//   const dispatch = useDispatch();

//   const {userState} = useSelector(state => state.userStateReducer)

//   console.log(userState)

//   // const { userState, isLoading } = useSelector(state => state.userStateReducer);

//   // const checkTokens = async () => {
//   //     const accessToken = await AsyncStorage.getItem('@storage_accessToken');
//   //     const refreshToken = await AsyncStorage.getItem('@storage_refreshToken');

//   // };

//   // const checkAuth = async () => {
//   //     const accessToken = await AsyncStorage.getItem('@storage_accessToken');
//   //     const refreshToken = await AsyncStorage.getItem('@storage_refreshToken');

//   //     if (accessToken) {
//   //         if (isJwtExpired(accessToken) === false) {
//   //             updateTokensAndAuth(dispatch, { refreshToken: refreshToken, accessToken: accessToken });
//   //         }
//   //         else {
//   //             if (isJwtExpired(refreshToken) === false) {
//   //                 logoutUser(dispatch)
//   //             }
//   //         }
//   //     } else {
//   //         logoutUser(dispatch);
//   //     }
//   // };

//   // useEffect(() => {
//   //     checkAuth();
//   //     checkTokens();
//   // }, []);

//   // const screens = isLoading ? [] :  userState ? activeUserScreens : inActiveUserScreens;

//   return (
//     <>
//       <NavigationContainer>
//         <Drawer.Navigator
//           useLegacyImplementation
//           // initialRouteName="Home"
//         >
//           {/* <Drawer.Screen > */}

//           {/* {screens.map((screen, ind) => (
//                             <> */}

//           <Drawer.Screen
//             name="tabs"
//             component={MyTabs}
//             // key={ind}

//             options={{
//             //   headerShown: false,
//               headerShown:true,
//               headerStyle:{backgroundColor:'#ec9b01'},
//               headerTitle:'FAAIZY',
//               headerTitleStyle:{backgroundColor:'black',paddingHorizontal:10,paddingVertical:2,color:'#ec9b01',borderRadius:10},
//               headerTintColor: 'black',
//               headerTitleAlign:'center',
//               headerRight: () => (
//                 <TouchableOpacity
//                   onPress={() => alert('This is a button!')}
//                   title="Info"
//                   color="#fff"
//                 />
//               ),

//               headerStyle: {
//                 backgroundColor: "#ec9b01",
//               },
//               // headerTitle: screen.headerTitle.toUpperCase(),
//               headerTintColor: "black",
//             }}
//           />

//           {/* <Drawer.Screen
//           options={{headerShown:false}}
//           name="logout" component={Logout} title="Log out" /> */}

//           {/* </>

//                         ))} */}
//           {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
//           {/* </Drawer.Screen> */}

//           {/* <Drawer.Screen name="Home" component={Dashboard} />
//             <Drawer.Screen name="Home" component={Dashboard} />
//             <Drawer.Screen name="Home" component={Dashboard} />
//             <Drawer.Screen name="Home" component={Dashboard} /> */}
//           {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
//         </Drawer.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }

// // (
// //     <>
// //         {isLoading || userState === 'loading' ? (
// //             <View
// //                 style={{
// //                     height: '100%',
// //                     justifyContent: 'center',
// //                     alignItems: 'center',
// //                 }}>
// //                 <ActivityIndicator />{' '}
// //             </View>
// //         ) : (
// //             <NavigationContainer>
// //                 <Stack.Navigator>

// //                     {screens.map((screen, ind) => (
// //                         <>

// //                             <Stack.Screen
// //                                 name={screen.name}
// //                                 component={screen.component}
// //                                 key={ind}

// //                                 options={{
// //                                     headerShown: screen.headerShow,
// //                                     // headerShown:true,

// //                                     headerStyle: {
// //                                         backgroundColor: '#ec9b01',
// //                                     },
// //                                     headerTitle: screen.headerTitle.toUpperCase(),
// //                                     headerTintColor: 'black',

// //                                 }}
// //                             />

// //                         </>

// //                     ))}
// //                     {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
// //                 </Stack.Navigator>
// //             </NavigationContainer>
// //         )}
// //     </>
// // );
