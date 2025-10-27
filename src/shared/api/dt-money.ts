import axios from "axios";
import { Platform } from "react-native";

const baseURL = Platform.select({
  android: "http://10.0.2.2:3001",
  ios: "http://localhost:3001",
});

export const dtMoneyApi = axios.create({
  baseURL,
});
