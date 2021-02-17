import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox'
import { RootState } from '../store'

export default function CartScreen(){
	const props = useParams<Props>()
	const history = useHistory()
	const productId = props.id
	const queryString = window.location.search
	const urlSearchParams = new URLSearchParams(queryString)
	const qty = urlSearchParams.get('qty')
	const dispatch = useDispatch()
	const userSignin = useSelector((state: RootState) => state.userSignin)
	const { userInfo } = userSignin

	const cart = useSelector((state:RootState) => state.cart)
	const { cartItems } = cart

	useEffect(() => {
		if (productId) {
			qty ? dispatch(addToCart(productId, Number(qty))) : dispatch(addToCart(productId, 1))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (product: string) => {
		dispatch(removeFromCart(product))
	}

	const checkoutHandler = () => {
		userInfo ? history.push('/shipping') : history.push('/signin?redirect=shipping')
	}

	return (
		<div className="row top">
			<div className="col-2">
				<h1>Sopping Cart</h1>
				{cartItems.length === 0 ?
					(
						<MessageBox>
							Cart is empty. <Link to='/'>Go Sopping</Link>
						</MessageBox>
					): 
					(
						<ul>
							{
								cartItems.map(item => (
									<li key={item.product}>
										<div className="row">
											<div>
												<img src={item.image} alt={item.name} className="small"/>
											</div>
											<div className="min-30">
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</div>
											<div>
												<select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
												{
													[...Array(item.countInStock).keys()].map(x => (
														<option key={x+1} value={x+1}>{x+1}</option>
													))
												}
												</select>
											</div>
											<div>${item.price}</div>
											<div>
												<button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					)
				}
			</div>
			<div className="col-1">
				<div className="card card-body">
					<ul>
						<li>
							<h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h2>
						</li>
						<li>
							<button 
								type="button" 
								onClick={checkoutHandler} 
								className="primary block"
								disabled={cartItems.length === 0}
							>
								Proceed to Checkout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}