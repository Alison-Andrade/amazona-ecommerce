import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { deleteOrder, listOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'
import { RootState } from '../store'

export default function OrderListScreen() {
    const location = useLocation()
    const sellerMode = location.pathname.indexOf('/seller') >= 0
    const history = useHistory()
    const dispatch = useDispatch()
    const orderList = useSelector((state: RootState) => state.orderList)
    const { loading, error, orders } = orderList
    const orderDelete = useSelector((state: RootState) => state.orderDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete
    const userSignin = useSelector((state: RootState) => state.userSignin)
    const { userInfo } = userSignin

    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET })
        dispatch(listOrders({ seller: sellerMode ? userInfo?._id : '' }))
    }, [dispatch, successDelete])

    const deleteHandler = (orderId?: string) => {
        if (orderId) {
            if (window.confirm('Are you sure you want to delete?')) {
                dispatch(deleteOrder(orderId))
            }
        }
    }

    return (
        <div>
            <h1>Order History</h1>
            {loadingDelete && <LoadingBox />}
            {errorDelete && (
                <MessageBox variant="danger">{errorDelete}</MessageBox>
            )}
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt?.substring(0, 10)}</td>
                                <td>{order.totalPrice?.toFixed(2)}</td>
                                <td>
                                    {order.isPaid
                                        ? order.paidAt?.substring(0, 10)
                                        : 'NO'}
                                </td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredAt?.substring(0, 10)
                                        : 'NO'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => {
                                            history.push(`/order/${order._id}`)
                                        }}
                                    >
                                        Details
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(order._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
