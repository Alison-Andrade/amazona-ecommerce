import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { RootState } from '../store'

export default function SigninScreen() {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector((state: RootState) => state.userSignin)
    const { userInfo, loading, error } = userSignin
    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter Email" required
                        onChange={ e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" required
                        onChange={ e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">{loading ? <LoadingBox /> : "Sign in"}</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? {' '} 
                        <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}