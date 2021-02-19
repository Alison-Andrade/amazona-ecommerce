import axios from 'axios'

const port = process.env.PORT

const api = axios.create({
    baseURL: `http://localhost/${port}`,
})

export default api;