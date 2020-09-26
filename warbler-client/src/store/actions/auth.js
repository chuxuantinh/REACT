import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
  // set CurrentUser is an action Creator
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({})); //the process of logout is to simply call setCurrentUser with an empty object
  };
}

export function authUser(type, userData) {
  // type will be sign up or sign in
  return dispatch => {
    // we will use redux thunk for this dispatch
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve(); //indicate that the API call succeded
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject(); //indicate that the API call failed
        });
    });
  };
}
