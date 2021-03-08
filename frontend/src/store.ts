import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    Dispatch,
    Store,
} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMineListReducer,
    orderPaymentReducer,
} from './reducers/orderReducers'

import {
    productCategoryListReducer,
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer,
} from './reducers/productReducers'
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userRegisterReducer,
    userSigninReducer,
    userTopSellersListReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from './reducers/userReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPaymentReducer,
    orderMineList: orderMineListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userDetails: userDetailsReducer,
    orderDeliver: orderDeliverReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userTopSellersList: userTopSellersListReducer,
    categoryList: productCategoryListReducer,
})
const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store: Store & {
    dispatch: Dispatch
} = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof reducer>

export default store
