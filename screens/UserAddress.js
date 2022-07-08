import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import FormSubmitButton from "../assets/buttons/FormSubmitButton";
import SaveAddressButton from "../assets/buttons/SaveAddressButton";
import { updateLocationApi, updateLocation } from "../apis/userLocationApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SAVE_LOCATION_COORDINATES } from "../redux/contants/location_constants";
import { getAllLocations } from "../redux/actions/locationActions";
import { useNavigation } from "@react-navigation/native";

const UserAddress = (props) => {
  const dispatch = useDispatch();
  const { route } = props;
  const navigation = useNavigation();

  const paramsRoute = route.params;

  console.log(paramsRoute, "================");

  const [address, setAddress] = useState(paramsRoute?.loc?.address ? paramsRoute?.loc?.address : "");
  const [loading, setLoading] = useState(false);
  // const {accessToken,refreshToken} = useSelector(state=>state.userTokensReducer.userTokens)

  const createLocationHandle = async () => {
    setLoading(true);
    const accessToken = await AsyncStorage.getItem("@storage_accessToken");

    const dataObj = {
      location_coordinates: paramsRoute.coordinates,
      // location_coordinates:,
      address: address,
    };

    updateLocationApi(accessToken, dataObj)
      .then(async (res) => {
        if (res.status >= 200 && res.status <= 299) {
          setLoading(false);
          getAllLocations(dispatch);
          alert("Address and location saved successfully!");
          navigation.navigate("Tabs");

          if (dataObj.location_coordinates) {
            dispatch({
              type: SAVE_LOCATION_COORDINATES,
              payload: dataObj.location_coordinates,
            });

            await AsyncStorage.setItem(
              "@storage_location",
              dataObj.location_coordinates
            );
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error?.response);
        // alert(error?.response?.data?.message?.[0])
      });
  };

  const updateLocationHandle = async () => {
    setLoading(true);
    const accessToken = await AsyncStorage.getItem("@storage_accessToken");

    let body = {
      location_coordinates: paramsRoute.coordinates,
      address,
    };

    updateLocation(accessToken, body, paramsRoute?.loc?.pk_user_location_id)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setLoading(false);
          getAllLocations(dispatch);
          navigation.navigate("Tabs");
          alert("Address and location Update successfully!");
        }
        console.log("API RESPONSE UDATE LOCATION", res.status);
        // setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          style={styles.additionalInfo}
          multiline
          value={address}
          onChangeText={setAddress}
          numberOfLines={6}
          placeholder="Enter complete adddress"
          placeholderStyle={{ justifyContent: "flex-start" }}
        />
      </View>

      <SaveAddressButton
        loading={loading}
        disabled={address ? false : true}
        onPressHandle={() => {
          if (paramsRoute?.action === "updateLoc") {
            updateLocationHandle();
          } else {
            createLocationHandle();
          }
        }}
        buttonCaption="Save Address"
      />

      {/* {address ? <TouchableOpacity  style={{justifyContent:'center',backgroundColor:'#ec9b01',paddingVertical:12,borderRadius:10}}>
                <Text style={{textAlign:'center',color:'white'}}>Save Address</Text>
            </TouchableOpacity> :
            <TouchableOpacity disabled style={{justifyContent:'center',backgroundColor:'#d1cfcf',paddingVertical:12,borderRadius:10}}>
                <Text style={{textAlign:'center',color:'white'}}>Save Address</Text>
            </TouchableOpacity>} */}
    </View>
  );
};

export default UserAddress;

const styles = StyleSheet.create({
  additionalInfo: {
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#D9D9D9",
    marginTop: 20,
    // width: "100%",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
});
