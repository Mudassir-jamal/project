import { combineReducers } from "redux";
import { userAllLocationReducer } from "./allLocationReducer.js";
// import { userDeviceIdReducer } from './deviceIdReducer.js';
import { userLocationReducer } from "./locationReducer.js";
import { orderByIdReducer } from "./orderByIdReducer.js";
import { orderListReducer } from "./ordersReducer.js";
import { userDashboardReducer } from "./userDashboardReducer.js";
import { userStateReducer } from "./userStateReducer.js";
import { userTokensReducer } from "./userTokensReducers.js";

export const reducers = combineReducers({
  userStateReducer,
  userTokensReducer,
  orderListReducer,
  orderByIdReducer,
  userLocationReducer,
  userAllLocationReducer,
  userDashboardReducer,
  // userDeviceIdReducer
});
