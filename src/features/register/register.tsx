import RequiredInputWithLabel from "@components/RequiredInputWithLabel"
import { ChangeEvent, FormEvent, useState } from "react"

import type { LoginResponseData, RegisterData } from "@features/api/types"
import { ApiDoRegister } from "@features/api/api"

import registerStyle from "@features/login/login.module.css"
import Button from "@/components/Button/Button"
import { AxiosResponse } from "axios"
import { useDispatch } from "react-redux"

import { login } from "@features/auth/authSlice"
import { useNavigate } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [cpf, setCpf] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const registerData: RegisterData = {
      email,
      username,
      cpf,
      password,
      password_confirmation: confirmPassword,
    }

    registerForm(registerData)
  }

  const registerForm = async (data: RegisterData) => {
    const response: AxiosResponse<LoginResponseData, any> | undefined =
      await ApiDoRegister(data)

    if (response === undefined) {
      console.log("Registration failed")
      console.log("No response.")
      return
    }

    if (response.status === 201) {
      console.log("Registration successful")
      console.log(response.data)

      const loginData = {
        username: response.data.user.username,
        accessToken: response.data.token,
      }

      dispatch(login(loginData))
      navigate("/notes")
    } else {
      console.log("Registration failed")
      console.log(response.status)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={registerStyle.form}>
      <div className={registerStyle.title}>
        Quase lá
        <br />
        <span>Cadastre seus dados</span>
      </div>
      <div className={registerStyle.form_items}>
        <RequiredInputWithLabel
          label="Email"
          type="email"
          id="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <RequiredInputWithLabel
          label="Username"
          type="text"
          id="username"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <RequiredInputWithLabel
          label="CPF"
          type="text"
          id="cpf"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCpf(e.target.value)
          }
        />
        <RequiredInputWithLabel
          label="Password"
          type="password"
          id="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <RequiredInputWithLabel
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        <Button type="submit" label="Cadastrar" onAction={() => {}} />
      </div>
    </form>
  )
}

export default Register
