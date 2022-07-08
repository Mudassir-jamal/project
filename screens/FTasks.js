// import axios from 'axios';
// import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

import mime from "mime";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  Modal,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FormSubmitButton from "../assets/buttons/FormSubmitButton";
import OrderNowButton from "../assets/buttons/OrderNowButton";
import AudioPlay from "../components/AudioPlay";
import ImageTest from "../components/ImagePicker";

import PushNotifications from "../components/PushNotifications";

import { createOrderHandle } from "../redux/actions/ordersActions";
import { BottomSheet, CheckBox } from "react-native-btr";
import { getAllLocations } from "../redux/actions/locationActions";
// import DropDownPicker from 'react-native-dropdown-picker';

// import { TouchableRipple } from 'react-native-paper';
// import CardViewWithImage from './components/Cards';
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

const { windowHeight, width } = Dimensions.get("window");

export default function ({ route }) {
  const navigation = useNavigation();
  // DropDownPicker.setListMode("SCROLLVIEW");s
  const params = route.params;

  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [visibleLoc, setVisibleLoc] = useState(false);

  const [loading, setLoading] = useState(false);

  const { accessToken, refreshToken } = useSelector(
    (state) => state.userTokensReducer.userTokens
  );

  const { allLocation, allLocationLoading } = useSelector(
    (state) => state.userAllLocationReducer
  );

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    allLocationLoading == false ? setCurrentLocation(allLocation[0]) : null;
  }, [allLocationLoading]);

  // console.log("all location in FTask screen log", state);

  // console.log(selectedImage,"fttask");

  const [itemsOne, setItemsOne] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [itemsTwo, setItemsTwo] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  let imgUri = selectedImage ? selectedImage : null;
  let Voice = recordings.length != 0 ? recordings[0].file : null;

  const submitHandle = () => {
    setLoading(true);
    //   let formData = new FormData();

    //   let trimmedURI = Platform.OS === 'android' ? selectedImage.uri : selectedImage.replace('file://', '')
    //   let fileName = trimmedURI.split("/").pop();
    //   let match = /\.(\w+)$/.exec(fileName);
    //   let type = match ? `image/${match[1]}` : `image`;

    //   const media = {
    //     name: fileName,
    //     height: selectedImage.height,
    //     width: selectedImage.width,
    //     type:type,
    //     uri: selectedImage.uri
    // };

    // formData.append("activity", params.activity);
    // formData.append("category", params.category);
    // formData.append("description", description);
    // formData.append("image_url", media);
    //   console.log(media,params,"==============================");

    // const newImageUri =  "file:///" + selectedImage.uri.split("file:/").join("");
    // const newImageUri =  "file:///" + imageUri.split("file:/").join("");

    // const imgData = new FormData();
    // imgData.append('image', {
    //  uri :imgUri,
    //  type: mime.getType(imgUri),
    //  name: imgUri.split("/").pop()
    // });

    if (description || selectedImage || Voice) {
      let imgfile = "";
      let recfile = "";

      if (imgUri != null) {
        console.log("FTASK Screen imgUri LOg =====>", imgUri);
        imgfile = imgUri
          ? {
              uri: imgUri.uri,
              type: mime.getType(imgUri.uri),
              name: imgUri.uri.split("/").pop(),
            }
          : "";
      }

      if (Voice != null) {
        console.log("FTASK Screen Voice LOg =====>", Voice);
        recfile = {
          uri: Voice,
          type: mime.getType(Voice),
          name: Voice.split("/").pop(),
        };
      }
      // let formData = new FormData();
      // formData.append('image_url', imgfile);
      // formData.append('activity',params.activity);
      // formData.append('category',params.category);
      // formData.append('description',description);

      let data = {
        ...params,
        description: description,
        location_id: currentLocation.pk_user_location_id,
      };

      if (imgfile) data = { ...data, image_url: imgfile };
      if (recfile) data = { ...data, voice_note_url: recfile };

      console.log("FTASK Screen complete ORDER DATA LOg =====>", data);
      console.log(Voice);
      createOrderHandle(accessToken, data, navigation, setLoading, dispatch);

      // console.log(data,"==============================");
    } else {
      alert("Data Empty...!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLocations(dispatch);
  }, []);

  function toggle() {
    setVisible((visible) => !visible);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles}>
        <View style={styles.container}>
          <View style={styles.topSections}>
            <View
              style={{
                flex: 5,
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{ fontWeight: "700", color: "#2B2B2B", fontSize: 14 }}
              >
                ACTIVITY:{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#878787",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                {params.activity ? params.activity : ""}
              </Text>
            </View>
          </View>

          <View style={[styles.topSections, { marginTop: 20 }]}>
            <View
              style={{
                flex: 5,
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{ fontWeight: "700", color: "#2B2B2B", fontSize: 14 }}
              >
                CATEGORY:{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#878787",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                {params.category ? params.category : ""}
              </Text>
            </View>

            {/* <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ fontWeight: '500', color: '#878787', fontSize: 12,textTransform:'uppercase'  }}></Text></View> */}
          </View>

          <View>
            <TextInput
              style={styles.additionalInfo}
              multiline
              onChangeText={setDescription}
              numberOfLines={6}
              placeholder="Additional Information"
              placeholderStyle={{ justifyContent: "flex-start" }}
            />
          </View>

          {/* <View style={styles.pickFromSection}> 
             <View
              style={{
                flex: 5,
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{ fontWeight: "700", color: "#2B2B2B", fontSize: 14 }}
              >
                PICK FROM:{" "}
              </Text>
              <Text
                style={{ fontWeight: "500", color: "#878787", fontSize: 12 }}
              >
                NEARBY{" "}
              </Text>
            </View> 

             <View style={styles.verticalLineDivider}></View>

            <TouchableOpacity
              style={{ width: 70, paddingVertical: 10, alignItems: "center" }}
            >
              <Image
                style={{ width: 20, height: 20, resizeMode: "contain" }}
                source={require("../assets/location-icon.png")}
              />
              <Text style={{ fontSize: 9, marginTop: 5 }}>CHANGE</Text>
            </TouchableOpacity> 
          </View> */}

          <View style={styles.deliverToSection}>
            <View style={{ flex: 5, paddingVertical: 10 }}>
              <Text
                style={{ fontWeight: "700", color: "#2B2B2B", fontSize: 14 }}
              >
                DELIVER TO:
              </Text>

              {currentLocation && (
                <Text
                  style={{ fontWeight: "500", color: "#878787", fontSize: 12 }}
                >
                  Current Location: {currentLocation.address}
                </Text>
              )}
            </View>

            <View style={styles.verticalLineDivider}></View>

            <TouchableOpacity
              onPress={() => setVisibleLoc(true)}
              style={{ width: 70, paddingVertical: 10, alignItems: "center" }}
            >
              <Image
                style={{ width: 20, height: 20, resizeMode: "contain" }}
                source={require("../assets/location-icon.png")}
              />
              <Text style={{ fontSize: 9, marginTop: 5 }}>CHANGE</Text>
            </TouchableOpacity>
          </View>

          {/* <PushNotifications /> */}

          <AudioPlay setRecordings={setRecordings} recordings={recordings} />

          {/* <PushNotifications /> */}

          {/* <AudioPlay setRecordings={setRecordings} recordings={recordings} /> */}

          {/* <TouchableOpacity
            onPress={() => setVisibleLoc(true)}
            style={styles.confirmLocation}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              CONFIRM YOUR LOCATION
            </Text>
          </TouchableOpacity> */}

          <BottomSheet
            visible={visibleLoc}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
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
                        return (
                          <TouchableOpacity
                            key={ind}
                            onPress={() => {
                              setCurrentLocation(loc);
                              setVisibleLoc(false);
                            }}
                          >
                            <View style={styles.row} key={ind}>
                              <Text style={styles.label}>{loc.address}</Text>
                            </View>
                          </TouchableOpacity>
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
            </View>
          </BottomSheet>

          <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // paddingVertical: 20,
                justifyContent: "space-between",
              }}
            >
              <View>
                <ImageTest
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                  setSelectedImage={setSelectedImage}
                  selectedImage={selectedImage}
                />
              </View>

              <View>
                <OrderNowButton
                  loading={loading}
                  onPressHandle={submitHandle}
                  buttonCaption="ORDER NOW"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // height:windowHeight,
    // width:width,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    // height:height
    // flex:1
  },
  topSections: {
    paddingStart: 20,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: width / 1 - 45,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 13,
  },

  additionalInfo: {
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#D9D9D9",
    marginTop: 20,
    width: width / 1 - 45,

    borderRadius: 8,
    paddingHorizontal: 20,
  },

  rowCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  pickFromSection: {
    paddingStart: 20,
    backgroundColor: "#F5F6F2",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: width / 1 - 45,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    height: 50,
  },

  deliverToSection: {
    paddingStart: 20,
    backgroundColor: "#F5F6F2",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    height: 50,
  },

  verticalLine: {
    width: 1,
    height: windowHeight,
    backgroundColor: "#fff",
    margin: 4,
  },

  mt: {
    marginTop: 18,
  },

  verticalLineDivider: {
    width: 0.5,
    height: "100%",
    backgroundColor: "black",
    opacity: 0.5,
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
    height: 350,
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  locationContainer: {
    width: "100%",
    height: 280,
    marginTop: 20,
  },

  row: {
    borderWidth: 1,
    backgroundColor: "#F5F6F2",
    borderColor: "#D9D9D9",
    padding: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },

  label: {
    textAlign: "center",
  },
});
