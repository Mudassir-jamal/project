import { ERROR_IN_GETTING_LOCATION, SAVE_LOCATION_AND_ADDRESS,SAVE_LOCATION_ADDRESS,SAVE_LOCATION_COORDINATES, START_GETTING_LOCATION } from '../contants/location_constants';
import {LOGOUT_USER} from '../contants/logout_constants';

const INITIAL_STATE = {
  locationLoading: true,
  location: null,
  error:null
};

export const userLocationReducer = (state = INITIAL_STATE, {type,payload}) => {
  switch (type) {
    case START_GETTING_LOCATION:
      return {
        location: null,
        error:null,
        locationLoading: true,
      };
    case SAVE_LOCATION_AND_ADDRESS:
      return {
        error:null,
        location: payload,
        locationLoading: false,
      };
    case SAVE_LOCATION_ADDRESS:
      return {
        error:null,
        location: state.location ?  {...state.location,address:payload} : {address:payload,location_coordinates:''},
        locationLoading: false,
      };
    case SAVE_LOCATION_COORDINATES:
      return {
        error:null,
        location: state.location ?  {...state.location,location_coordinates:payload} : {location_coordinates:payload,address:''},
        locationLoading: false,
      };
    case ERROR_IN_GETTING_LOCATION:
      return {
        error:payload,
        location: null,
        locationLoading: false,
      };
    case LOGOUT_USER:
      return {
        error:null,
        location: null,
        locationLoading: true,
      };
    default:
      return state;
  }
};
