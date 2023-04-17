import axios from "axios";

const cmClient = axios.create({
    baseURL: process.env.REACT_APP_CM_BASE_URL 
});

export default cmClient;