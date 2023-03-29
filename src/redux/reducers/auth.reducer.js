import {
  LOG_OUT,
  LOGIN_FAIL,
  LOAD_PROFILE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
} from "../actionType";

const initialState = {
  accessToken: JSON.parse(sessionStorage.getItem("accessToken")),
  user: JSON.parse(sessionStorage.getItem("user")),
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        accessToken: payload,
        loading: false,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        accessToken: null,
        loading: false,
        error: payload,
      };
    }

    case LOAD_PROFILE: {
      return {
        ...state,
        user: payload,
      };
    }

    case LOG_OUT: {
      return {
        ...state,
        accessToken: null,
        user: null,
      };
    }
    default:
      return state;
  }
};
