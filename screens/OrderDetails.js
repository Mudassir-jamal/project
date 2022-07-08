import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrderByIdHandle,
  getOrderByIdHandle,
  getOrdersHandle,
} from "../redux/actions/ordersActions";
import { getOrderFilesApi } from "../apis/ordersApi";
import CancelOrderButton from "../assets/buttons/CancelOrderButton";
import DisputeOrderButton from "../assets/buttons/DisputeOrderButton";
import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio, Sound } from "expo-av";
import { DataTable } from "react-native-paper";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


DataTable
const orderDetailsColumns = [
  {
    title: "Order ID",
    id: "",
    val: "05",
    bottomDivider: true,
  },
  {
    title: "Pick from",
    id: "",
    val: "Gulshan-e-Iqbal, Karachi",
    bottomDivider: false,
  },
  {
    title: "Deliver to",
    id: "",
    val: "A-43, Block H, Nazimabad, Karachi",
    bottomDivider: true,
  },
  {
    title: "Activity",
    id: "",
    val: "Purchases",
    bottomDivider: false,
  },
  {
    title: "Category",
    id: "",
    val: "Medicine",
    bottomDivider: false,
  },
  {
    title: "Additional Information",
    id: "",
    val: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    bottomDivider: true,
  },
];

const { height, width } = Dimensions.get("window");
export const OrderDetails = ({ route, navigation }) => {
  const params = route.params;
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState("");
  const [btnChange, setBtnChange] = useState(false);
  const [visible, setVisible] = useState(false);
  // console.log(params, "============");R
  const dispatch = useDispatch();

  const {
    orderById,
    isLoading,
    error,
    orderVoiceNote,
    orderImageUrl,
    isImageLoad,
    isVoiceLoad,
  } = useSelector((state) => state.orderByIdReducer);

  console.log("isImageLOad", orderById,"skdfnksnfsfn");
  // console.log("isVoiceLOad", isVoiceLoad);

  const { accessToken, refreshToken } = useSelector(
    (state) => state.userTokensReducer.userTokens
  );

  const checkDeviceID = async () => {
    const userDeviceId = await AsyncStorage.getItem("@storage_DeviceId");

    if (userDeviceId) {
      setDevice(userDeviceId);
    }
  };
  console.log("*************************************");
  console.log("order detail Screen imageURL", orderImageUrl);
  console.log("order detail Screen voice note", orderVoiceNote);
  console.log("*************************************");

  const redirect = (params) => {
    let res = orderById.map((order, ind) => {
      if (order.order_status === "completed" && order.rider_ratings === null) {
        navigation.navigate("FeedBack", { orderId: params.id });
      }
    });
  };

  // console.log(orderById,"prderbyiif");ss
  const cancelOrderHandle = () => {
    setLoading(true);
    cancelOrderByIdHandle(accessToken, params.id, dispatch, setLoading);
  };

  const disputeOrderHandle = () => {
    // setLoading(true)
    navigation.navigate("dispute-order", {
      id: params.id ? params.id : orderById?.[0]?.id,
    });
  };

  const convertImageHandle = (image) => {
    const buffer = image?.data;
    // const base64 = Buffer.from(buffer).toString("base64");
    // convertedImg = "data:image/jpg;base64," + base64;
    console.log("Buffer function in image convert handle");
  };

  const convertVoiceHandle = (voice) => {
    let convertedVoice;
    const Voicebuffer = voice?.data;
    // const base64Voice = Buffer.from(Voicebuffer).toString("base64");
    // convertedVoice = "data:file;base64," + base64Voice;
    console.log("Buffer function in voice convert handle");
  };

  useEffect(() => {
    getOrderByIdHandle(accessToken, params.id, dispatch);
    checkDeviceID();
    // orderStatus()
  }, []);
  // console.log(orderById);

  return (
    <View style={styles.container}>
      {console.log("UI RENDERS")}
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          <ActivityIndicator size="large" color="lightgray" />
        </View>
      ) : orderById && orderById.length !== 0 ? (
        <ScrollView>
          {orderById.map((order, ind) => {
            // console.log(order?.image_url?.data );

            // setDevice(order)
            //       if(order.order_status === "completed"  && order.rider_ratings === null ){

            //         return navigation.navigate('FeedBack',{orderId : params.id})
            // }
            // {
            //   imagecheck ? convertImageHandle(orderImageUrl) : null;
            // }
            // {
            //   voicecheck ? convertVoiceHandle(orderVoiceNote) : null;
            // }

            let convertedImg;
            let convertedVoice;

            // let imgCheck =
            //   order?.image_url === "notfound.jpg" || null
            //     ? null
            //     : order?.image_url?.data;
            // let voiceCheck =
            //   order?.voice_note_url != null
            //     ? order?.voice_note_url.data
            //     : "null";

            if (isImageLoad === false) {
              const buffer = orderImageUrl?.data;
              const base64 = Buffer.from(buffer).toString("base64");
              convertedImg = "data:image/jpg;base64," + base64;
              //   console.log(convertedImg, "----->>>>>> image");
            }

            if (isVoiceLoad === false) {
              const Voicebuffer = orderVoiceNote?.data;
              const base64Voice = Buffer.from(Voicebuffer).toString("base64");
              convertedVoice = "data:file;base64," + base64Voice;
              //   console.log(convertedVoice, "----->>>>>> voice");
            }

            const soundPlay = async () => {
              setBtnChange(true);
              const sound = new Audio.Sound();
              try {
                await sound.loadAsync({
                  uri: convertedVoice,
                });
                await sound.playAsync();
                console.log(sound.playAsync());
              } catch (error) {
                console.log(error);
              }

              console.log(sound, "sound object");
            };

            // const stopSound = async() => {
            //     setBtnChange(false)
            //     const sound = new Audio.Sound();
            //             try {
            //               await sound.loadAsync({
            //                 uri:convertedVoice

            //             });
            //            await sound.pauseAsync();

            //             } catch (error) {console.log(error,"----------errrr")}

            //             console.log(sound,"sound object");
            // }

            //  console.log(order?.voice_note_url, convertedVoice, "==>maiii")

            return (
              <View
                key={ind}
                style={{
                  paddingTop: 20,
                  paddingBottom: 75,
                  paddingHorizontal: 20,
                }}
              >
                {redirect(params)}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ marginVertical: 15 }}>
                    <Text style={styles.title}>Order ID</Text>
                    <Text style={{ fontSize: 16, color: "#505050" }}>
                      {order?.id}
                    </Text>
                  </View>
                  <View style={{ marginVertical: 15 }}>
                    <Text style={styles.title}>Status</Text>
                    <Text style={{ fontSize: 16, color: "#505050" }}>
                      {order?.order_status}
                    </Text>
                  </View>
                </View>
                <View style={styles.horizontalLineDivider}></View>

                {/* <View style={{ marginVertical: 15 }}>
                  <Text style={styles.title}>Pick from</Text>
                  <Text style={{ fontSize: 16, color: "#505050" }}>
                    Gulshan-e-Iqbal, Karachi
                  </Text>
                </View> */}

                <View style={{ marginVertical: 15 }}>
                  <Text style={styles.title}>Deliver to</Text>
                  <Text style={{ fontSize: 16, color: "#505050" }}>
                    {order?.delivery_address[0]}
                  </Text>
                </View>

                <View style={styles.horizontalLineDivider}></View>

                <View style={{ marginVertical: 15 }}>
                  <Text style={styles.title}>Activity</Text>
                  <Text style={{ fontSize: 16, color: "#505050" }}>
                    {order?.activity}
                  </Text>
                </View>

                <View style={{ marginVertical: 15 }}>
                  <Text style={styles.title}>Category</Text>
                  <Text style={{ fontSize: 16, color: "#505050" }}>
                    {order?.category}
                  </Text>
                </View>

                <View style={{ marginVertical: 15 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={styles.title}>Additional Information</Text>
                      <Text style={{ fontSize: 15, color: "#505050" }}>
                        {order?.description}
                      </Text>
                    </View>
                    {/* {console.log(order.image_url.data[0],"----------------------------")}
                        {console.log(order.image_url)} */}

                    <View>
                      {
                        isImageLoad === false ? (
                          <TouchableOpacity onPress={() => setVisible(true)}>
                            <View style={styles.BeforeimagePickerContainer}>
                              <Image
                                style={{
                                  width: 20,
                                  height: 20,
                                  resizeMode: "contain",
                                }}
                                source={{ uri: convertedImg }}
                              />
                            </View>
                          </TouchableOpacity>
                        ) : null
                        // <View>
                        //   <ActivityIndicator size="small" color="lightgray" />
                        // </View>
                      }
                    </View>
                  </View>

                  {/* modal for Image */}

                  <Modal
                    visible={visible}
                    transparent={true}
                    style={{ backgroundColor: "black", height: 300 }}
                    animationType="slide"
                    onRequestClose={() => {
                      setVisible(false);
                    }}
                  >
                    <View style={styles.mainModal}>
                      <Image
                        source={{ uri: convertedImg }}
                        style={{
                          height: 250,
                          width: 250,
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  </Modal>

                  {/* modal for Image */}

                  <View>
                    {
                      isVoiceLoad === false ? (
                        <View style={styles.row}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={soundPlay}
                          >
                            <Image
                              style={{
                                width: 20,
                                height: 20,
                                resizeMode: "contain",
                              }}
                              source={require("../assets/play-icon.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : null
                      // <View>
                      //   <ActivityIndicator size="small" color="lightgray" />
                      // </View>
                    }
                  </View>
                </View>

                <View style={styles.horizontalLineDivider}></View>

                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{ fontSize: 23, color: "black", fontWeight: "600" }}
                  >
                    Rider Details
                  </Text>
                </View>

                {order?.rider?.length === 0 ? (
                  <View>
                    <Text style={styles.title}>
                      Rider Details are not available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <View style={{ marginVertical: 15 }}>
                      <Text style={styles.title}>Name</Text>
                      <Text style={{ fontSize: 16, color: "#505050" }}>
                        {order?.rider?.user_name}
                      </Text>
                    </View>
                    <View style={{ marginVertical: 15 }}>
                      <Text style={styles.title}>Contact #</Text>
                      <Text style={{ fontSize: 16, color: "#505050" }}>
                        {order?.rider?.phone}
                      </Text>
                    </View>
                  </View>
                )}

                
<View style={[styles.horizontalLineDivide,{marginTop:15}]}></View>
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{ fontSize: 23, color: "black", fontWeight: "600" }}
                  >
                    Order Cost
                  </Text>
                </View>
                {console.log(order?.order_task_costs)}
                {
                  order?.order_task_costs.length === 0 ?
                  <Text>Order Cost are not available..</Text>:
                    (<View key={ind} style={{width:"90%"}}>
 

                          {/* <View style={{marginTop:15,flexDirection:"row",justifyContent:"space-between"}}>
                              <Text style={styles.title,{fontWeight:"700"}}>Shop Name</Text>
                              <Text style={{textAlign:"center"}}>:</Text>
                              <Text style={styles.title,{fontWeight:"700"}}>Amount</Text>
                          </View>                  */}
                      {order?.order_task_costs.map((val,ind) => {
                            const CONTENT = {
                              tableHead: ['Shop Name','Amount'],
                              tableTitle: [val?.store_name, 'Sub-Total', 'Rider Charges', 'Total'],
                              tableData: [
                                [val?.amount],
                                [order?.order_total],
                                [order?.rider_charges],
                                [parseFloat(order?.rider_charges)+parseFloat(order?.order_total)],
                              ],
                            };
                         
                      return(
                          <>
                           <Table style={{marginTop:20}} borderStyle={{ borderWidth: 1 }}>
        <Row
          data={CONTENT.tableHead}
          flexArr={[1, 1]}
          style={styles.head}
          textStyle={styles.headerText}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
          
            data={CONTENT.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.headerText}
          />
          <Rows
            data={CONTENT.tableData}
            flexArr={[ 1]}
            style={styles.row}
            textStyle={styles.text}
            // style={(i === books.length - 1) ? styles.noBorderBook : styles.book}
          />
        </TableWrapper>
      </Table>
                        

                          </>
                          )})}

                     
                    </View>
                      
                    
                    )
                }



                {/* <View style={styles.horizontalLineDivider}></View> */}
                
                {/* {order.cancellation &&
                        <View style={{ marginVertical: 20 }}>
                            <CancelOrderButton loading={false} onPressHandle={cancelOrderHandle} buttonCaption='CANCEL ORDER' />
                        </View>
                      } */}
                      
                {/* {order.disputable &&
                        <View style={{ marginVertical: 20 }}>
                            <DisputeOrderButton loading={false} onPressHandle={disputeOrderHandle} buttonCaption='DISPUTE ORDER' />
                        </View>
                    } */}

                {/* <View style={{ marginVertical: 20 }}>
                            {order.cancellation === 'canceled' ? <View><Text style={{textAlign:'center',fontSize:16,color:'gray'}}>CANCELLED</Text></View> : <CancelOrderButton loading={false} onPressHandle={cancelOrderHandle} buttonCaption='CANCEL ORDER' />}
                        </View> */}

                <Text>{order.rider_ratings}</Text>
              </View>
            );
          })}
          {/* <Text style={{ textAlign: "center" }}>{device}</Text> */}
        </ScrollView>
      ) : error ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          <Text style={{ color: "red", fontSize: 20 }}>{error}</Text>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          <Text style={{ color: "#bfbfbf", fontSize: 20 }}>No data found!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // paddingVertical: 20,
    minHeight: height,
  },
  title: {
    fontSize: 15,
    color: "#000",
  },

  titleValue: {
    fontSize: 22,
    color: "#505050",
  },
  horizontalLineDivider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#707070",
    opacity: 0.5,
    // marginVertical:15,
  },
  price: {
    fontWeight: "800",
    fontSize: 16,
    color: "black",
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
    padding: 10,
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

  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    marginTop: 15,
    borderRadius: 8,
  },

  button: {
    margin: 15,
  },

  head: { height: 40, backgroundColor: 'orange' },
  headerText : {fontWeight:"bold",textAlign:"center"},
  wrapper: { flexDirection: 'row' },
  Tabletitle: { flex: 1, backgroundColor: '#2ecc71' },
  row: { height: 28 },
  text: { textAlign: 'center' },
});
