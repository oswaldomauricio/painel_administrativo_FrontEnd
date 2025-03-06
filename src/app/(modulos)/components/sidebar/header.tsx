import { Layout } from "antd";
import { ReactNode } from "react";

type HeaderComponentProps = {
  children: ReactNode;
};

const { Header } = Layout;

export default function HeaderComponent({ children }: HeaderComponentProps) {
  return (
    <Header
      className="flex justify-between items-center w-full bg-white text-black"
      style={{
        color: "white",
        background: "white",
      }}
    >
      {children}
    </Header>
  );
}
