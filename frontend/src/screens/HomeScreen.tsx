import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"

import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import Product from "../components/Product"
import { RootState } from "../store"

export default function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector((state: RootState) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts({}))
    }, [dispatch])

    return (
        <div>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {products?.map((product) => {
                        return <Product key={product._id} product={product} />
                    })}
                </div>
            )}
        </div>
    )
}
