
import axios from 'axios'

import { API_BASE_URL } from '../config/urls';
import Keys from '../config/Keys';
// import { saveUserDataToStore } from '../redux/reduxActions/authActions'

export async function getHeaders() {
    let userData: any = await localStorage.getItem(Keys.USER_DATA)
    console.log(userData, "userDatauserDatauserDatauserDatauserData");

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

export async function apiReq(
    endPoint: string,
    data = null,
    method: any,
    headers: any,
    requestOptions = {}
) {
    return new Promise(async (res, rej) => {
        const getTokenHeader = await getHeaders()

        headers = {
            language: "en",
            ...getTokenHeader,
            ...headers
        }

        console.log('API Endpoint :-> ', endPoint)
        console.log('API Data :-> ', data)
        console.log('API Headers :-> ', headers)

        var axiosPayload: any = {
            method: method,
            url: endPoint,
            headers: headers,
        }
        if (data != null) {
            axiosPayload.data = data
        }
        console.log('API Data ssss:-> ', axiosPayload)

        axios(axiosPayload)
            .then(result => {
                console.log(endPoint.replace(API_BASE_URL, ""), '==> API FULL Result :-> ', result)
                const { data } = result
                if (data.status === false) {
                    return rej(result?.data || data)
                }
                return res(data)
            })
            .catch(error => {
                console.log(endPoint.replace(API_BASE_URL, ""), '==> API FULL error =>', error)

                const errorResponse = error?.response;

                console.log(endPoint.replace(API_BASE_URL, ""), '==> API errorResponse =>', errorResponse)

                if (errorResponse?.data?.statusCode === 401) {
                    // saveUserDataToRedux(null)
                }
                return rej(errorResponse?.data)
            })
    })
}

export function apiPost(endPoint: any, data: any = null, headers = {}) {
    return apiReq(endPoint, data, 'post', headers)
}

export function apiDelete(endPoint: any, data: any = null, headers = {}) {
    return apiReq(endPoint, data, 'delete', headers)
}

export async function apiGet(endPoint: any, data: any = null, headers = {}, requestOptions?: any) {
    return apiReq(endPoint, data, 'get', headers, requestOptions)
}

export function apiPut(endPoint: any, data: any = null, headers = {}) {
    return apiReq(endPoint, data, 'put', headers)
}