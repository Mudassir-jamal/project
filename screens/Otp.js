import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import React, { useEffect, useState } from "react";
import { verifyRegistrationHandle } from "../redux/actions/regitrationActions";
import { verifyLoginHandle } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import FormSubmitButton from "../assets/buttons/FormSubmitButton";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
// import * as Notification from "expo-notifications";

const { height, width } = Dimensions.get("window");

export default function Otp({ navigation, route }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  console.log("expoPush Token State ===", expoPushToken);

  const dispatch = useDispatch();
  const { phone, origin } = route.params;
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandle = () => {
    const data = {
      Otp: otp,
      phone: phone,
      frontendAppType: "mobile_app",
    };

    if (origin === "registration") {
      verifyRegistrationHandle(data, dispatch, navigation, expoPushToken);
    } else if (origin === "login") {
      setLoading(true);
      verifyLoginHandle(data, dispatch, setLoading, navigation, expoPushToken);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>setExpoPushToken(token) );
  //   }, []);

  useEffect(() => {
    console.log("useEffect of OTP Screen++++++++++++++++++++");
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((e) => console.log("expo useEffect in OTP SCREEN LOG ", e));
  }, []);

  // dispatchDeviceIdHandler(expoPushToken)
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.topText}>Enter OTP sent your mobile number</Text>

        <TextInput
          style={styles.input}
          // keyboardType = 'numeric'
          onChangeText={(e) => setOtp(e)}
          placeholder="Enter OTP"
        />

        {/* <TouchableOpacity onPress={submitHandle} style={styles.button}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity> */}

        <FormSubmitButton
          loading={loading}
          onPressHandle={submitHandle}
          buttonCaption="Confirm OTP"
        />
        {/* <FormSubmitButton loading={loading} onPressHandle={submitHandle} buttonCaption='Confirm OTP' /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    color: "black",
    minHeight: height,
  },
  pic: {
    height: 200,
    width: 300,
    marginTop: 10,
    borderRadius: 10,
  },
  topText: {
    position: "relative",
    bottom: 50,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#ec9b01",
    borderRadius: 25,
    justifyContent: "center",
    height: 50,
    width: 130,
    marginBottom: 20,
    alignSelf: "center",
  },

  input: {
    height: 40,
    width: 280,
    margin: 12,
    // borderWidth: 1
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: "black",
    backgroundColor: "white",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
