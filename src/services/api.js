import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3333", // tendo um baseURL não precisamos mais informar qual o dominio da nossa API
});
