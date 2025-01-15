import { ReactNode } from "react";
import "@ant-design/v5-patch-for-react-19";
import Sidebar from "./components/sidebar/sidebar";

export async function generateMetadata() {
  return {
    title: "Caixa",
  };
}

export default function modulosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  );
}
