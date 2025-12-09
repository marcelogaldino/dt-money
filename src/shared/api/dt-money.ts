import axios from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";
import { addTokenToRequest } from "../helpers/axios.helper";

const baseURL = Platform.select({
  android: "http://localhost:3001",
  ios: "http://localhost:3001",
});

export const dtMoneyApi = axios.create({
  baseURL,
});

addTokenToRequest(dtMoneyApi);

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
