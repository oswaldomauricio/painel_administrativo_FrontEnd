"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import HeaderComponent from "./header";
import { useSession } from "next-auth/react";
import { LogoutBtnProfile } from "../logoutBtn";

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
    ],
  },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [current, setCurrent] = useState("financeiro");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: session, status } = useSession();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    const routes: Record<string, string> = {
      caixa: "/financeiro/caixa",
    };

    if (routes[e.key]) {
      router.push(routes[e.key]);
    }
  };

  return (
    <Layout className="h-svh overflow-hidden">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="flex items-center justify-center">
          <Image
            alt="Logo da empresa"
            src="/logoBranca.png"
            className="py-4"
            priority={false}
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
          <div className="w-full">
            {status === "loading" && (
              <div className="bg-zinc-50/10 animate-pulse rounded-md w-8 h-1 p-2">
                Carregando...
              </div>
            )}
            {session ? (
              <div className="flex justify-between items-center w-full">
                {/* Botão alinhado à esquerda */}
                <div>
                  <a href="/MODULO_DE_CAIXA-PAINEL.pdf" download>
                    <button
                      style={{
                        padding: "0px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      Tutorial
                    </button>
                  </a>
                </div>

                {/* Usuário e Logout alinhados à direita */}
                <div className="flex flex-row gap-2 items-center">
                  <div className="font-semibold text-black">
                    {session.user?.name.toUpperCase() || "Usuário"}
                  </div>
                  <div className="w-[1px] h-5 bg-black" />
                  <div className="font-semibold text-gray-500">
                    {session.user?.role.toUpperCase() || "Permissão"}
                  </div>
                  <div className="w-[1px] h-5 bg-black" />
                  <LogoutBtnProfile />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </HeaderComponent>
        <Content style={{ margin: "16px 16px 0", overflow: "auto" }}>
          <div
            style={{
              padding: 24,
              minHeight: 800,
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
