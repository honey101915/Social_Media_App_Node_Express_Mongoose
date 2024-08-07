import { LOGIN_API } from "../../config/urls"
import { apiPost } from "../../utils/apiService"

export const loginApi = (payload: any) => {
    return new Promise((resolve, reject) => {
        apiPost(LOGIN_API, payload).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}