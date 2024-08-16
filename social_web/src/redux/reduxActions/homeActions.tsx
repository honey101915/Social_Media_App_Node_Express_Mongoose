import { GET_ALL_USERS } from "../../config/urls"
import { apiGet } from "../../utils/apiService"

export const getAllUsersApi = () => {
    return new Promise((resolve, reject) => {
        apiGet(GET_ALL_USERS).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}