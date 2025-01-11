import { ReactNode } from "react";
import '@ant-design/v5-patch-for-react-19';
// import Header from "./components/header";

export async function generateMetadata() {
  return {
    title: 'Login'
  }
}
export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="items-center justify-center mx-auto grid min-h-screen w-full"> 
      {children}
    </div>
  );
}
