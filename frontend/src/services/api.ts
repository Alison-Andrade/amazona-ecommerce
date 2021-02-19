import axios from 'axios'

const port = process.env.PORT || 3333

const api = axios.create({
    baseURL: `http://localhost/${port}`,
})

export default api;