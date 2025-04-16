import axios, { AxiosResponse } from "axios"
import type { RegisterData, LoginResponseData } from "./types"
import type { LoginProps } from "@features/login/types"

const API_URL = "http://localhost:8000/api/"

const axios_instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

const ApiDoRegister = async (registerData: RegisterData) => {
  try {
    const response: AxiosResponse<LoginResponseData, any> =
      await axios_instance.post("register", registerData)
    return response
  } catch (error) {
    console.error("Registration failed:", error)
  }
}

const ApiDoLogin = async (loginData: LoginProps) => {
  try {
    const response: AxiosResponse<LoginResponseData, any> =
      await axios_instance.post("login", loginData)
    return response
  } catch (error) {
    console.error("Login failed:", error)
  }
}

export { ApiDoLogin, ApiDoRegister }
