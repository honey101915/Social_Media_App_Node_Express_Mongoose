import { combineReducers } from '@reduxjs/toolkit'

import authReducers from './authReducers'

const appReducer = combineReducers({
    authReducers
})

const rootReducer = (state: any, action: any) => {
    // if (action.type == actionTypes.CLEAR_REDUX_STATE) {
    //   state = undefined
    // }
    return appReducer(state, action)
}

export default rootReducer;
