

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createRatingsHandle } from "../redux/actions/ratingsAction";

const FeedBack = ({navigation,route}) => {
  // To set the default Star Selected

  const {orderId} = route.params

  console.log(orderId,"0000000")
  const [defaultRating, setDefaultRating] = useState(0);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);


  const [maxRating, setMaxRating] = useState([2, 4, 6, 8, 10]);

  const { accessToken, refreshToken } = useSelector(
    (state) => state.userTokensReducer.userTokens
  );

  const dispatch = useDispatch()

  //   // Filled Star. You can also give the path from local
  //   const starImageFilled = "../assets/star.png";
  //   // Empty Star. You can also give the path from local
  //   const starImageCorner = "../assets/food.png";

  let rate = defaultRating / 10


  const getData = () => {

    setLoading(true)
    if (defaultRating || inputText) {
      let data = {
        // order_id: orderId,
        ratings: rate,
        comments: inputText,
      };


      createRatingsHandle(accessToken,data,navigation,orderId,dispatch,setLoading)
      console.log(data);

      // setDefaultRating();
      // setInputText("");
      

    } else {
       alert("Emty data")

    }
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, ind) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={ind}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? require("../assets/star_filled.png")
                    : require("../assets/star_corner.png")
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.textStyle}>
              How was your experience with us
            </Text>
            <Text style={styles.textStyleSmall}>Please Rate Us</Text>
          </View>

          <View>
            {/*View to hold our Stars*/}
            <CustomRatingBar />
            <Text style={styles.textStyle}>
              {/*To show the rating selected*/}
              {defaultRating} / {Math.max.apply(null, maxRating)}
            </Text>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#d9d9d9",
                marginTop: 30,
              }}
            ></View>
          </View>

          <View>
            <TextInput
              multiline={true}
              style={styles.textInput}
              numberOfLines={4}
              placeholder="Please tell us more..."
              placeholderTextColor="grey"
              value={inputText}
              onChangeText={(e) => setInputText(e)}
              //   underlineColorAndroid="#d9d9d9"
            />
          </View>

          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonStyle}
              onPress={() => getData()}
            >
              {/*Clicking on button will show the rating as an alert*/}
              {loading ? <Text>Loading...</Text> :<Text style={styles.buttonTextStyle}>DONE</Text> }
              
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    textAlign: "center",
  },
  textInput: {
    height: 100,
    width: "100%",
    // borderWidth:1';//
    alignSelf: "center",
    paddingLeft: 20,
    // paddingBottom :10,
    fontSize: 17,
    marginTop: 50,
    // borderBottomColor:"#d9d9d9",
    // borderBottomWidth:1,
    // border:"none"
  },
  titleText: {
    padding: 8,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "#000",
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 80,
    padding: 13,
    backgroundColor: "#ec9b01",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: "100%",
    alignSelf: "flex-end",
  },
  buttonTextStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
    width: "100%",
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginTop: 50,
  },
});
