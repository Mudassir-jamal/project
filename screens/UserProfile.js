import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { BottomSheet } from "react-native-btr";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getAllLocations } from "../redux/actions/locationActions";
import { getUserProfile } from "../apis/profileApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";

// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { BottomSheet } from "react-native-btr";

const screen = Dimensions.get("screen");
export default function MyCurvedView() {
  const [visibleLoc, setVisibleLoc] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [convertImg, setConvertImg] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  console.log("=============User Profile ====================");
  console.log("convert Image Log", convertImg);
  console.log("Profile Data Log", profile);
  console.log("=============User Profile ====================");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { allLocation, allLocationLoading } = useSelector(
    (state) => state.userAllLocationReducer
  );

  const [currentLocation, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    console.log("secons useEffect runs");
    allLocationLoading == false ? setCurrentLocation(allLocation[0]) : null;
  }, [allLocationLoading]);

  const getUserProfileHandle = async () => {
    console.log("GET USer PROFILE LOG **********************************");
    let token = await AsyncStorage.getItem("@storage_accessToken");
    getUserProfile(token)
      .then((res) => {
        console.log(
          "user profile response",
          res.data.data[0].profile_picture?.data
        );

        if (res.data.data[0]?.profile_picture !== "notfound.jpg") {
          const buffer = res.data.data[0]?.profile_picture?.data;
          const base64 = Buffer.from(buffer).toString("base64");
          setConvertImg("data:image/jpg;base64," + base64);
          setLoading(false);
        }

        setProfile(res?.data?.data[0]);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });

    console.log("GET USer PROFILE LOG **********************************");
  };

  useEffect(() => {
    getUserProfileHandle();
    getAllLocations(dispatch);
  }, []);

  const locations = [
    {
      pk_user_location_id: 1,
      fk_user_id: 3,
      address: "address 3",
      location_coordinates: "12.34,56.78",
    },
    {
      pk_user_location_id: 2,
      fk_user_id: 3,
      address: "address 4",
      location_coordinates: "12.34,56.78",
    },
  ];

  function toggle() {
    setVisible((visible) => !visible);
  }
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.profile}>
          {isLoading ? (
            <Image
              source={{ uri: "https://i.stack.imgur.com/SXxvF.jpg" }}
              style={{ width: 100, height: 100, overflow: "hidden" }}
            />
          ) : (
            <Image
              source={{ uri: convertImg }}
              style={{ width: 100, height: 100, overflow: "hidden" }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          marginTop: 150,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {profile && profile?.user_name}
        </Text>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "orange",
            padding: 15,
            fontWeight: "bold",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "orange" }}>Edit Profile 📝</Text>
        </TouchableOpacity>
      </View>
      {profile?.phone && (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            margin: 15,
            width: "38%",
            justifyContent: "space-between",
          }}
        >
          <Text>Phone:</Text>
          <Text>{profile?.phone}</Text>
        </View>
      )}
      {profile?.email && (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            margin: 15,
            width: "38%",
            justifyContent: "space-between",
          }}
        >
          <Text>Email:</Text>
          <Text>{profile.email}</Text>
        </View>
      )}
      <View style={styles.horizontalLineDivider}></View>

      {/* <View style={styles.borderContainer}>
        {currentLocation && (
          <Text style={{ width: 250 }}>{currentLocation.address}</Text>
        )}
      </View> */}

      <TouchableOpacity
        style={styles.addressBtn}
        onPress={() => setVisibleLoc(true)}
      >
        <Text style={{ color: "orange", fontWeight: "bold" }}>
          My Addresses
        </Text>
        <Image
          style={{
            width: 20,
            height: 20,
            resizeMode: "contain",
            marginLeft: 10,
          }}
          source={require("../assets/GpsHome.png")}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.addressBtn}
        onPress={() => AsyncStorage.clear()}
      >
        <Text style={{ color: "orange", fontWeight: "bold" }}>Logout </Text>
      </TouchableOpacity> */}

      <BottomSheet
        visible={visibleLoc}
        // onBackButtonPress={toggle}
        // onBackdropPress={toggle}
      >
        <View style={styles.card}>
          <TouchableOpacity onPress={() => setVisibleLoc(false)}>
            <Text
              style={{
                // borderWidth: 1,
                // borderColor: "orange",
                textAlign: "right",
              }}
            >
              ❌
            </Text>
          </TouchableOpacity>

          <View style={styles.locationContainer}>
            {allLocationLoading === false ? (
              <ScrollView>
                <View>
                  {allLocation.map((loc, ind) => {
                    let coord = loc?.location_coordinates.split(",");
                    let lat = coord[0];
                    let long = coord[1];

                    console.log(lat, long);
                    return (
                      <View style={styles.row} key={ind}>
                        <TouchableOpacity
                          onPress={() => {
                            setCurrentLocation(loc);
                            setVisibleLoc(false);
                          }}
                        >
                          <Text style={styles.label}>{loc.address}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("Location", {
                              // coord :loc.location_coordinates,
                              lat,
                              long,
                              action: "updateLoc",
                              loc,
                            });
                            // setCurrentLocation(loc);
                            setVisibleLoc(false);
                          }}
                        >
                          <Text style={styles.label}>📝</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
                {/* <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}
              </ScrollView>
            ) : (
              <View>
                <ActivityIndicator size="small" color="lightgray" />
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Location");
              setVisibleLoc(false);
            }}
          >
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              ADD NEW LOCATION
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: 'red',
    alignItems: "center",
  },
  banner: {
    backgroundColor: "#FEC321",
    height: screen.width * 2,
    width: screen.width * 2,
    borderWidth: 5,
    borderColor: "#FEC321",
    borderRadius: screen.width,
    position: "absolute",
    bottom: screen.height - screen.height * 0.3,
    alignItems: "center",
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: "#FEC321",
    position: "absolute",
    bottom: -50,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#EBA620",
    overflow: "hidden",
  },

  horizontalLineDivider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#707070",
    opacity: 0.5,
    marginVertical: 10,
    // marginVertical:15,
  },

  borderContainer: {
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    borderRadius: 8,
    height: 100,
    marginVertical: 30,
    alignItems: "center",
    paddingLeft: 10,
    justifyContent: "center",
  },

  confirmLocation: {
    backgroundColor: "orange",
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    height: 400,
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,

    // justifyContent: "center",
    // alignItems: "center",
  },

  locationContainer: {
    width: "100%",
    marginVertical: 20,
    height: 280,
  },

  addressBtn: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "orange",
    padding: 15,
    fontWeight: "bold",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    borderWidth: 1,
    backgroundColor: "#F5F6F2",
    borderColor: "#D9D9D9",
    padding: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },

  label: { padding: 5, fontSize: 15 },
});
