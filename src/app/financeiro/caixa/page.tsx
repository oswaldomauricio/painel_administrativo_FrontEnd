import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutForm from "@/app/(login)/components/logoutForm";

export default async function ModuloCaixa() {
  const session = await getServerSession();
  console.log(session)

  if (!session) {
    redirect("/");
  }
  

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>ola</h1>
      <div>{session.expires}</div>
      <div>{session.user?.name}</div>
      <div>{session.user?.email}</div>
      <div>{session.user?.name}</div>
      <div>
        <LogoutForm />
      </div>
    </div>
  );
}
