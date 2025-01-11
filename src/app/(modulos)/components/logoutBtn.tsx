'use client'
import { Button } from "antd";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <Button type="primary" htmlType="submit" className="" onClick={() => signOut()}>
      Sair
    </Button>
  );
}
