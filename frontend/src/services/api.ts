import axios from 'axios'
import { useState } from 'react'

const [api, setApi] = useState({})

if (process.env.NODE_ENV === "development") {
    setApi(axios.create({
        baseURL: 'http://localhost/3333',
    }))
} else if (process.env.NODE_ENV === "production") {
    setApi(axios.create({
        baseURL: 'https://my-amazona-ecommerce.herokuapp.com/',
    }))
}

export default api