import { Reducer } from 'redux'
import {
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_RESET,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants'

const initialState: ProductListState = {
    loading: true,
    products: [],
}

export const productListReducer: Reducer<ProductListState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

const detailInitialState: ProductState = {
    loading: true,
}

export const productDetailsReducer: Reducer<ProductState> = (
    state = detailInitialState,
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productCreateReducer: Reducer<ProductState> = (
    state = {},
    action
) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer: Reducer<ProductState> = (
    state = {},
    action
) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const productDeleteReducer: Reducer<ProductState> = (
    state = {},
    action
) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const productCategoryListReducer: Reducer<ProductListState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload }
        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
