import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { listOrderMine } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { RootState } from '../store'

export default function OrerHistoryScreen() {
    const history = useHistory()
    const orderMineList = useSelector((state: RootState) => state.orderMineList)
    const {loading, error, orders} = orderMineList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listOrderMine())
    }, [dispatch])

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
                                        <td>{order.createdAt?.substring(0, 10)}</td>
                                        <td>{order.totalPrice?.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt?.substring(0, 10) : 'NO'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt?.substring(0, 10) : 'NO'}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="small"
                                                onClick={() => {history.push(`/order/${order._id}`)}}
                                            >
                                                Details
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