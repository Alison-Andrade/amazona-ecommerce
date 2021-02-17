import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"
import api from "../services/api"
import { RootState } from "../store"

export const listProducts = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    api.get('/api/products').then((response) => {
        const { data } = response
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }).catch((err) => {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message })
    })
}

export const detailsProduct = (productID: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productID })
    api.get(`/api/products/${productID}`).then((response) => {
        const { data } = response
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    }).catch((err) => {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    })
}

export const createProduct = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    api.post('/api/products', {}, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then(response => {
        const { data } = response
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.product
        })
    }).catch(err => {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    })
}

export const updateProduct = (product: ProductInterface): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product })
    const { userSignin: { userInfo } } = getState()
    api.put(`/api/products/${product._id}`, product, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then(response => {
        const { data } = response
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    }).catch(err => {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    })
}

export const deleteProduct = (productId: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId })
    const { userSignin: { userInfo } } = getState()
    api.delete(`/api/products/${productId}`, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then(response => {
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    }).catch(err => {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    })
}