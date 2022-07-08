// import { ERROR_IN_GETTING_DEVICE_ID, SAVE_DEVICE_ID, START_GETTING_DEVICE_ID } from "../contants/device_id_constant";
// import { LOGOUT_USER } from "../contants/logout_constants";


// const INITIAL_STATE = {
//   DeviceIdLoading: true,
//   DeviceId: null,
//   error:null
// };

// export const userDeviceIdReducer = (state = INITIAL_STATE, {type,payload}) => {
//   switch (type) {
//     case START_GETTING_DEVICE_ID:
//       return {
//         DeviceId: null,
//         error:null,
//         DeviceIdLoading: true,
//       };



//     case SAVE_DEVICE_ID:
//       return {
//         error:null,
//         DeviceId: payload,
//         DeviceIdLoading: false,
//       };


//     case ERROR_IN_GETTING_DEVICE_ID:
//       return {
//         error:payload,
//         DeviceId: null,
//         DeviceIdLoading: false,
//       };



  
//     // case LOGOUT_USER:
//     //   return {
//     //     error:null,
//     //     location: null,
//     //     DeviceIdLoading: true,
//     //   };
//     default:
//       return state;
//   }
// };
