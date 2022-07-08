import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FTasks from "../screens/FTasks";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Purchase from "../screens/Purchase";
import Dashboard from "../screens/Dashboard";
import Orders from "../screens/Orders";
import Otp from "../screens/Otp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { isJwtExpired } from "jwt-check-expiration";
import { logoutUser, updateTokensAndAuth } from "../redux/actions/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OrderDetails } from "../screens/OrderDetails";
import DrawerNavigation from "./DrawerNavigation";
import MapComponent from "../components/MapComponent";
import UserAddress from "../screens/UserAddress";
import { Logout } from "../screens/Logout";
import { getLocationHandle } from "../redux/actions/locationActions";
import {
  SAVE_LOCATION_AND_ADDRESS,
  SAVE_LOCATION_COORDINATES,
} from "../redux/contants/location_constants";
import DisputeOrder from "../screens/DisputeOrder";
import { getUserDashboard } from "../redux/actions/userDashboardActions";
import { renewAccessTokenHandle } from "../redux/actions/renewAccessTokenActions";
import { SAVE_DEVICE_ID } from "../redux/contants/device_id_constant";
import FeedBack from "../screens/FeedBack";
import MyCurvedView from "../screens/UserProfile";
import { BottomSheet } from "react-native-btr";

// function HomeScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function ContactScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>contact Screen</Text>
//     </View>
//   );
// }
// r
// function TimeScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Time Screen</Text>
//     </View>
//   );
// }

const inActiveUserScreens = [
  {
    component: SignUp,
    name: "Signup",
    headerTitle: "Signup",
    headerShow: false,
  },
  {
    component: Login,
    name: "Login",
    headerTitle: "Login",
    headerShow: false,
  },
  {
    component: Otp,
    name: "otp",
    headerTitle: "otp",
    headerShow: true,
  },
];

