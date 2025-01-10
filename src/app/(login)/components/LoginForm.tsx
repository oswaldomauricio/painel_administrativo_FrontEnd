"use client";
import {
  InfoCircleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Button } from "antd";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams()

  const error = searchParams.get('error')

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      username: formData.username,
      password: formData.password,
    };
    signIn("credentials", {
      ...data,
      callbackUrl: "/financeiro/caixa",
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form className="" onSubmit={login}>
      <Input
        placeholder="Nome de usuário"
        name="username"
        prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        suffix={
          <Tooltip title="Solicite o login e senha para o setor de TI.">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        className="py-2 placeholder:text-black my-6"
        value={formData.username}
        onChange={handleInputChange}
      />

      <Input
        placeholder="Digite sua senha"
        name="password"
        prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        type="password"
        className="py-2 placeholder:text-black mb-6"
        value={formData.password}
        onChange={handleInputChange}
      />

      <Button type="primary" htmlType="submit" className="w-full mb-6">
        Login
      </Button>

      {error === 'CredentialsSignin' && (<div className="text-red-500">Login ou senha invalidos!</div>)}
    </form>
  );
}
