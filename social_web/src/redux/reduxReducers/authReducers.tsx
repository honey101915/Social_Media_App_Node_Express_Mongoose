import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'authReducer',
    initialState: {
        userData: {},
        allInterests: [],
        allLanguages: []
    },
    reducers: {
        saveUserData: (state, action) => {
            state.userData = action.payload;
        },
        saveInterests: (state, action) => {
            state.allInterests = action.payload;
        },
        saveLanguages: (state, action) => {
            state.allLanguages = action.payload;
        },
    },
});
export const {
    saveUserData,
    saveInterests,
    saveLanguages
} = authSlice.actions;
export default authSlice.reducer;
