import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers
        ? (config.headers["Authorization"] = token)
        : (config.headers = { Authorization: token });
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
