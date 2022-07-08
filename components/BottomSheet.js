import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";

const SheetBottom = ({
  setModalVisible,
  modalVisible,
  openImagePickerAsync,
  openCamera,
  cameraImagePath,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        animationType={"fade"}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >


        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <View >
           <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
               <Image
                style={{ width: 20, height: 20, resizeMode: "contain" }}
                source={require("../assets/cancel.png")}
              />
            </TouchableOpacity>
           </View>

           <View style={styles.TwoImages}>

            <TouchableOpacity onPress={openImagePickerAsync}>
              {/* <Text style={styles.btnText}>Open Gallery</Text> */}
              <Image
                style={{ width: 60, height: 60, resizeMode: "contain" }}
                source={require("../assets/gallery.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={openCamera}>
              <Image
                style={{ width: 55, height: 55, resizeMode: "contain" }}
                source={require("../assets/photo.png")}
              />
            </TouchableOpacity>
           </View>

          </View>
        </View>
      </Modal>
      {/* <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    // marginBottom: 60,
  },

  modalView: {
    marginBottom: 160,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 8,
    width: "75%",
    borderWidth: 0.5,
    borderColor: "#d9d9d9",
    backgroundColor: "#F5F6F2",
   

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  TwoImages:{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 35,

    justifyContent: "space-around",
  },
  button: {
     position:"absolute",
     top:10,
     left:10,
  },

  btnText: {
    color: "white",
    textAlign: "center",
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  openGallery: {},
});

export default SheetBottom;
