import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import Greetings from "@/components/Greetings";
import RequiredInputWithLabel from "@/components/RequiredInputWithLabel";

import loginStyle from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { ApiDoLogin } from "../api/api";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import type { LoginProps } from "./types";
import type { LoginResponseData } from "@features/api/types";
import type { UserCredentials } from "@features/auth/types";
import { AxiosResponse } from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const handleLogin = async ({ email, password }: LoginProps) => {
    const response: AxiosResponse<LoginResponseData, any> | undefined =
      await ApiDoLogin({ email, password });

    if (response === undefined) {
      alert("Login failed");
      return;
    }

    if (response.status === 200) {
      const username = response.data.user.username;
      const token = response.data.token;

      const credentials: UserCredentials = {
        username: username,
        accessToken: token,
        id: response.data.user.id,
      };

      localStorage.setItem("userCredentials", JSON.stringify(credentials));

      dispatch(login(credentials));
      navigate("/notes");
    } else {
      alert("Login failed");
    }
  };

  // Check if the user is already logged in and redirect to the notes page
  useEffect(() => {
    const userCredentials = localStorage.getItem("userCredentials");
    if (userCredentials) {
      dispatch(login(JSON.parse(userCredentials)));
      navigate("/notes");
    } else {
      console.log("Credentials not found, redirecting to login page");
    }
  }, []);

  return (
    <>
      <Greetings text="Seu gerenciador de notas pessoal" />
      <form onSubmit={handleSubmit} className={loginStyle.form}>
        <div className={loginStyle.title}>
          Bem vindo
          <br />
          <span>Entre em sua conta</span>
        </div>
        <div className={loginStyle.form_items}>
          <RequiredInputWithLabel
            label="Email"
            type="email"
            id="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
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
          <div className={loginStyle.login_options}>
            <Button type="submit" label="Entrar" onAction={() => {}} />
            <div className={loginStyle.login_options_links}>
              <a href="/register"> Não tenho uma conta </a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

export type { LoginProps };
