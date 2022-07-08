import {LOGOUT_USER} from '../contants/logout_constants';
import { ERROR_IN_GETTING_USER_DASHBOARD_DATA, SAVE_USER_DASHBOARD_DATA, START_GETTING_USER_DASHBOARD_DATA } from '../contants/user_dashboard_constants';

const INITIAL_STATE = {
  isLoading: true,
  userDashboard: [],
  error:null
};

export const userDashboardReducer = (state = INITIAL_STATE, {type,payload}) => {
  switch (type) {
    case START_GETTING_USER_DASHBOARD_DATA:
      return {
        userDashboard: [],
        error:null,
        isLoading: true,
      };
    case SAVE_USER_DASHBOARD_DATA:
      return {
        error:null,
        userDashboard: payload,
        isLoading: false,
      };
    case ERROR_IN_GETTING_USER_DASHBOARD_DATA:
      return {
        error:payload,
        userDashboard: [],
        isLoading: false,
      };
    case LOGOUT_USER:
      return {
        error:null,
        userDashboard: [],
        isLoading: true,
      };
    default:
      return state;
  }
};
