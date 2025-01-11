import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutForm from "@/app/(login)/components/logoutForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export default async function ModuloCaixa() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  

  return (
    <div className="">
      <h1>ola</h1>
      <div>{session.user?.name}</div>
      <div>{session.user?.id}</div>
      <div>{session.user?.role}</div>
      <div>
        <LogoutForm />
      </div>
    </div>
  );
}
