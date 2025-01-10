import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthSessionProvider from "@/providers/sessionsProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NORTE AUTO PEÇAS",
    default: "PAINEL ADMINISTRATIVO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.variable} suppressHydrationWarning>
      <body className={`antialiased bg-bg-scren`}>
        <NextAuthSessionProvider>
          <AntdRegistry>
            {children}
            </AntdRegistry>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
