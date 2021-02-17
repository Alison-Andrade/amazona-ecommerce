import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { listOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { RootState } from '../store'

export default function OrderListScreen() {
    const history = useHistory()
    const dispatch = useDispatch()
    const orderList = useSelector((state: RootState) => state.orderList)
    const { loading, error, orders } = orderList

    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])

    const deleteHandler = (orderId?: string) => {
        // TODO: Delete order
    }

    return (
        <div>
            <h1>Order History</h1>
            {
                loading ? <LoadingBox /> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        (
                            <table className="table">
                                <thead>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </thead>
                                <tbody>
                                    {
                                        orders?.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.user.name}</td>
                                                <td>{order.createdAt?.substring(0, 10)}</td>
                                                <td>{order.totalPrice?.toFixed(2)}</td>
                                                <td>{order.isPaid ? order.paidAt?.substring(0, 10) : 'NO'}</td>
                                                <td>{order.isDelivered ? order.deliveredAt?.substring(0, 10) : 'NO'}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="small"
                                                        onClick={() => { history.push(`/order/${order._id}`) }}
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
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
            }
        </div>
    )
}
