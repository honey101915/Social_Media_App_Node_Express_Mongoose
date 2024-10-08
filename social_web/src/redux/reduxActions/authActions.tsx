import { ALL_INTERESTS, ALL_LANGUAGES, LOG_OUT, LOGIN_API, SEND_OTP, SIGNUP_API, VERIFY_OTP } from "../../config/urls"
import { apiGet, apiPost } from "../../utils/apiService"
import { setUserData } from "../../utils/LocalStorage";
import { saveUserData } from "../reduxReducers/authReducers";
import store from "../reduxStore";

const { dispatch } = store;

export const saveUserDataToRedux = (_data: any) => {
    setUserData(_data)
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

export const getAllLanguagesApi = () => {
    return new Promise((resolve, reject) => {
        apiGet(ALL_LANGUAGES).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const _hitLogoutApi = () => {
    return new Promise((resolve, reject) => {
        apiGet(LOG_OUT).then((res) => {
            resolve(res)
            saveUserDataToRedux(null)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const sendOtpApi = (payload: any) => {
    return new Promise((resolve, reject) => {
        apiPost(SEND_OTP, payload).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const verifyOtpApi = (payload: any) => {
    return new Promise((resolve, reject) => {
        apiPost(VERIFY_OTP, payload).then((res: any) => {
            console.log('====================================');
            console.log(res?.data, "verifyOtpApiverifyOtpApiverifyOtpApiverifyOtpApi");
            console.log('====================================');
            saveUserDataToRedux(res?.data)
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}