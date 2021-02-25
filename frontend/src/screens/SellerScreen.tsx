import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import { detailsUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'
import Rating from '../components/Rating'
import { RootState } from '../store'

export default function SellerScreen() {
    const props = useParams<Props>()
    const sellerId = props.id
    const userDetails = useSelector((state: RootState) => state.userDetails)
    const { loading, error, userInfo } = userDetails
    const productList = useSelector((state: RootState) => state.productList)
    const {
        loading: loadingProducts,
        error: errorProducts,
        products,
    } = productList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsUser(sellerId))
        dispatch(listProducts({ seller: sellerId }))
    }, [dispatch, sellerId])

    return (
        <div className="row top">
            <div className="col-1">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <ul className="card card-body">
                        <li>
                            <div className="row start">
                                <div className="p-1">
                                    <img
                                        className="small"
                                        src={userInfo?.seller?.logo}
                                        alt={userInfo?.seller?.name}
                                    />
                                </div>
                                <div className="p-1">
                                    <h1>{userInfo?.seller?.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating
                                rating={userInfo?.seller?.rating}
                                numReviews={userInfo?.seller?.numReviews}
                            />
                        </li>
                        <li>
                            <a href={`mailto:${userInfo?.email}`}>
                                Contact Seller
                            </a>
                        </li>
                        <li>{userInfo?.seller?.description}</li>
                    </ul>
                )}
            </div>
            <div className="col-3">
                {loadingProducts ? (
                    <LoadingBox />
                ) : errorProducts ? (
                    <MessageBox variant="danger">{errorProducts}</MessageBox>
                ) : (
                    <>
                        {products?.length === 0 && (
                            <MessageBox>No Product Found</MessageBox>
                        )}
                        <div className="row center">
                            {products?.map((product) => {
                                return (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
