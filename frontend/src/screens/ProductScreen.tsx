import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'

import { detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'
import { RootState } from '../store'

export default function ProductScreen() {
    const props = useParams<Props>()
    const history = useHistory()
    const dispatch = useDispatch()
    const productId = props.id
    const [qty, setQty] = useState('1')
    const productDetails = useSelector(
        (state: RootState) => state.productDetails
    )
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">Back to result</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img
                                className="large"
                                src={product?.image}
                                alt={product?.name}
                            />
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>{product?.name}</li>
                                <li>
                                    {product && (
                                        <Rating
                                            rating={product.rating}
                                            numReviews={product.numReviews}
                                        />
                                    )}
                                </li>
                                <li>Price: ${product?.price}</li>
                                <li>
                                    Description:
                                    <p>{product?.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        Seller{' '}
                                        <h2>
                                            <Link
                                                to={`/seller/${product?.seller?._id}`}
                                            >
                                                {product?.seller?.seller?.name}
                                            </Link>
                                        </h2>
                                        <Rating
                                            rating={
                                                product?.seller?.seller.rating
                                            }
                                            numReviews={
                                                product?.seller?.seller
                                                    .numReviews
                                            }
                                        />
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">
                                                ${product?.price}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product &&
                                                product.countInStock > 0 ? (
                                                    <span className="success">
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="danger">
                                                        Unavailable
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {product && product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select
                                                            value={qty}
                                                            onChange={(e) =>
                                                                setQty(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {[
                                                                ...Array(
                                                                    product.countInStock
                                                                ).keys(),
                                                            ].map((x) => (
                                                                <option
                                                                    key={x + 1}
                                                                    value={
                                                                        x + 1
                                                                    }
                                                                >
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={addToCartHandler}
                                                    className="primary block"
                                                >
                                                    Add to Cart
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
