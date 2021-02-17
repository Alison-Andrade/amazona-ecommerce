import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstant";
import api from "../services/api";
import { RootState } from "../store";

export const signin = (email: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}})
    api.post('/api/users/signin', {email, password}).then((response) =>{
        const { data } = response
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    }).catch((error) => {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}

export const signout = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    dispatch({type: USER_SIGNOUT})
    document.location.href = '/'
}

export const register = (name: string, email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {email, password}})
    api.post('/api/users/register', {name, email, password}).then((response) =>{
        const { data } = response
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    }).catch((error) => {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}

export const detailsUser = (userId: string) : ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST, payload: userId})
    const { userSignin: { userInfo } } = getState()
    api.get(`/api/users/${userId}`, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then((response => {
        const { data } = response
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    })).catch((error) => {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}

export const updateUserProfile = (user: UserInterface) : ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch, getState) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user})
    const { userSignin: { userInfo } } = getState()
    api.put(`/api/users/profile`, user, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then((response => {
        const { data } = response
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    })).catch((error) => {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}