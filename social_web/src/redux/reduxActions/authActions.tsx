import { LOGIN_API, SIGNUP_API } from "../../config/urls"
import { apiPost } from "../../utils/apiService"
import { saveUserData } from "../reduxReducers/authReducers";
import store from "../reduxStore";

const { dispatch } = store;

export const loginApi = (payload: any) => {
    return new Promise((resolve, reject) => {
        apiPost(LOGIN_API, payload).then((res: any) => {
            dispatch(saveUserData(res?.data))
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