import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'authReducer',
    initialState: {
        userData: {},
    },
    reducers: {
        saveUserData: (state, action) => {
            console.log('saveUserData action =>', action?.payload);
            state.userData = action.payload;
        }
    },
});
export const { saveUserData } = authSlice.actions;
export default authSlice.reducer;
