import { Alert, ToastAndroid } from "react-native";
import {
  createOrderApi,
  getOrderByIdApi,
  getOrdersApi,
  orderCancelByIdApi,
  getOrderFilesApi,
} from "../../apis/ordersApi";
import {
  ERROR_IN_GETTING_ORDERS,
  ERROR_IN_GETTING_ORDER_BY_ID,
  SAVE_ORDERS,
  SAVE_ORDER_BY_ID,
  START_GETTING_ORDERS,
  START_GETTING_ORDER_BY_ID,
  SAVE_ORDER_IMAGE_URL,
  SAVE_ORDER_VOICE_NOTE_URL,
} from "../contants/order_constants";
import { Buffer } from "buffer";

// OrdersGetFileHandle

const orderMediaHendle = (orderById, accessToken, dispatch) => {
  console.log("order media handle runs");
  let orderImagePath = orderById[0]?.image_url;
  let orderVoicePath = orderById[0]?.voice_note_url;

  if (orderImagePath !== "notfound.jpg" && orderVoicePath == "notfound.aud") {
    let params = {
      orderId: orderById[0]?.id,
      fieldName: "image_url",
    };

    getOrderFilesApi(accessToken, params)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: SAVE_ORDER_IMAGE_URL,
            payload: res?.data?.data[0]?.image_url,
          });
        }
        console.log("Data of image URL");
        // console.log(res?.data?.data[0]?.image_url);
      })
      .catch((err) => console.log(err));

    //   getOrderFilesApi()
  } else if (
    orderImagePath == "notfound.jpg" &&
    orderVoicePath !== "notfound.aud"
  ) {
    let params = {
      orderId: orderById[0]?.id,
      fieldName: "voice_note_url",
    };
    getOrderFilesApi(accessToken, params)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: SAVE_ORDER_VOICE_NOTE_URL,
            payload: res?.data?.data[0]?.voice_note_url,
          });
        }

        console.log("Data of Voice note URL");
        // console.log(res?.data?.data[0]?.voice_note_url);
      })
      .catch((err) => console.log(err));
  } else if (
    orderImagePath !== "notfound.jpg" &&
    orderVoicePath !== "notfound.aud"
  ) {
    let params1 = {
      orderId: orderById[0]?.id,
      fieldName: "",
    };

    getOrderFilesApi(accessToken, params1)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: SAVE_ORDER_IMAGE_URL,
            payload: res?.data?.data[0]?.image_url,
          });
          dispatch({
            type: SAVE_ORDER_VOICE_NOTE_URL,
            payload: res?.data?.data[0]?.voice_note_url,
          });
        }
        console.log("data of Voice note And image URL");
        // console.log(res?.data?.data[0]?.voice_note_url);
        // console.log(res?.data?.data[0]?.image_url);
      })
      .catch((err) => console.log(err));
  }
};

// OrdersGetFileHandle ENDS

export const createOrderHandle = (token, formData, navigation, setLoading) => {
  createOrderApi(token, formData)
    .then((res) => {
      console.log("res=================>", res.data);
      if (res.data.success) {
        setLoading(false);
        // getOrdersHandle(token,dispatch)
        ToastAndroid.show("Order place Successfully", ToastAndroid.LONG);
        navigation.navigate("ORDERS", { state: "state reload" });
      }
    })
    .catch((error) => {
      console.log("error ==============> ", error);
      ToastAndroid.show(error?.response?.data?.message?.[0], ToastAndroid.LONG);
      Alert.alert(error?.response?.data?.message?.[0]);

      // console.log(error?.response?.data?.message?.[0])
      setLoading(false);
    });
};

export const getOrdersHandle = (token, dispatch) => {
  dispatch({
    type: START_GETTING_ORDERS,
  });
  getOrdersApi(token)
    .then((res) => {
      // console.log ("------------",res.data.data,"============>>>>>>===")
      if (res.data.success) {
        dispatch({
          type: SAVE_ORDERS,
          payload: res?.data?.data,
        });

        ToastAndroid.show("Order Updated!", ToastAndroid.LONG);
      }
    })
    .catch((error) => {
      dispatch({
        type: ERROR_IN_GETTING_ORDERS,
        payload: error?.response?.data?.message?.[0],
      });
      console.log(error?.response?.data?.message?.[0]);
      // setLoading(false)
    });
};

export const getOrderByIdHandle = (token, id, dispatch) => {
  dispatch({
    type: START_GETTING_ORDER_BY_ID,
  });
  getOrderByIdApi(token, id)
    .then((res) => {
      const orderObj = res?.data?.data;

      console.log("==========================================================");
      console.log("orderObject  ", orderObj[0].id);
      console.log("==========================================================");
      console.log(
        "ORDER DATA IN ORDER ACTION FILE LOG:  ",
        res.data.data[0].image_path
      );
      console.log(
        "ORDER DATA IN ORDER ACTION FILE LOG:  ",
        res.data.data[0].voice_note_path
      );
      console.log("==========================================================");

      if (res.data.success) {
        dispatch({
          type: SAVE_ORDER_BY_ID,
          payload: orderObj,
        });

        orderMediaHendle(orderObj, token, dispatch);
      }
    })
    .catch((error) => {
      dispatch({
        type: ERROR_IN_GETTING_ORDER_BY_ID,
        payload: orderObj?.message?.[0],
      });
      alert(error?.response?.data?.message?.[0], "=============");
      // setLoading(false)
    });
};

export const cancelOrderByIdHandle = (token, id, dispatch, setLoading) => {
  orderCancelByIdApi(token, id)
    .then((res) => {
      setLoading(false);
      getOrderByIdHandle(token, id, dispatch);
      getOrdersHandle(token, dispatch);
      ToastAndroid.show("Order cancelled successfully!", ToastAndroid.LONG);
    })
    .catch((error) => {
      console.log(error?.response?.data?.message?.[0]);
      setLoading(false);
    });
};
