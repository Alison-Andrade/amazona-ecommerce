import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteUser, listUsers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAILS_RESET } from '../constants/userConstant'
import { RootState } from '../store'

export default function UserListScreen() {
    const history = useHistory()
    const userList = useSelector((state: RootState) => state.userList)
    const { error, loading, users } = userList
    const dispatch = useDispatch()
    const userDelete = useSelector((state: RootState) => state.userDelete)
    const { error: errorDelete, loading: loadingDelete, success: successDelete } = userDelete

    useEffect(() => {
        dispatch(listUsers())
        dispatch({ type: USER_DETAILS_RESET })
    }, [dispatch, successDelete])

    const deleteHandler = (userId: string) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(userId))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
            {
                loading ? <LoadingBox /> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>IS SELLER</th>
                                        <th>IS ADMIN</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isSeller ? 'YES' : 'NO'}</td>
                                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                                <td>
                                                    <button type="button" className="small" onClick={() => { history.push(`/user/${user._id}/edit`) }}>Edit</button>
                                                    <button type="button" className="small" onClick={() => deleteHandler(user._id)}>Delete</button>
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
