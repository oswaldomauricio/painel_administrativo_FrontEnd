
import { Layout } from "antd";
import { ReactNode } from "react";

type HeaderComponentProps = {
  children: ReactNode;
};

const { Header } = Layout;


export default function HeaderComponent({ children }: HeaderComponentProps) {
  return (
    <Header style={{ display: "flex", justifyContent: 'end', color: "white", background: 'white' }}>
        {children}
    </Header>
  );
}
