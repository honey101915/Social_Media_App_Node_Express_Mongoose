export const API_BASE_URL = 'http://localhost:8080'

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const LOGIN_API = getApiUrl('/api/auth/login');
export const SIGNUP_API = getApiUrl('/api/auth/register-user');
export const GET_ALL_USERS = getApiUrl("/api/get-all-users")
export const ALL_INTERESTS = getApiUrl("/api/get-all-interests")
export const GET_USER_DETAIL = getApiUrl("/api/get-user-detail")
export const ADD_NEW_POST = getApiUrl("/api/add-new-post")
export const LOG_OUT = getApiUrl("/api/logout")
export const GET_ALL_POSTS = getApiUrl("/api/get-all-posts")
