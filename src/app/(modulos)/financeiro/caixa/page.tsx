import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import LogoutForm from "@/app/(login)/components/logoutForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import Campo_envio_valores from "./campo_envio_valores";
import Enviar_valores from "./enviar_valores";

export default async function ModuloCaixa() {
  
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center">
      {/* <div>{session.user?.name}</div>
      <div>{session.user?.id}</div>
      <div>{session.user?.role}</div> */}
      {/* <Campo_envio_valores /> */}
      <Enviar_valores />
      {/* <div>
        <LogoutForm />
      </div> */}
    </div>
  );
}
