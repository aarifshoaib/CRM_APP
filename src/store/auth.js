import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { apiCallBegan } from "./api";


const slice = createSlice({
    name: "auth",
    initialState: {
        list: {},
        ipInfo: {},
        flist: [],
        loading: false
    }, reducers: {
        authRequested: (auth, action) => {
            auth.loading = true
        },
        authReceived: (auth, action) => {
            auth.list = action.payload;
            auth.loading = true;
        },
        authFailed: (auth, action) => {
            auth.loading = false
        },
        clearAuth: (auth, action) => {
            auth.list = [];
        },
        guestAuth: (auth, action) => {
            auth.list = action.payload;
        },
        setIpInfo: (auth, action) => {
            auth.ipInfo = action.payload;
        },
        forgotpassr: (auth, action) => {
            auth.loading = false;
            auth.flist = action.payload;
        },
        clearflist: (auth, action) => {
            auth.flist = [];
        }
    }
});

export const { authRequested, authReceived, authFailed, clearAuth, guestAuth, forgotpassr, setIpInfo, clearflist } = slice.actions;
export default slice.reducer;

const url = "auth/";

console.log(url);

export const checkAuth = async (auth) =>
    apiCallBegan({
        url,
        method: 'post',
        data: auth,
        onSuccess: authReceived.type
    })
