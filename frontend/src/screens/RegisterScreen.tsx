import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { RootState } from '../store'

export default function RegisterScreen() {
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const userRegister = useSelector((state: RootState) => state.userRegister)
    const { userInfo, loading, error } = userRegister
    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        password !== confirmPassword 
            ? alert('Password and confirm password are not match') 
            : dispatch(register(name, email, password))
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
                    <h1>Create Account</h1>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" required
                        onChange={ e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" required
                        onChange={ e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required
                        onChange={ e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Confirm password</label>
                    <input type="password" id="password" placeholder="Re-enter password" required
                        onChange={ e => setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">{loading ? <LoadingBox /> : "Register"}</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have a account? {' '} 
                        <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}