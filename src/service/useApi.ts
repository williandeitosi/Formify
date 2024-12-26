import apiConfig from "@/config/config";
import axios from "axios";

export const Api = axios.create({
  baseURL: apiConfig.NEXT_PUBLIC_BASE_URL,
});
