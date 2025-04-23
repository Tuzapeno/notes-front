import axios, { AxiosResponse } from "axios";
import type { RegisterData, LoginResponseData } from "./types";
import type { LoginProps } from "@features/login/types";
import { selectAccessToken } from "../auth/authSlice";
import { store } from "@/app/store";

const API_URL = "http://localhost:8000/api/";

const axios_instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios_instance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = selectAccessToken(state);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ApiDoRegister = async (registerData: RegisterData) => {
  try {
    const response: AxiosResponse<LoginResponseData, any> =
      await axios_instance.post("register", registerData);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

const ApiDoLogin = async (loginData: LoginProps) => {
  try {
    const response: AxiosResponse<LoginResponseData, any> =
      await axios_instance.post("login", loginData);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

const ApiDoLogoff = async () => {
  try {
    const response: AxiosResponse<LoginResponseData, any> =
      await axios_instance.post("logout");
    return response;
  } catch (error) {
    console.error("Logoff failed:", error);
  }
};

const ApiDoSaveNotes = async (notes: any, user_id: number) => {
  try {
    const response: AxiosResponse<any, any> = await axios_instance.post(
      "saveNotes",
      {
        notes: notes,
        user_id: user_id,
      },
    );
    return response;
  } catch (error) {
    console.error("Save notes failed:", error);
  }
};

export { ApiDoLogin, ApiDoRegister, ApiDoLogoff, ApiDoSaveNotes };
export default axios_instance;
