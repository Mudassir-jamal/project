import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { sendDeviceIdApi } from "../../apis/deviceIdApi";





export const dispatchDeviceIdHandler = async (accessToken,data) => {
  // const accessToken = await AsyncStorage.getItem("@storage_accessToken");
  console.log(data,accessToken,"from action")

  // if()
  sendDeviceIdApi(accessToken,data).then( async(res) => {
      console.log(res.data, "check", data);
      if(res.data.success){
        ToastAndroid.show("Device Registered....", ToastAndroid.LONG);

      }

      await AsyncStorage.setItem("@storage_DeviceId", data);
    })
    .catch((error) => {
      ToastAndroid.show(error?.response?.data?.message?.[0], ToastAndroid.LONG);
      alert.alert(error?.response?.data?.message?.[0])

     console.log(error?.response?.data?.message?.[0],"=====================>")
    });
};




// export const checkDeviceIdHandler = async () => {
//   const accessToken = await AsyncStorage.getItem("@storage_accessToken");
//   const deviceId = await AsyncStorage.getItem("@storage_DeviceId");

//   if(!deviceId){
//     dispatchDeviceIdHandler(data)
//   }


//   // sendDeviceIdApi(accessToken, data)
//   //   .then((res) => {
//   //     console.log(res.data, "check", data);

//   //     AsyncStorage.setItem("@storage_DeviceId", data);
//   //   })
//   //   .catch((error) => {
//   //    console.log(error)
//   //   });
// };
