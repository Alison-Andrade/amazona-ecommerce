import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
    PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_RESET,
} from '../constants/productConstants'
import { RootState } from '../store'

interface Props {
    pageNumber: string
}

export default function ProductListScreen() {
    const { pageNumber = '1' } = useParams<Props>()
    const location = useLocation()
    const sellerMode = location.pathname.indexOf('/seller') >= 0
    const history = useHistory()
    const productList = useSelector((state: RootState) => state.productList)
    const { loading, error, products, page, pages } = productList
    const dispatch = useDispatch()
    const productCreate = useSelector((state: RootState) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate
    const productDelete = useSelector((state: RootState) => state.productDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete
    const userSignin = useSelector((state: RootState) => state.userSignin)
    const { userInfo } = userSignin

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            history.push(`/product/${createdProduct?._id}/edit`)
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET })
        }
        dispatch(listProducts({ seller: sellerMode ? userInfo?._id : '', pageNumber }))
    }, [
        dispatch,
        createdProduct,
        successCreate,
        history,
        successDelete,
        sellerMode,
        userInfo,
        pageNumber,
    ])

    const createHandler = () => {
        dispatch(createProduct())
    }

    const deleteHandler = (product: ProductInterface) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id))
        }
    }

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button className="primary" type="button" onClick={createHandler}>
                    {loadingCreate ? <LoadingBox /> : 'Create Product'}
                </button>
            </div>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button
                                            className="small"
                                            onClick={() => {
                                                history.push(
                                                    `/product/${product._id}/edit`
                                                )
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="small"
                                            onClick={() => {
                                                deleteHandler(product)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination row center">
                        {[...Array(pages).keys()].map((x) => (
                            <Link
                                className={x + 1 === page ? 'active' : ''}
                                key={x + 1}
                                to={`/productlist/pageNumber/${x + 1}`}
                            >
                                {x + 1}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
