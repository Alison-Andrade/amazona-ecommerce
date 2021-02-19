import axios from 'axios'

const api = process.env.NODE_ENV === "development" ? axios.create({ baseURL: 'http://localhost/3333', })
    : process.env.NODE_ENV === "production" && axios.create({ baseURL: 'https://my-amazona-ecommerce.herokuapp.com/', })


export default api