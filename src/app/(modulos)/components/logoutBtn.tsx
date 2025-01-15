"use client";
import { signOut } from "next-auth/react";
import { Button } from "antd";

export function LogoutBtn() {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className=""
      onClick={() => signOut()}
    >
      Sair
    </Button>
  );
}

export function LogoutBtnProfile() {
  return (
    <Button type="text" danger onClick={() => signOut()}>
      Sair
    </Button>
  );
}