const activeUserScreens = [
  {
    component: MapComponent,
    name: "Map",
    headerTitle: "Location",
    headerShow: true,
  },
  {
    component: UserAddress,
    name: "UserAddress",
    headerTitle: "Address",
    headerShow: true,
  },
  {
    component: MyTabs,
    name: "Tabs",
    headerShow: false,
    headerTitle: "Tabs",
  },
  {
    component: Dashboard,
    name: "Dashboard",
    headerTitle: "Home",
    headerShow: false,
  },

  {
    component: FTasks,
    name: "FTasks",
    headerTitle: "Order",
    headerShow: true,
  },
  {
    component: Purchase,
    name: "Purchase",
    headerTitle: "Purchase",
  },
  {
    component: Orders,
    name: "ORDERS",
    headerTitle: "Order List",
    headerShow: true,
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        style={styles.custom}
        onPress={() => {
          // Do something
        }}
      />
    ),
  },
  {
    component: OrderDetails,
    name: "Order-Details",
    headerTitle: "Order Details",
    headerShow: true,
  },
  {
    component: DisputeOrder,
    name: "dispute-order",
    headerTitle: "Dispute Order",
    headerShow: true,
  },
  {
    component: FeedBack,
    name: "FeedBack",
    headerTitle: "FeedBack",
    // headerShow: false
  },
  {
    component: Logout,
    name: "logout",
    headerTitle: "Logout",
    headerShow: false,
  },
  {
    component: MyCurvedView,
    name: "Profile",
    headerTitle: "Profile",
  },
];
const withMap = [
  {
    component: MyTabs,
    name: "Tabs",
    headerShow: false,
    headerTitle: "Tabs",
  },

  {
    component: Dashboard,
    name: "Dashboard",
    headerTitle: "Home",
    headerShow: false,
  },

  {
    component: FTasks,
    name: "FTasks",
    headerTitle: "Order",
    headerShow: true,
  },
  {
    component: Purchase,
    name: "Purchase",
    headerTitle: "Purchase",
  },
  {
    component: Orders,
    name: "ORDERS",
    headerTitle: "Order List",
    headerShow: true,
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        style={styles.custom}
        onPress={() => {
          // Do something
        }}
      />
    ),
  },
  {
    component: MapComponent,
    name: "Location",
    headerTitle: "Location",
    headerShow: true,
  },
  {
    component: UserAddress,
    name: "UserAddress",
    headerTitle: "Address",
    headerShow: true,
  },
  {
    component: OrderDetails,
    name: "Order-Details",
    headerTitle: "Order Details",
    headerShow: true,
  },
  {
    component: DisputeOrder,
    name: "dispute-order",
    headerTitle: "Dispute Order",
    headerShow: true,
  },
  {
    component: FeedBack,
    name: "FeedBack",
    headerTitle: "FeedBack",
    // headerShow: false
  },
  {
    component: Logout,
    name: "logout",
    headerTitle: "Logout",
    headerShow: false,
  },
  {
    component: MyCurvedView,
    name: "Profile",
    headerTitle: "Profile",
  },
];

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const NavigationApp = () => {
  const dispatch = useDispatch();

  const [testScreen, setTestScreen] = useState([]);
  const [isScreenLoading, setScreenLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  const { userState, isLoading } = useSelector(
    (state) => state.userStateReducer
  );
  const { location, locationLoading } = useSelector(
    (state) => state.userLocationReducer
  );

  console.log(location, "loca");

  // const checkTokens = async () => {
  //   const accessToken = await AsyncStorage.getItem('@storage_accessToken');
  //   const refreshToken = await AsyncStorage.getItem('@storage_refreshToken');

  // };

  const checkLocation = async () => {
    const userLocation = await AsyncStorage.getItem("@storage_location");
    console.log(userLocation, "----------");

    if (userLocation) {
      dispatch({
        type: SAVE_LOCATION_COORDINATES,
        payload: userLocation,
      });
    } else {
      dispatch({
        type: SAVE_LOCATION_AND_ADDRESS,
        payload: null,
      });
      // getLocationHandle(dispatch)
    }
  };

  // const checkDeviceID = async () => {
  //    const userDeviceId = await AsyncStorage.getItem('@storage_DeviceId')
  //   console.log(userDeviceId)
  // }

  const checkAuth = async (dispatch) => {
    const accessToken = await AsyncStorage.getItem("@storage_accessToken");
    const refreshToken = await AsyncStorage.getItem("@storage_refreshToken");

    // checkDeviceID()
    checkLocation();

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

  // const withMap = [...activeUserScreens.slice(2)];

  // withMap.splice(2, 0, activeUserScreens[0], activeUserScreens[1]);

  // const screens = isLoading
  //   ? []
  //   : userState && location
  //   ? withMap
  //   : userState && !location
  //   ? [...activeUserScreens]
  //   : [...inActiveUserScreens];

  const screens = isLoading
    ? []
    : userState && !location
    ? [...activeUserScreens]
    : userState && location
    ? withMap
    : [...inActiveUserScreens];

  const setScreenHandle = () => {
    if (userState && location) {
      setTestScreen(withMap);
      setScreenLoading(false);
    } else if (userState && !location) {
      setTestScreen(activeUserScreens);
      setScreenLoading(false);
    } else {
      setTestScreen(inActiveUserScreens);
      setScreenLoading(false);
    }
  };

  useEffect(() => {
    checkAuth(dispatch);

    // checkTokens();
  }, []);

  // logoutUser(dispatch);

  // const screens = isLoading ? [] : userState && location ? activeUserScreens.slice(2) : userState && location === null ? [...activeUserScreens] : [...inActiveUserScreens]

  console.log("**************************");
  console.log("SCREEN LOG IN NAVIGATION", testScreen);
  console.log("SCREEN LOG IN NAVIGATION", screens);
  console.log("**************************");

  return (
    <>
      {isLoading || locationLoading ? (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
          // initialRouteName='Map'
          >
            {screens.map((screen, ind) => (
              <Stack.Screen
                name={screen.name}
                component={screen.component}
                key={ind}
                options={{
                  headerShown:
                    screen.name === "Dashboard" ? false : screen.headerShow,
                  // headerRight: () => (

                  //   // <TouchableOpacity>
                  //   //   <Text>log</Text>
                  //   // </TouchableOpacity>
                  // ),
                  headerBackVisible: screen.name === "ORDERS" ? false : true,

                  headerStyle: {
                    backgroundColor: "#ec9b01",
                  },
                  headerTitle: screen.headerTitle.toUpperCase(),
                  headerTintColor: "black",
                }}
              />
            ))}
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default function MyTabs() {
  const navigation = useNavigation();

  // const { allLocation, allLocationLoading } = useSelector(
  //   (state) => state.userAllLocationReducer
  // );

  // const [visibleLoc, setVisibleLoc] = useState(false);

  // const locations = [
  //   {
  //     pk_user_location_id: 1,
  //     fk_user_id: 3,
  //     address: "address 3",
  //     location_coordinates: "12.34,56.78",
  //   },
  //   {
  //     pk_user_location_id: 2,
  //     fk_user_id: 3,
  //     address: "address 4",
  //     location_coordinates: "12.34,56.78",
  //   },
  // ];

  // const logOut = () => {

  // logoutUser(dispatch);
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator
        screenOptions={{
          style: { backgroundColor: "#fff" },
          tabBarInactiveTintColor: "black",
          tabBarActiveTintColor: "blue",
          // tabBarActiveBackgroundColor: 'red',

          tabBarStyle: {
            position: "absolute",
            height: 65,
            borderTopColor: "rgba(0, 0, 0, .2)",
          },
        }}
      >
        <Tab.Screen
          options={{
            // headerShown: false,
            headerStyle: { backgroundColor: "#ec9b01" },
            headerTitle: "FAAIZY",
            headerTitleStyle: {
              backgroundColor: "black",
              paddingHorizontal: 10,
              paddingVertical: 2,
              color: "#ec9b01",
              borderRadius: 10,
            },
            headerTintColor: "black",
            headerTitleAlign: "center",
            // headerRight: () => (
            //   <>
            //     <TouchableOpacity
            //       onPress={logOut}
            //       // title="Info"
            //       // color="#fff"
            //     >
            //       <Image
            //         style={{
            //           width: 30,
            //           height: 30,
            //           resizeMode: "contain",
            //           marginLeft: 10,
            //         }}
            //         source={require("../assets/GpsHome.png")}
            //       />
            //     </TouchableOpacity>

            //     <BottomSheet
            //       visible={visibleLoc}
            //       // onBackButtonPress={toggle}
            //       // onBackdropPress={toggle}
            //     >
            //       <View
            //         style={{
            //           backgroundColor: "white",
            //           height: 400,
            //           padding: 20,
            //         }}
            //       >
            //         <TouchableOpacity onPress={() => setVisibleLoc(false)}>
            //           <Text>❌</Text>
            //         </TouchableOpacity>

            //         <View
            //           style={{
            //             height: 270,
            //             borderWidth: 1,
            //             borderColor: "gray",
            //             marginVertical: 20,
            //           }}
            //         >
            //           {allLocationLoading === false ? (
            //             <ScrollView>
            //               <View>
            //                 {allLocation.map((loc, ind) => {
            //                   return (
            //                     <View
            //                       style={{
            //                         borderWidth: 1,
            //                         borderColor: "gray",
            //                         padding: 15,
            //                         margin: 10,
            //                       }}
            //                       key={ind}
            //                     >
            //                       <Text
            //                         style={{
            //                           textAlign: "center",
            //                         }}
            //                       >
            //                         {loc.address}
            //                       </Text>
            //                     </View>
            //                   );
            //                 })}
            //               </View>
            //               {/* <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}
            //             </ScrollView>
            //           ) : (
            //             <View>
            //               <ActivityIndicator size="small" color="lightgray" />
            //             </View>
            //           )}
            //         </View>

            //         <TouchableOpacity
            //           onPress={() => navigation.navigate("Map")}
            //         >
            //           <Text style={{ color: "orange", fontWeight: "bold" }}>
            //             ADD NEW LOCATION
            //           </Text>
            //         </TouchableOpacity>
            //       </View>
            //     </BottomSheet>
            //   </>
            // ),

            tabBarIcon: () => (
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/home.png")}
              />
            ),
          }}
          name="Home"
          component={Dashboard}
        />

        {/* <Tab.Screen
          options={{
            headerStyle:{backgroundColor:'#ec9b01'},
            headerTitle:'ORDER',
            headerTintColor: 'black',
            tabBarIcon: () => (
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/phone.png')}
              />
            ),
          }}
          name="Contact"
          component={Dashboard}
        /> */}

        <Tab.Screen
          options={{
            headerStyle: { backgroundColor: "#ec9b01" },
            headerTitle: "FAAIZY",
            headerTitleStyle: {
              backgroundColor: "black",
              paddingHorizontal: 10,
              paddingVertical: 2,
              color: "#ec9b01",
              borderRadius: 10,
            },
            headerTintColor: "black",
            headerTitleAlign: "center",
            tabBarIcon: () => (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/profile.png")}
              />
            ),
          }}
          name="Profile"
          component={MyCurvedView}
        />

        <Tab.Screen
          options={{
            headerStyle: { backgroundColor: "#ec9b01" },
            headerTintColor: "black",
            headerTitle: "ORDERS LIST",

            tabBarIcon: () => (
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/time.png")}
              />
            ),
          }}
          name="Time"
          component={Orders}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
