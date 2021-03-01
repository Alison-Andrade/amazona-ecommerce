import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'
import { RootState } from '../store'

interface Props {
    name: string
}

export default function SearchScreen() {
    const { name = 'all' } = useParams<Props>()
    const dispatch = useDispatch()
    const productList = useSelector((state: RootState) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts({ name: name !== 'all' ? name : '' }))
    }, [dispatch, name])

    return (
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>{products?.length} Results</div>
                )}
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Department</h3>
                    <ul>
                        <li>Category 1</li>
                    </ul>
                </div>
                <div className="col-3">
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
                </div>
            </div>
        </div>
    )
}
