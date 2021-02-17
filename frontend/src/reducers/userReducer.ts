import { Reducer } from "redux";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNOUT, 
    USER_UPDATE_PROFILE_FAIL, 
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET} from "../constants/userConstant";

const initialState = {
    userInfo: localStorage.getItem('userInfo') && JSON.parse(String(localStorage.getItem('userInfo'))),
}

export const userSigninReducer: Reducer<UserState> = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true}
        case USER_SIGNIN_SUCCESS:
            return {
                loading: false, 
                userInfo: action.payload
            }
        case USER_SIGNIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_SIGNOUT: 
            return {}
        default:
            return state
    }
}

export const userRegisterReducer: Reducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {
                loading: false, 
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userDetailsReducer: Reducer<UserState> = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true}
        case USER_DETAILS_SUCCESS:
            return {
                loading: false, 
                userInfo: action.payload
            }
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userUpdateProfileReducer: Reducer<UserState> = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false, 
                success: true
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}