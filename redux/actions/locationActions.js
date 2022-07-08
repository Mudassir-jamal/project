import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ToastAndroid } from "react-native";
import { getLocationApi, createLocationApi } from "../../apis/userLocationApi";
import {
  ERROR_IN_GETTING_LOCATION,
  SAVE_LOCATION,
  START_GETTING_LOCATION,
  SAVE_LOCATION_ALL_ADDRESS,
  START_GETTING_ALL_LOCATIONS,
  ERROR_IN_GETTING_ALL_LOCATIONS,
} from "../contants/location_constants";

export const getLocationHandle = async (dispatch) => {
  const accessToken = await AsyncStorage.getItem("@storage_accessToken");
  dispatch({
    type: START_GETTING_LOCATION,
  });
  if (accessToken) {
    getLocationApi(accessToken)
      .then(async (res) => {
        if (res.data.success) {
          console.log(res.data, "location.");
          const { location_coordinates, address } = res?.data?.data[0];
          dispatch({
            type: SAVE_LOCATION,
            payload: res?.data?.data,
          });
          await AsyncStorage.setItem("@storage_location", location_coordinates);
          await AsyncStorage.setItem("@storage_address", address);
        } else {
          dispatch({
            type: SAVE_LOCATION,
            payload: null,
          });
        }
        // console.log(res)
      })
      .catch((error) => {
        ToastAndroid.show(
          error?.response?.data?.message?.[0],
          ToastAndroid.LONG
        );
        Alert.alert(error?.response?.data?.message?.[0]);
        dispatch({
          type: ERROR_IN_GETTING_LOCATION,
          payload: error?.response?.data?.message?.[0],
        });

        // alert(error?.response?.data?.message?.[0])
        setLoading(false);
      });
  }
};

export const getAllLocations = async (dispatch) => {
  const accessToken = await AsyncStorage.getItem("@storage_accessToken");
  dispatch({
    type: START_GETTING_ALL_LOCATIONS,
  });
  if (accessToken) {
    getLocationApi(accessToken)
      .then(async (res) => {
        console.log("GET ALL LOCATION API RESPONSE", res.data);
        if (res.data.success) {
          console.log("then condition in get location");
          dispatch({
            type: SAVE_LOCATION_ALL_ADDRESS,
            payload: res?.data?.data,
          });
        }
      })
      .catch((error) => {
        ToastAndroid.show(
          error?.response?.data?.message?.[0],
          ToastAndroid.LONG
        );
        Alert.alert(error?.response?.data?.message?.[0]);
        dispatch({
          type: ERROR_IN_GETTING_ALL_LOCATIONS,
          payload: error?.response?.data?.message?.[0],
        });

        // alert(error?.response?.data?.message?.[0])
        setLoading(false);
      });
  }
};

export const createLocationHandle = async (dispatch) => {
  const accessToken = await AsyncStorage.getItem("@storage_accessToken");

  if (accessToken) {
    createLocationApi(accessToken)
      .then((res) => {
        if (res.data.success) {
          getAllLocations(dispatch);
        }
      })
      .catch((error) => {
        ToastAndroid.show(
          error?.response?.data?.message?.[0],
          ToastAndroid.LONG
        );
        Alert.alert(error?.response?.data?.message?.[0]);
        // dispatch({
        //   type: ERROR_IN_GETTING_LOCATION,
        //   payload: error?.response?.data?.message?.[0],
        // });

        // // alert(error?.response?.data?.message?.[0])
        // setLoading(false);
      });
  }
};
