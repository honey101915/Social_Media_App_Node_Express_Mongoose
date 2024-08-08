export const API_BASE_URL = 'http://localhost:8080'

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const LOGIN_API = getApiUrl('/api/auth/login');
export const SIGNUP_API = getApiUrl('/api/auth/register-user');