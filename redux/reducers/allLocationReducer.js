import {
  START_GETTING_ALL_LOCATIONS,
  SAVE_LOCATION_ALL_ADDRESS,
  ERROR_IN_GETTING_ALL_LOCATIONS,
} from "../contants/location_constants";
import { LOGOUT_USER } from "../contants/logout_constants";

const INITIAL_STATE = {
  locationLoading: true,
  allLocation: null,
  error: null,
};

export const userAllLocationReducer = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case START_GETTING_ALL_LOCATIONS:
      return {
        allLocation: null,
        error: null,
        locationLoading: true,
      };
    case SAVE_LOCATION_ALL_ADDRESS:
      return {
        error: null,
        allLocation: payload,
        allLocationLoading: false,
      };
    case ERROR_IN_GETTING_ALL_LOCATIONS:
      return {
        error: payload,
        allLocation: null,
        allLocationLoading: false,
      };
    case LOGOUT_USER:
      return {
        error: null,
        allLocation: null,
        allLocationLoading: true,
      };
    default:
      return state;
  }
};
