import axios from "axios";
import * as actions from "../api";

// Set Axios base URL globally
axios.defaults.baseURL = process.env.REACT_APP_SERVICE_URL;

const api = ({ dispatch }) => next => async action => {
  next(action); // Pass every action to the next middleware

  if (action.type !== actions.apiCallBegan.type) {
    return; // Exit early if it's not an API action
  }

  const { url, method, data, onStart, onSuccess, onError, onState } = action.payload;

  if (onStart) dispatch({ type: onStart });

  try {
    const response = await axios.request({
      url,
      method,
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    if (onState) dispatch({ type: onState, payload: response.data });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    // General
    dispatch(actions.apiCallFailed(errorPayload));
    // Specific
    if (onError) dispatch({ type: onError, payload: errorPayload });
  }
};

export default api;