import { applyMiddleware, combineReducers, compose, createStore, Dispatch, Store } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPaymentReducer } from './reducers/orderReducers';

import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers'
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPaymentReducer,
    orderMineList: orderMineListReducer,
    orderList: orderListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
})
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store & {
    dispatch: Dispatch
} = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof reducer>

export default store