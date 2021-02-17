import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_CREATE_SUCCESS } from '../constants/orderConstants'
import { RootState } from '../store'

export default function PlaceOrderScreen() {
    const history = useHistory()
    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

    if(!cart.shippingAddress.address) {
        history.push('/payment')
    }

    const orderCreate = useSelector((state: RootState) => state.orderCreate)
    const {loading, success, error, order} = orderCreate
    const toPrice = (num: number) => Number(num.toFixed(2))
    cart.itemsPrice = toPrice(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.shippingPrice + cart.taxPrice + cart.itemsPrice

    const placeOrderHandler = () => {
        const order: Order = cart
        order.orderItems = cart.cartItems
        dispatch(createOrder({...cart, order}))
    }

    useEffect(() => {
        if(success && order !== undefined) {
            history.push(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_SUCCESS})
        }
    }, [dispatch, order, history, success])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map(item => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small"/>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>{ loading ? <LoadingBox /> : 'Place Order'}</button>
                            </li>
                            <li>
                                { error && <MessageBox variant="danger">{error}</MessageBox> }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}