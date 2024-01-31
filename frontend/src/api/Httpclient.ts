import axios from "axios";

const httpClient = axios.create({baseURL: "http://localhost:8080/api"});

export default httpClient;