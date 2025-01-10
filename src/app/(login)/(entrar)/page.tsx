import LoginForm from "../components/LoginForm";
import Image from "next/image";

export default function Home() {


  return (
    <div className="flex items-center justify-center">
      <div className=" bg-sidebar_main w-[400px] h-[382px] rounded-xl">
        <div className="flex items-start justify-center h-full p-12 flex-col gap-6">
          <div className="flex items-center justify-center w-[300px] h-[80px]">
            <Image
              alt="Logo da empresa"
              src="/logoBranca.png"
              className=""
              width={200}
              height={80}
              quality={100}
            />
          </div>

          <LoginForm />
            
        </div>
      </div>
    </div>
  );
}
