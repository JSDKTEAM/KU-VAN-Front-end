import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://158.108.207.201/ku_van'
    baseURL: 'http://localhost:9000'
})

export default instance;