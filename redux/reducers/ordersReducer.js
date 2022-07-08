import {LOGOUT_USER} from '../contants/logout_constants';
import { EMPTY_ORDER_BY_ID_REDUCER, ERROR_IN_GETTING_ORDERS, SAVE_ORDERS, START_GETTING_ORDERS } from '../contants/order_constants';

const INITIAL_STATE = {
  isLoading: true,
  orderList: [],
  error:null
};

export const orderListReducer = (state = INITIAL_STATE, {type,payload}) => {
  switch (type) {
    case START_GETTING_ORDERS:
      return {
        orderList: [],
        error:null,
        isLoading: true,
      };
    case SAVE_ORDERS:
      return {
        error:null,
        orderList: payload,
        isLoading: false,
      };
    case ERROR_IN_GETTING_ORDERS:
      return {
        error:payload,
        orderList: [],
        isLoading: false,
      };
    case EMPTY_ORDER_BY_ID_REDUCER:
      return {
        error:null,
        orderList: [],
        isLoading: true,
      };
    case LOGOUT_USER:
      return {
        error:null,
        orderList: [],
        isLoading: true,
      };
    default:
      return state;
  }
};
