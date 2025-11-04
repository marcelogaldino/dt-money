import axios from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";

const baseURL = Platform.select({
  android: "http://SEU_IP:3001",
  ios: "http://localhost:3001",
});

export const dtMoneyApi = axios.create({
  baseURL,
});

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      const errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.message || "Erro na requisição";
      return Promise.reject(new AppError(errorMessage));
    } else {
      return Promise.reject(new AppError("Falha na requisição"));
    }
  }
);
