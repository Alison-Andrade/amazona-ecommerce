import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { detailsProduct, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import api from '../services/api'
import { RootState } from '../store'

export default function ProductEditScreen() {
    const history = useHistory()
    const props = useParams<Props>()
    const productId = props.id
    const productDetails = useSelector((state: RootState) => state.productDetails)
    const { error, loading, product } = productDetails
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const productUpdate = useSelector((state: RootState) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate
    const userSignin = useSelector((state: RootState) => state.userSignin)
    const { userInfo } = userSignin

    useEffect(() => {
        if (successUpdate) {
            history.push('/productlist')
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, name, price, image, category, countInStock, brand, description }))
    }

    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')
    const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            const bodyFormData = new FormData()
            bodyFormData.append('image', file)
            setLoadingUpload(true)

            api.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Autorization: `Bearer ${userInfo?.token}`
                }
            }).then(response => {
                const { data } = response
                setImage(data)
                setLoadingUpload(false)
            }).catch((error) => {
                setErrorUpload(error)
                setLoadingUpload(false)
            })
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {product?._id}</h1>
                </div>
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

                {
                    loading ? <LoadingBox /> :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input type="text" id="price" placeholder="Enter Price" value={price} onChange={e => setPrice(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input type="text" id="image" placeholder="Enter Image" value={image} onChange={e => setImage(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="imageFile">Image File</label>
                                    <input type="file" id="imageFile" onChange={uploadFileHandler} />
                                    {loadingUpload && <LoadingBox />}
                                    {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                                </div>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <input type="text" id="category" placeholder="Enter Category" value={category} onChange={e => setCategory(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="countInStock">Count in Stock</label>
                                    <input type="text" id="countInStock" placeholder="Enter Count in Stock" value={countInStock} onChange={e => setCountInStock(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label htmlFor="brand">Brand</label>
                                    <input type="text" id="brand" placeholder="Enter Brand" value={brand} onChange={e => setBrand(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" rows={3} placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                                <div>
                                    <label />
                                    <button className="primary" type="submit">
                                        {loadingUpdate ? <LoadingBox /> : 'Update'}
                                    </button>
                                </div>
                            </>
                }
            </form>

        </div>
    )
}
