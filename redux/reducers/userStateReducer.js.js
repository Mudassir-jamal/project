import {LOGOUT_USER} from '../contants/logout_constants';
import {USER_ACTIVE_STATE} from '../contants/user_state_constants';

const INITIAL_STATE = {
  isLoading: true,
  userState: false,
};

export const userStateReducer = (state = INITIAL_STATE, {type}) => {
  switch (type) {
    case USER_ACTIVE_STATE:
      return {
        ...state,
        userState: true,
        isLoading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userState: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
