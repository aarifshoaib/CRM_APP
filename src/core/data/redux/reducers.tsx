import { combineReducers } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authSlice from '../../../store/auth';

export default combineReducers({
    common: commonSlice,
    auth: authSlice
});