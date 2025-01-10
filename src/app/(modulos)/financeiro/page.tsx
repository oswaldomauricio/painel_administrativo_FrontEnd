import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutForm from "@/app/(login)/components/logoutForm";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Modulo23() {
  const session = await getServerSession(authOptions);
  console.log(session.user);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>ola2</h1>
      <div>{session.user?.id}</div>
      <div>{session.user?.name}</div>
      <div>{session.user?.role}</div>
      <Link href="/financeiro/caixa">Ir para modulo de caixa</Link>
      <div>
        <LogoutForm />
      </div>
    </div>
  );
}
