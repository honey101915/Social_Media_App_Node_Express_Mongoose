import { ADD_NEW_POST, GET_ALL_POSTS, GET_ALL_SCHOOLS, GET_ALL_USERS, GET_USER_DETAIL } from "../../config/urls"
import { apiGet, apiPost } from "../../utils/apiService"

export const getAllUsersApi = () => {
    return new Promise((resolve, reject) => {
        apiGet(GET_ALL_USERS).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getUserDetailApi = (_payload: any) => {
    return new Promise((resolve, reject) => {
        apiGet(GET_USER_DETAIL + _payload).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const addNewPostApi = (_payload: any) => {
    return new Promise((resolve, reject) => {
        apiPost(ADD_NEW_POST, _payload).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getAllPostApi = (_payload: any) => {
    return new Promise((resolve, reject) => {
        apiGet(GET_ALL_POSTS + _payload).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getAllSchoolsApi = (_query: any) => {
    return new Promise((resolve, reject) => {
        apiGet(GET_ALL_SCHOOLS + _query).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}