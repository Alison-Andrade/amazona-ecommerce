import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { detailsUser, updateUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstant'
import { RootState } from '../store'

export default function UserEditScreen() {
    const history = useHistory()
    const props = useParams<Props>()
    const userId = props.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()
    const userDetails = useSelector((state: RootState) => state.userDetails)
    const { userInfo, loading, error } = userDetails
    const userUpdate = useSelector((state: RootState) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/userlist')
        }
        if (!userInfo) {
            dispatch(detailsUser(userId))
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
            setIsSeller(userInfo.isSeller ? userInfo.isSeller : false)
            setIsAdmin(userInfo.isAdmin ? userInfo.isAdmin : false)
        }
    }, [dispatch, userInfo, userId, successUpdate, history])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(
            updateUser({
                _id: userId,
                name,
                email,
                isSeller,
                isAdmin,
                seller: {
                    name: '',
                    logo: '',
                    description: '',
                },
            })
        )
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Edit User: {userInfo?.name}</h1>
                </div>
                {loadingUpdate && <LoadingBox />}
                {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {successUpdate && (
                    <MessageBox variant="success">{successUpdate}</MessageBox>
                )}
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="isSeller">Is Seller</label>
                            <input
                                type="checkbox"
                                id="isSeller"
                                checked={isSeller}
                                onChange={(e) => setIsSeller(e.target.checked)}
                            />
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Is Admin</label>
                            <input
                                type="checkbox"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </div>
                        <div>
                            <button type="submit" className="primary">
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
