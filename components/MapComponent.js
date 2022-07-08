import React, { useState, useEffect, useRef } from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, {
  Callout,
  Circle,
  Marker,
  MarkerAnimated,
} from "react-native-maps";
import * as Location from "expo-location";
import { PermissionStatus } from "expo-location";
import { BottomSheet } from "react-native-btr";
import pin from "../assets/Pin.png";
import { useRoute } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export default function MapComponent(props) {
  const { params } = useRoute();
  console.log("ROUTE LOG IN MAP COMPONENT",params);


  let checkParams

  if(params !== undefined || null){
    checkParams = params
  }

  const { navigation } = props;
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState(null);
  // const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [locationChange, setLocationChange] = useState(false);
  const [locationPin, setlocationPin] = useState(null);
  const [ChangeUpdatedCord, setChangeUpdatedCord] = useState(null)

  // const [regionChange, setregionChange] = useState();

  const [map, setMap] = useState(null); // I'm using state to save a reference to the map because useRef() won't work and I don't know why

  const locationHandle = () => {
    if (location) {
      // console.log(location);
      // Current_location_coordinates = `${location.latitude},${location.longitude}`
      // search_coordinates = `${region.latitude},${region.longitude}`
      // pin_coordinates = `${locationpin.latitude},${locationpin.longitude}`

      // navigation.navigate("UserAddress", {
      //   coordinates: `${location.latitude},${location.longitude}`,
      //   action: params?.action,
      //   loc: params?.loc,
      // });
      // navigation.navigate('UserAddress',{coordinates:`${locationPin !== null ? locationPin.latitude:!locationChange ?location.latitude :region.latitude } , ${locationPin !== null ? locationPin.longitude  : !locationChange ? location.longitude : region.longitude }`})
      let trim = `${
        locationPin !== null
          ? locationPin.latitude
          : !locationChange
          ? location.latitude
          : region.latitude
      } , ${
        locationPin !== null
          ? locationPin.longitude
          : !locationChange
          ? location.longitude
          : region.longitude
      }`;
      var finalTrim = trim.replace(/ /g, "");

      console.log(finalTrim, "cc", trim);
      // navigation.navigate('UserAddress',{coordinates : `${location.latitude},${location.longitude}`})
      navigation.navigate("UserAddress", { coordinates: finalTrim,
                                           action: checkParams?.action,
                                           loc: checkParams?.loc,
      });


      
     
      // navigation.navigate('UserAddress',{coordinates:`${!locationChange ? location.latitude : region.latitude},    ${!locationChange ? location.longitude : region.longitude}`})
      // console.log(location_coordinates);
    }
  };

  const ref = useRef();
  const mapRef = React.useRef < MapView > null;

  useEffect(() => {
    ref.current?.setAddressText("");

    
    if(checkParams?.action === "updateLoc"){
      setChangeUpdatedCord(
        
        {
          latitude: parseFloat(params.lat),
          longitude: parseFloat(params.long),
        }
        )
        
        
    }
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //   console.log(location)
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setPin({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //   console.log(location)
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        // latitudeDelta: 0.45,
        // longitudeDelta: 0.45,
      });
      setPin({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    })();
  }, [Location]);

  // console.log(errorMsg);

  const centerMap = () => {
    map.animateToRegion(region);
  };

  if (!location) {
    return <ActivityIndicator color="#EBA620" />;
  }

  // const handleOnregionChange  = () => {

  // }

  //  const  onRegionChange = (region) => {
  //   console.log(region)
  //     setRegion({ region });
  //   }

  let locationCondition = locationChange ? region : location;

  let karachiCordinates = {
    Latitude: 24.860966,
    Longitude: 66.990501,
  };

 
  // const cordOne = `${seprateUpdatedCord?.[0]}`
  // const cordTwo = `${seprateUpdatedCord?.[1]}`

 
  // if(params.action === "updateLoc"){

  // }

 
 

  // console.log(final);
  // const finalUpdatedCord = {
  //   latitude:seprateUpdatedCord?.[0],
  //   longitude: seprateUpdatedCord?.[1],
  // }

  const conditionUpdatedLocationOrPin = ChangeUpdatedCord !== null || undefined ? ChangeUpdatedCord : pin
  // if(conditionUpdatedLocationOrPin === undefined || null){
    // return<ActivityIndicator color="#EBA620"/>  }
    

  // console.log(seprateUpdatedCord[seprateUpdatedCord.length - 1]);
  
  // console.log(finalUpdatedCord)


  //    console.log(params?.loc?.location_coordinates.split(','),"[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
  // let updatedLocation = params?.loc?.location_coordinates.split(',') ? {latitude : } : null

  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        autoFocus={false}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          setLocationChange(details != null ? true : false);
          // 'details' is provided when fetchDetails = true
          console.log(
            data,
            "===================data",
            details.geometry.location.lat,
            details.geometry.location.lng,
            "======================< datasidhhk"
          );
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        query={{
          key: "AIzaSyBHNy3sNOKYAXyKy3GcvyyRxroxZJnimuA",
          language: "en",
          components: "country:pk",
          types: "establishment",
          radius: 1000,
          location: `${karachiCordinates.Latitude}, ${karachiCordinates.Longitude}`,
        }}
        styles={{
          container: {
            position: "absolute",
            width: "82%",
            zIndex: 1,
            right: 10,
            left: 10,
            top: 10,
          },
          listView: { backgroundColor: "white" },
        }}
      />

      <View

      // style={{position:'relative'}}
      >
        <View
          style={{ position: "absolute", top: 20, width: 300, zIndex: 1001 }}
        ></View>

        <MapView
          ref={(map) => setMap(map)}
          style={styles.map}
          loadingEnabled={true}
          showsUserLocation={true}
          userLocationCalloutEnabled={true}
          showsMyLocationButton={true}
          initialRegion={location}
          // showsCompass={true}

          region={locationCondition}
          // onRegionChange={onRegionChange}
          // userInterfaceStyle='dark'
          // showsTraffic={true}
          // onRegionChangeComplete={centerMap}
          // onRegionChange={handleOnregionChange}
          // coordinates={{
          //   latitude: 37.78825,
          //   longitude: -122.4324,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}

          provider="google"
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            draggable={true}
            // onDragStart={(e) => {console.log('start', e.nativeEvent.coordinate)}}
            onDragEnd={(e) => {
              setlocationPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          >
            <Image
              source={require("../assets/Pin.png")}
              style={{ width: 50, height: 50, resizeMode: "contain" }}
            />
          </Marker>


          {/* INITIAL MARKER   */}

          <Marker
            coordinate={conditionUpdatedLocationOrPin}
            draggable={true}
            // onDragStart={(e) => {console.log('start', e.nativeEvent.coordinate)}}
            onDragEnd={(e) => {
              setlocationPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          >
            {/* {console.log(locationPin,"=-=-=-=-=-=")} */}
            <Image
              source={require("../assets/Pin.png")}
              style={{ width: 50, height: 50, resizeMode: "contain" }}
            />
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
          <Circle center={pin} radius={500} />
          {/* <Circle center={locationPin === null ? region : locationPin} radius={500} /> */}
        </MapView>
        <View
          style={{
            position: "absolute",
            bottom: 100,
            paddingHorizontal: 20,
            width: width,
          }}
        >
          <TouchableOpacity
            onPress={locationHandle}
            style={styles.saveLocationButton}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Confirm Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "relative",
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height
    height: Dimensions.get("window").height,
  },
  saveLocationButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // borderStartColor:'#ec9b01',
    backgroundColor: "#ec9b01",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
