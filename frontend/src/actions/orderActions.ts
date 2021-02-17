import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants";
import api from "../services/api";
import { RootState } from "../store";

export const listOrders = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()
    api.get('/api/orders', {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then((response) => {
        const { data } = response
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    }).catch((error) => {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}

export const createOrder = (order: OrderState): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    const { userSignin: { userInfo } } = getState()
    api.post('/api/orders', order, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then((response) => {
        const { data } = response
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order, })
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartItems')
    }).catch((error) => {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}

export const detailsOrder = (orderId: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    const { userSignin: { userInfo } } = getState()
    api.get(`/api/orders/${orderId}`, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then(response => {
        const { data } = response
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    }).catch(error => {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}

export const payOrder = (order: Order, paymentResult: PaymentResult): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });

    const { userSignin: { userInfo } } = getState()

    api.put(`/api/orders/${order?._id}/pay`, paymentResult, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then(response => {
        const { data } = response
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    }).catch(error => {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })

}

export const listOrderMine = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()
    api.get(`/api/orders/mine`, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then(response => {
        const { data } = response
        dispatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload: data
        })
    }).catch(error => {
        dispatch({
            type: ORDER_MINE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}

export const deleteOrder = (orderId: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId })
    const { userSignin: { userInfo } } = getState()
    api.delete(`/api/orders/${orderId}`, {
        headers: {
            Autorization: `Bearer ${userInfo?.token}`
        }
    }).then(response => {
        const { data } = response
        dispatch({
            type: ORDER_DELETE_SUCCESS,
            payload: data
        })
    }).catch(error => {
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    })
}