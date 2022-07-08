import { loginApi, verifyLoginApi } from "../../apis/loginApi";
import {
  storeLocation,
  storeTokensInStorage,
} from "../../helper/localStorageHandles";
import { USER_ACTIVE_STATE } from "../contants/user_state_constants";
import { UPDATE_USER_AUTH_TOKENS } from "../contants/user_tokens_constants";
import { updateTokensAndAuth } from "./common";
import { Alert, ToastAndroid } from "react-native";
import {
  SAVE_LOCATION_AND_ADDRESS,
  SAVE_LOCATION_COORDINATES,
} from "../contants/location_constants";
import { dispatchDeviceIdHandler } from "./deviceIdAction";
import Toast from 'react-native-toast-message'

export const loginHandle = (data, navigation, setLoading) => {
  console.log("loginHandle data=============>", data);
  loginApi(data)
    .then((res) => {
      console.log("loginHandle res=============>", res);
      if (res.data.success) {
        navigation.navigate("Otp", { phone: data.phone, origin: "login" });
        setLoading(false);
      }
    })
    .catch((error) => {
      // alert(error?.response?.data?.message?.[0])
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message?.[0]
      })
      // ToastAndroid.show(, ToastAndroid.LONG);
      // Alert.alert(error?.response?.data?.message?.[0]);
      // console.log('loginHandle error=============>',error);
      setLoading(false);
    });
};

export const verifyLoginHandle = (
  data,
  dispatch,
  setLoading,
  navigation,
  expoPushToken
) => {
  verifyLoginApi(data)
    .then((res) => {
      if (res.data.success) {
        setLoading(false);

        const { refreshToken, accessToken, location_coordinates } =
          res?.data?.data?.[0];

        // console.log("===================================");
        // console.log("LOCAYION CORDINATE IN LOGIN ACTION", location_coordinates);
        // console.log("===================================");

        console.log("refreshToken=============>", refreshToken);
        console.log("accessToken=============>", accessToken);

        storeTokensInStorage({ refreshToken, accessToken });
        updateTokensAndAuth(dispatch, { refreshToken, accessToken });
        // navigation.navigate('Map')
        // ToastAndroid.show("Logged in Successfully", ToastAndroid.LONG);

        Toast.show({
          type: 'success',
          text1: 'Phone number registered successfully!'
        });

        Toast.show({
          type: 'success',
          text1: 'Logged in Successfully'
        });



        // console.log(
        //   "location_coordinates================>",
        //   location_coordinates
        // );
        // console.log(
        //   "location_coordinates================>",
        //   typeof location_coordinates
        // );

        if (expoPushToken) {
          dispatchDeviceIdHandler(accessToken, expoPushToken);
        }

        // if (location_coordinates !== null) {
        //   storeLocation(location_coordinates);
        //   dispatch({
        //     type: SAVE_LOCATION_COORDINATES,
        //     payload: location_coordinates,
        //   });
        // } else {
        //   dispatch({
        //     type: SAVE_LOCATION_AND_ADDRESS,
        //     payload: null,
        //   });
        // }

        // alert('Phone number registered successfully!')
      }
    })
    .catch((error) => {
     
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message?.[0]
      });
      // Alert.alert(error?.response?.data?.message?.[0]);
      // // alert(error?.response?.data?.message?.[0])
      setLoading(false);
    });
};
