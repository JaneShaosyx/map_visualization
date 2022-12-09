import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8888" });

export const getPrediction = (data) => API.post(`/`, data);
