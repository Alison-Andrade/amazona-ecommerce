import axios from 'axios'

const api = process.env.NODE_ENV === "development" ? axios.create({ baseURL: 'http://192.168.1.10:3333', }) : axios.create({ baseURL: 'https://my-amazona-ecommerce.herokuapp.com/', })

export default api