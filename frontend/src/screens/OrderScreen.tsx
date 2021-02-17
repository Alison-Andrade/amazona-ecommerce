import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'

import { detailsOrder, payOrder } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import api from '../services/api'
import { RootState } from '../store'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

export default function OrderScreen() {
    const props = useParams<Props>()
    const orderId = props.id
    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector((state: RootState) => state.orderDetails)
    const { loading, error, order } = orderDetails
    const dispatch = useDispatch()
    const orderPay = useSelector((state: RootState) => state.orderPay)
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay

    useEffect(() => {
        const addPayPalScript = async () => {
            api.get('/api/config/paypal').then((response) => {
                const { data } = response
                const script = document.createElement('script')
                script.type = "text/javascript"
                script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            })
        }

        if (!order?._id || successPay || (order && order._id !== orderId)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript()
                } else {
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay])

    const successPaymentHandler = (paymentResult: PaymentResult) => {
        order && dispatch(payOrder(order, paymentResult))
    }

    return loading ? (<div><LoadingBox /></div>) : error ? (<div><MessageBox variant="danger">{error}</MessageBox></div>) : (
        <div>
            <h1>Order {order?._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order?.shippingAddress?.fullName} <br />
                                    <strong>Address:</strong> {order?.shippingAddress?.address}, {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}
                                </p>
                                {
                                    order?.isDelivered 
                                        ? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox> 
                                        : <MessageBox variant="danger">Not Delivered</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order?.paymentMethod} <br />
                                </p>
                                {
                                    order?.isPaid 
                                        ? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox> 
                                        : <MessageBox variant="danger">Not Paid</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        order?.orderItems?.map(item => (
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
                                    <div>${order?.itemsPrice?.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order?.shippingPrice?.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order?.taxPrice?.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order?.totalPrice?.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !order?.isPaid && (
                                    <li>
                                        {
                                            !sdkReady
                                                ? (<LoadingBox />) 
                                                : <>
                                                    {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                    {loadingPay && <LoadingBox />}
                                                    <PayPalButton 
                                                        amount={order?.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    ></PayPalButton>
                                                </>
                                        }
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}