import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions,TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersHandle } from '../redux/actions/ordersActions';
import { useFocusEffect } from '@react-navigation/native';



const { height, width } = Dimensions.get('window')
export default function Orders({navigation,route}) {

  const dispatch = useDispatch()
  const state = route ? route.params : ''

  


  const { orderList, isLoading,error } = useSelector(state => state.orderListReducer)
  const {accessToken,refreshToken} = useSelector(state=>state.userTokensReducer.userTokens)

  console.log('accessToken===============>',accessToken);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      getOrdersHandle(accessToken,dispatch)
    });

    return unsubscribe;
    // ScreenWithCustomBackBehavior()
  }, [navigation])


  function handleBackButtonClick() {
    navigation.navigate('Tabs');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  // function ScreenWithCustomBackBehavior() {
    // ...
  
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       const onBackPress = () => {
  //         if (isSelectionModeEnabled()) {
  //           disableSelectionMode();
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       };
  
  //       BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
  //       return () =>
  //         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //     }, [isSelectionModeEnabled, disableSelectionMode])
  //   );
  
  //   // ...
  // }
  



  // const data = [
//   {
  //     orderNo: 111197980222,
  //     price: 1250,
  //     status: 'Delivered',
  //     statusColor: "#4BB543"
  //   },

  //   {
  //     orderNo: 22345663131,
  //     price: 1250,
  //     status: 'Pending',
  //     statusColor: "black",

  //   },
  //   {
  //     orderNo: 111197980222,
  //     price: 1250,
  //     status: 'Delivered',
  //     statusColor: "#4BB543"
  //   },
  //   {
  //     orderNo: 111197980222,
  //     price: 1250,
  //     status: 'Pending',
  //     statusColor: "black",

  //   },
  //   {
  //     orderNo: 111197980222,
  //     price: 1250,
  //     status: 'Cancelled',
  //     statusColor: "red",
  //   },
  //   {
  //     orderNo: 111197980222,
  //     price: 1250,
  //     status: 'Delivered',
  //     statusColor: "#4BB543"
  //   },
  //   {
  //     orderNo: 111197980222,
  //     price: 1250,
  //     status: 'Delivered',
  //     statusColor: "#4BB543"
  //   },
  // ];
  return (

    // {"category": "Food", "id": 1, "order_status": "in-queue", "order_total": "0.00"}
    <View style={styles.container}>

      {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', height: height }}>
        <ActivityIndicator size='large' color='gray' />
      </View> : orderList && orderList?.length > 0 ? <ScrollView ><View style={{paddingBottom:110}}>
        {orderList.map((order, ind) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate('Order-Details',{id:order?.id})} key={ind} style={styles.sectionContainer}>
              <View>
                <Text style={[styles.status, { color: '#ec9b01' }]}>{order?.order_status}</Text>
                <Text style={styles.orderNo}>Order ID: {order?.id}</Text>
              </View>

              <View style={{alignItems:'flex-end'}}>
                <Text style={[styles.status, { color: 'gray'}]}>{order?.category}</Text>
                {/* <Text style={[styles.status, { color: 'black'}]}>Activity</Text> */}
                <Text style={styles.price}>{order?.order_total} PKR</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      </ScrollView> : error ? <View style={{ justifyContent: 'center', alignItems: 'center', height: height-150 }}>
                <Text style={{color:'red',fontSize:20}}>{error}</Text>
            </View> : <View style={{ justifyContent: 'center', alignItems: 'center', height: height-150 }}>
               <Text style={{color:'#bfbfbf',fontSize:20}}>No data found!</Text>
            </View> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // paddingVertical: 20,
    paddingHorizontal: 15,
    minHeight:height
  },
  sectionContainer: {
    marginTop: 25,
    padding: 14,
    backgroundColor: '#F5F6FA',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },

  orderNo: {
    fontSize: 19,
    fontWeight: '600',
    color: 'black',
  },
  status: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '400',
  },
  price: {
    fontWeight: '800',
    fontSize: 16,
    color: "black"
  },
});
