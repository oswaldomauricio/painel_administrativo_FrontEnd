"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import BreadcrumbComponents from "./breadcrumb/breadcrumb";
import HeaderComponent from "./header";
import { useSession } from "next-auth/react";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "financeiro",
    label: "Financeiro",
    icon: <UploadOutlined />,
    children: [
      {
        key: "caixa",
        label: "Caixa",
      },
      {
        key: "caixa2",
        label: "Caixa 2",
      },
    ],
  },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [current, setCurrent] = useState("financeiro");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: session, status } = useSession(); // Hook para obter a sessão

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    const routes: Record<string, string> = {
      caixa: "/financeiro/caixa",
      caixa2: "/financeiro",
    };

    if (routes[e.key]) {
      router.push(routes[e.key]);
    }
  };

  return (
    <Layout className="h-svh overflow-hidden">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="flex items-center justify-center">
          <Image
            alt="Logo da empresa"
            src="/logoBranca.png"
            className="py-4"
            width={100}
            height={40}
            quality={100}
          />
        </div>
        <Menu
          theme="dark"
          onClick={onClick}
          style={{ width: 200, color: "white" }}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <HeaderComponent>
          <div>
            {status === "loading" && <span>Carregando...</span>}
            {session ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="font-semibold text-black">
                  {session.user?.name || "Usuário"}
                </div>
                <div className="w-[1px] h-5 bg-black" />
                <Image
                  src="/profileIcon.png"
                  alt="perfil"
                  width={40}
                  height={20}
                  quality={100}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </HeaderComponent>
        <Content style={{ margin: "16px 16px 0", overflow: "auto" }}>
          <BreadcrumbComponents current={current} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
