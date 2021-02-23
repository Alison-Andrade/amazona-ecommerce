import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../store'

export default function SellerRoute({ component: Component, ...rest }: any) {
    const userSignin = useSelector((state: RootState) => state.userSignin)
    const { userInfo } = userSignin

    return (
        <Route
            {...rest}
            render={(props) =>
                userInfo && userInfo.isSeller ? (
                    <Component {...props}></Component>
                ) : (
                        <Redirect to="/signin" />
                    )
            }
        >
        </Route>
    )
}