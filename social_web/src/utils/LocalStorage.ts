
import axios from 'axios'

import { API_BASE_URL } from '../config/urls';
import Keys from '../config/Keys';
// import { saveUserDataToStore } from '../redux/reduxActions/authActions'

export async function getHeaders() {
    let userData: any = await localStorage.getItem(Keys.USER_DATA)
    // console.log(userData, 'USERDATA');
    if (userData) {
        userData = JSON.parse(userData)
        if (userData?.accessToken !== undefined) {
            return {
                authorization: `${'Bearer ' + userData.accessToken}`
            }
        }
    }
    return {}
}

export function setUserData(data: any) {
    data = JSON.stringify(data)
    return localStorage.setItem(Keys.USER_DATA, data)
}

export function setItem(key: any, data: any) {
    data = JSON.stringify(data)
    return localStorage.setItem(key, data)
}

export function getItem(key: any) {
    return new Promise((resolve, reject) => {
        const data = localStorage.getItem(key);
        if (data !== null) {
            resolve(JSON.parse(data));
        } else {
            reject(null);
        }
    });
}

export function removeItem(key: any) {
    return localStorage.removeItem(key)
}

export function clearAsyncStorate(key: any) {
    return localStorage.clear()
}

export async function getUserData() {
    return new Promise(async (resolve, reject) => {
        const data = await localStorage.getItem(Keys.USER_DATA);
        if (data !== null) {
            resolve(JSON.parse(data));
        } else {
            reject(null);
        }
    });
}

export async function clearUserData() {
    return localStorage.removeItem(Keys.USER_DATA)
}