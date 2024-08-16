import { ALL_INTERESTS, LOGIN_API, SIGNUP_API } from "../../config/urls"
import { apiGet, apiPost } from "../../utils/apiService"
import { saveUserData } from "../reduxReducers/authReducers";
import store from "../reduxStore";

const { dispatch } = store;

export const saveUserDataToRedux = (_data: any) => {
    saveUserData(_data)
    dispatch(saveUserData(_data))
}

export const loginApi = (payload: any) => {
    return new Promise((resolve, reject) => {
        apiPost(LOGIN_API, payload).then((res: any) => {
            saveUserDataToRedux(res?.data)
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const signupApi = (payload: any) => {
    return new Promise((resolve, reject) => {
        apiPost(SIGNUP_API, payload).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getAllInterestsApi = () => {
    return new Promise((resolve, reject) => {
        apiGet(ALL_INTERESTS).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}