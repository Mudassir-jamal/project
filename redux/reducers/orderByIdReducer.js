import { LOGOUT_USER } from "../contants/logout_constants";
import {
  ERROR_IN_GETTING_ORDER_BY_ID,
  SAVE_ORDER_BY_ID,
  START_GETTING_ORDER_BY_ID,
  SAVE_ORDER_IMAGE_URL,
  SAVE_ORDER_VOICE_NOTE_URL,
} from "../contants/order_constants";

const INITIAL_STATE = {
  isLoading: true,
  isImageLoad: true,
  isVoiceLoad: true,
  orderById: [],
  orderVoiceNote: null,
  orderImageUrl: null,
  error: null,
};

export const orderByIdReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case START_GETTING_ORDER_BY_ID:
      return {
        isLoading: true,
        isImageLoad: true,
        isVoiceLoad: true,
        orderById: [],
        orderVoiceNote: null,
        orderImageUrl: null,
        error: null,
      };
    case SAVE_ORDER_BY_ID:
      return {
        error: null,
        orderById: payload,
        isLoading: false,
      };
    case SAVE_ORDER_IMAGE_URL:
      return { ...state, orderImageUrl: payload, isImageLoad: false };
    case SAVE_ORDER_VOICE_NOTE_URL:
      return { ...state, orderVoiceNote: payload, isVoiceLoad: false };
    case ERROR_IN_GETTING_ORDER_BY_ID:
      return {
        error: payload,
        orderById: [],
        isLoading: false,
        isImageLoad : false,
        isVoiceLoad :false
      };
    case LOGOUT_USER:
      return {
        isLoading: true,
        isImageLoad: true,
        isVoiceLoad: true,
        orderById: [],
        orderVoiceNote: null,
        orderImageUrl: null,
        error: null,
      };
    default:
      return state;
  }
};
