import {LOGOUT_USER} from '../contants/logout_constants';
import { UPDATE_USER_AUTH_TOKENS } from '../contants/user_tokens_constants';

const INITIAL_STATE = {
  isLoading: false,
  userTokens: null,
};

export const userTokensReducer = (state = INITIAL_STATE, {type,payload}) => {
  switch (type) {
    case UPDATE_USER_AUTH_TOKENS:
      return {
        ...state,
        userTokens: payload,
        isLoading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userTokens: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
