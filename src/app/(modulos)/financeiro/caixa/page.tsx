import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Enviar_valores from "./enviar_valores";
import { Col, Row } from "antd";
import Relatorio_valores from "./relatorio_valores";
export default async function ModuloCaixa() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="">
      <Row>
        <Col span={24}>
          <div className="flex justify-start">
            <Enviar_valores />
          </div>
        </Col>
      </Row>
      <Row className="gap-6 justify-between py-8">
        <Col span={24}>
          <div className="">
            <Relatorio_valores />
          </div>
        </Col>
      </Row>
    </div>
  );
}
