import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions'
import CartScreen from './screens/CartScreen'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import { RootState } from './store'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import ProfileScreen from './screens/profileScreen'
import PrivateRoute from './screens/PrivateRoute'
import AdminRoute from './screens/AdminRoute'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import SellerRoute from './screens/SellerRoute'
import SellerScreen from './screens/SellerScreen'
import SearchBox from './components/SearchBox'
import SearchScreen from './screens/SearchScreen'

function App() {
    const dispatch = useDispatch()
    const cart = useSelector((state: RootState) => state.cart)
    const { cartItems } = cart
    const userSignin = useSelector((state: RootState) => state.userSignin)
    const { userInfo } = userSignin

    const signoutHandler = () => {
        dispatch(signout())
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">
                            amazona
                        </Link>
                    </div>
                    <div>
                        <Route
                            render={({ history }) => (
                                <SearchBox history={history}></SearchBox>
                            )}
                        />
                    </div>
                    <div>
                        <Link to="/cart">
                            Cart
                            {cartItems.length > 0 && (
                                <span className="badge">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {userInfo.name}{' '}
                                    <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">
                                            Order History
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#signout"
                                            onClick={signoutHandler}
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )}
                        {userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                                <Link to="#seller">
                                    Seller <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist/seller">
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist/seller">
                                            Orders
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>
                <main>
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/seller/:id" component={SellerScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route
                        path="/orderhistory"
                        component={OrderHistoryScreen}
                    />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/payment" component={PaymentMethodScreen} />
                    <Route path="/shipping" component={ShippingAddressScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route
                        path="/product/:id"
                        component={ProductScreen}
                        exact
                    />
                    <Route
                        path="/product/:id/edit"
                        component={ProductEditScreen}
                    />
                    <Route
                        path="/search/name/:name?"
                        component={SearchScreen}
                    />
                    <PrivateRoute path="/profile" component={ProfileScreen} />
                    <SellerRoute
                        path="/productlist/seller"
                        component={ProductListScreen}
                    />
                    <SellerRoute
                        path="/orderlist/seller"
                        component={OrderListScreen}
                    />
                    <AdminRoute
                        path="/productlist"
                        component={ProductListScreen}
                        exact
                    />
                    <AdminRoute
                        path="/orderlist"
                        component={OrderListScreen}
                        exact
                    />
                    <AdminRoute path="/userlist" component={UserListScreen} />
                    <AdminRoute
                        path="/user/:id/edit"
                        component={UserEditScreen}
                    />
                </main>
                <footer className="row center">All rights reserved.</footer>
            </div>
        </BrowserRouter>
    )
}

export default App
