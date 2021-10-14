import axios from "axios";

const baseURL = "http://localhost:2000/api";

const client = axios.create({ baseURL });

export default client;
