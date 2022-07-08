// import axios from 'axios';
import React, { useEffect,useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Linking,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import DrawerComponent from "../navigation/DrawerComponent";
// import { TouchableRipple } from 'react-native-paper';
// import CardViewWithImage from './components/Cards';
import DrawerNavigation from '../navigation/DrawerNavigation'
// import { getUserDashboard } from "../redux/actions/userDashboardActions";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { dispatchDeviceIdHandler } from "../redux/actions/deviceIdAction";
import AsyncStorage from "@react-native-async-storage/async-storage";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ({ navigation }) {
  const dispatch = useDispatch()
  // const {accessToken,refreshToken} = useSelector(state=>state.userTokensReducer.userTokens)


  const state = useSelector((state) => state.userStateReducer);
  const [data,setData] = useState()
  
  const personalAssistantDial = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${+923343043970}";
  } else {
      phoneNumber = "telprompt:${+923343043970}";
    }

    Linking.openURL(phoneNumber);
  };






  // useEffect(() => {
  //   getDeviceTokenInLocal()
   
  // }, [])


  // const getDeviceTokenInLocal = async() => {
  //   const data = await AsyncStorage.getItem('@storage_DeviceId')
  //   setData(data)

  // }
  

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
       
        <View style={styles.container}>
      
          {/* <Text style={{ color: 'black', fontFamily: 'Arial', marginTop: 50, marginBottom: 20, fontWeight: 'bold', fontSize: 32 }}>Available Cars</Text> */}
          {/* <Button title="Open Camera" onPress={() => props.navigation.navigate("Camera")} /> */}
          <Image
            style={{ width: "100%", height: 175, borderRadius: 20 }}
            source={require("../assets/DashboardBanner.png")}
            resizeMode="contain"
          />
          <View style={styles.greenBg}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity style={styles.rowCenter} onPress={() => navigation.navigate('Feedback')}>
                
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={require("../assets/messages.png")}
                />
                <Text
                  style={{ paddingLeft: 10, fontWeight: "800", fontSize: 13 }}
                >
                  12 MESSAGES
                </Text>
              </TouchableOpacity>
            </View>
{/* <DrawerComponent /> */}
            <View style={styles.verticalLine}></View>

            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity style={styles.rowCenter}>
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={require("../assets/wallet.png")}
                />
                <Text
                  style={{ paddingLeft: 10, fontWeight: "800", fontSize: 13 }}
                >
                  PKR, 4562
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingBottom: 30 }}>
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity
                onPress={personalAssistantDial}
                style={{
                  backgroundColor: "#F5F6F2",
                  borderColor: "#D9D9D9",
                  borderWidth: 0.5,
                  borderRadius: 20,
                  height: 85,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingStart: 30,
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/assistant.png")}
                />
                <Text
                  style={{ marginLeft: 10, fontSize: 20, fontWeight: "100" }}
                >
                  PERSONAL ASSISTANT
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show("Comming soon..", ToastAndroid.LONG)
                }
                style={{
                  backgroundColor: "#F5F6F2",
                  borderColor: "#D9D9D9",
                  borderWidth: 0.5,
                  borderRadius: 20,
                  height: 85,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingStart: 30,
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/delivery-box.png")}
                />
                <Text
                  style={{ marginLeft: 10, fontSize: 20, fontWeight: "100" }}
                >
                  DELIVERIES
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 40 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Purchase", { activity: "Purchases" })
                }
                style={{
                  backgroundColor: "#F5F6F2",
                  borderColor: "#D9D9D9",
                  borderWidth: 0.5,
                  borderRadius: 20,
                  height: 85,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingStart: 30,
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/shopping-bag.png")}
                />
                <Text
                  style={{ marginLeft: 10, fontSize: 20, fontWeight: "100" }}
                >
                  PURCHASES
                </Text>
              </TouchableOpacity>
             
            </View>
          </View>

          {/* <TouchableOpacity style={styles.mt}>
            <Image
              style={{ width: 320, height: 85 }}
              source={require('../assets/personalAssistant.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mt}>
            <Image
              style={{ width: 320, height: 85 }}
              source={require('../assets/deliveries.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mt}>
            <Image
              style={{ width: 320, height: 85 }}
              source={require('../assets/purchases.png')}
              resizeMode="contain"
            />
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => navigation.navigate("Purchase")}><Text style={{ color: "black" }}>Hello World</Text></TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate("FAIZY TASK")}><Text style={{ color: "black" }}>Hello World</Text></TouchableOpacity> */}
          {/* <View style={{ height: 100 }}></View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop:0,
        // height:windowHeight,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  rowCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  greenBg: {
    backgroundColor: "#BEE66B",
    width: "100%",
    borderRadius: 20,
    height: 90,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
  },

  verticalLine: {
    width: 2,
    height: "100%",
    backgroundColor: "#F4F9E8",
    opacity: 0.5,
  },

  mt: {
    marginTop: 18,
  },

  //   sectionContainer: {
  //     marginTop: 25,
  //     padding: 14,
  //     backgroundColor: '#F5F6FA',
  //     width: '94%',
  //     display: 'flex',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     flexDirection: 'row',
  //     alignSelf: 'center',
  //     borderRadius: 10,
  //     height: 100,
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.23,
  //     shadowRadius: 2.62,

  //     elevation: 2,
  //   },

  //   orderNo: {
  //     fontSize: 19,
  //     fontWeight: '600',
  //     color: 'black',
  //   },
  //   status: {
  //     marginTop: 3,
  //     fontSize: 14,
  //     fontWeight: '400',
  //   },
  //   price: {
  //     fontWeight: '800',
  //     fontSize: 16,
  //     color: 'black',
  //   },
});
