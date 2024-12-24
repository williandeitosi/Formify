import apiConfig from "@/config/config";
import axios from "axios";

export const Api = axios.create({
  baseURL: apiConfig.BASE_URL,
});
