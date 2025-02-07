export const API_BASE_URL = 'http://localhost:8080'

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const LOGIN_API = getApiUrl('/api/auth/login');
export const SIGNUP_API = getApiUrl('/api/auth/register-user');
export const GET_ALL_USERS = getApiUrl("/api/get-all-users")
export const ALL_INTERESTS = getApiUrl("/api/get-all-interests")
export const ALL_LANGUAGES = getApiUrl("/api/get-all-languages")
export const GET_USER_DETAIL = getApiUrl("/api/get-user-detail")
export const ADD_NEW_POST = getApiUrl("/api/add-new-post")
export const LOG_OUT = getApiUrl("/api/logout")
export const GET_ALL_POSTS = getApiUrl("/api/get-all-posts")
export const GET_ALL_SCHOOLS = getApiUrl("/api/get-all-schools")
export const GET_ALL_COLLEGES = getApiUrl("/api/get-all-colleges")
export const UPDATE_PROFILE = getApiUrl("/api/update-profile")
export const SEND_OTP = getApiUrl("/api/generate-otp")
export const VERIFY_OTP = getApiUrl("/api/verify-otp")
