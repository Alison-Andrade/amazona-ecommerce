import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
import api from '../services/api'
import { RootState } from '../store'

export const addToCart = (
    productId: string,
    qty: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
    getState
) => {
    api.get(`/api/products/${productId}`).then((response) => {
        const { data } = response
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                product: data._id,
                seller: data.seller,
                qty,
            },
        })

        localStorage.setItem(
            'cartItems',
            JSON.stringify(getState().cart.cartItems)
        )
    })
}

export const removeFromCart = (
    productId: string
): ThunkAction<void, RootState, unknown, Action<string>> => (
    dispatch,
    getState
) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (
    data: AdressInterface
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (
    paymentMethod: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod })
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}
