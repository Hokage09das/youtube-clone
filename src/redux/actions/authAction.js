import { signInWithPopup, signOut, getAuth } from "firebase/auth";

import { auth, provider } from "../../firebase";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    const response = signInWithPopup(auth, provider);

    const result = (await response)._tokenResponse;

    const profile = {
      name: result.displayName,
      photoUrl: result.photoUrl,
    };

    sessionStorage.setItem("accessToken", JSON.stringify(result.idToken));
    sessionStorage.setItem("user", JSON.stringify(result.displayName));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.idToken,
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const log_out = () => async (dispatch) => {
  const auth = getAuth();

  await signOut(auth).then(() => {
    console.log("success");
  });

  console.log();

  dispatch({
    type: LOG_OUT,
  });

  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
};
