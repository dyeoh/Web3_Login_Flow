import axios from "axios";

const baseURL = "http://localhost:80/api";

const client = axios.create({ baseURL });

export default client;
