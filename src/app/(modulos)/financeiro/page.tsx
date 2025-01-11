import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutForm from "@/app/(login)/components/logoutForm";
import Link from "next/link";
import React from "react";
export default async function Modulo23() {
  const session = await getServerSession(authOptions);
  // console.log(session.user);

  if (!session) {
    redirect("/");
  }

  return (
    // <div className="flex items-center justify-center flex-col">
    <div className="">
      <h1>ola2</h1>
      <div>{session.user?.id}</div>
      <div>{session.user?.name}</div>
      <div>{session.user?.role}</div>
      <Link href="/financeiro/caixa">Ir para modulo de caixa</Link>
      <div>
        <LogoutForm />
      </div>
      {
        // indicates very long content
        Array.from({ length: 100 }, (_, index) => (
          <React.Fragment key={index}>
            {index % 20 === 0 && index ? "more" : "..."}
            <br />
          </React.Fragment>
        ))
      }
    </div>
  );
}
