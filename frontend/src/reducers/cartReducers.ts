import { Reducer } from 'redux'
import {
    CART_ADD_ITEM,
    CART_ADD_ITEM_FAIL,
    CART_EMPTY,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

const initialState: CartState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(String(localStorage?.getItem('cartItems')))
        : [],
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(String(localStorage?.getItem('shippingAddress')))
        : {},
    paymentMethod: 'PayPal',
}

export const cartReducer: Reducer<CartState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const exitItem = state.cartItems.find(
                (x) => x.product === item?.product
            )
            if (exitItem) {
                return {
                    ...state,
                    error: '',
                    cartItems: state.cartItems.map((x) =>
                        x.product === exitItem.product ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    error: '',
                    cartItems: [...state.cartItems, item],
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                error: '',
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case CART_ADD_ITEM_FAIL:
            return { ...state, error: action.payload }
        case CART_EMPTY:
            return {
                ...state,
                error: '',
                cartItems: [],
            }
        default:
            return state
    }
}
