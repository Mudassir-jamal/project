import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";
import ImageModal from "react-native-image-modal";

import * as ImagePicker from "expo-image-picker";
import SheetBottom from "./BottomSheet";

export default function ImageTest({ setModalVisible, modalVisible,setSelectedImage,selectedImage }) {

  const [localImg, setLocalImg] = useState();
  const [visible, setVisible] = useState(false);


  // ==================== OPEN GALLERY FUNCTION ==================================//

  let filename;
  let localUri;
  
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    console.log(pickerResult)

    localUri = pickerResult.uri;
    filename = localUri.split('/').pop();

 
   // Infer the type of the image
   let match = /\.(\w+)$/.exec(filename);
   let type = match ? `image/${match[1]}` : `image`;

     const data = new FormData();
    data.append("image", {
    uri:  pickerResult,
    name: filename,
    type: type,
  });

// console.log(data,"========================");
// setLocalImg({ localUri: pickerResult.uri });
setSelectedImage(pickerResult)
  };

  if (selectedImage !== null) {
    return (
      <>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        </View>
        <Modal
          visible={visible}
          transparent={true}
          style={{ backgroundColor: "red", height: 300 }}
          animationType="slide"
          onRequestClose={() => {
            setVisible(!visible);
          }}
        >
          <View style={styles.mainModal}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={{ height: 350, width: 350, resizeMode: "contain" }}
            />
          </View>
        </Modal>
      </>
    );
  }

  // ==================== OPEN CAMERA FUNCTION ==================================//

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result.cancelled === true) {
      return;
    }

    setSelectedImage(result);
  };

  if (selectedImage !== null) {
    return (
      <>
      <View style={styles.imagePickerContainer}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
          />
      </View>

      <Modal
        visible={visible}
        transparent={true}
        style={{backgroundColor:"red",height:300}}
        animationType="slide"       
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisible(!visible);
        }}
     >
      <View  style={styles.mainModal}>

      <Image 
        source={{ uri: selectedImage.localUri }}
        style={{height:250,width:250,resizeMode:"contain"}}
        
        />
      </View>
      
     </Modal>
          </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <>
          <SheetBottom
            openImagePickerAsync={openImagePickerAsync}
            setModalVisible={setModalVisible}
            openCamera={openCamera}
            modalVisible={modalVisible}
          />

          <View
            style={
              selectedImage
                ? styles.imagePickerContainer
                : styles.BeforeimagePickerContainer
            }
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.button}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{ width: 25, height: 25, resizeMode: "contain" }}
                  source={require("../assets/image-upload-icon.png")}
                />
                <Text style={{ fontSize: 9, marginTop: 5, color: "#878787" }}>
                  UPLOAD
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  thumbnail: {
    width: 80,
    maxWidth: 40,
    height: 40,
    maxHeight: 40,
    resizeMode: "contain",
    // borderWidth:0.5,
    // borderColor:"#d9d9d9"
  },

  imagePickerContainer: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: 60,
    maxWidth: 80,
    // marginTop: 15,
  },

  BeforeimagePickerContainer: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: 60,
    maxWidth: 80,
    marginTop: 0,
  },

  mainModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    
  },
});
