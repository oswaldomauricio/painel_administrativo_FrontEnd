"use client";
import React, { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Row, Space, Spin } from "antd";
import { useSession } from "next-auth/react";
import SelectBtn_lojas from "../../components/select/select_loja";
import Select_Tipo_Operacao from "../../components/select/select_tipo_operacao";
import Select_date from "../../components/select/select_date";
import Select_valor from "../../components/select/select_valor";
import Select_input_text from "../../components/select/select_input_text";
import { Alert_sucess } from "../../components/alert/alert";
import Select_Tipo from "../../components/select/select_tipo";

export default function Enviar_valores() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const user_role = session?.user?.role;

  const [resetTrigger, setResetTrigger] = useState(0);
  const [loading, setLoading] = useState(false);

  const [tipoOperacao, setTipoOperacao] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [origem, setOrigem] = useState("");
  const [selectedLoja, setSelectedLoja] = useState("");
  const [selectedIdLoja, setSelectedIdLoja] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedValor, setSelectedValor] = useState<number>(0);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [alert, setAlert] = useState("");
  const [alertField, setAlertField] = useState("");

  const ROLE_USERS: string[] = ["ADMIN", "USER"];

  const resetValues = () => {
    setNumeroDoc("");
    setTipoOperacao("");
    setTipo("");
    setOrigem("");
    setSelectedValor(0);
    setError("");
    setSucess("");
    setError("");
    setAlertField("");
    setResetTrigger((prev) => prev + 1);
  };

  const showDrawer = () => {
    setOpen(true);
    resetValues();
  };

  const onClose = () => {
    setOpen(false);
    resetValues();
  };

  const handleValueChange = (value: number) => {
    setSelectedValor(value);
  };

  const handleDateChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSelectedDate(value);
    } else {
      setSelectedDate(value[0] || "");
    }
  };

  const handleLojaChange = (loja: string, id: string) => {
    setSelectedLoja(loja);
    setSelectedIdLoja(id);
  };

  const handleTipoOperacaoChange = (value: string) => {
    setTipoOperacao(value);
  };

  const handleTipoChange = (value: string) => {
    setTipo(value);
  };

  const handleSubmit = async () => {
    if (
      !selectedIdLoja ||
      !selectedDate ||
      !tipoOperacao ||
      !tipo ||
      !selectedValor ||
      !numeroDoc ||
      !origem
    ) {
      setAlertField("Preencha todos os campos obrigatórios!");
      return;
    }
    const payload = {
      loja: parseInt(selectedLoja),
      data: selectedDate,
      id_user: userId,
      numero_doc: numeroDoc,
      origem: origem,
      tipo_operacao: tipoOperacao,
      tipo: tipo,
      valor: selectedValor,
    };

    try {
      const response = await fetch("/api/caixa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const logSucess = data.result;
        console.log(logSucess, data.caixas);
        setSucess(logSucess);
        setTimeout(() => resetValues(), 3000);
      } else {
        const logError = data.error;
        console.log(logError);
        setError(logError);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      const logError = `erro ao enviar dados: ${error}`;
      setError(logError);
    }
  };

  const formatarData = (data: Date) => {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const inserirValorAntesDoDiaAtualPorPermissao = async () => {
    setLoading(true);
    const dataAtual = new Date();
    const dataFormatadaAtual = formatarData(dataAtual);

    if (user_role !== "ADMIN" && selectedDate !== dataFormatadaAtual) {
      setError(
        "Operação proibida: Você não tem permissão para registrar um valor em uma data anterior à data atual."
      );
      setLoading(false);
      return;
    }

    try {
      await handleSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col w-[400px]">
            <div className="font-semibold text-2xl font-sans text-gray-800">
              Relatorio de Caixa
            </div>
            <div className="font-normal text-base font-sans text-gray-500">
              Insira os valores de entrada e saida no caixa.
            </div>
          </div>
          <div>
            {ROLE_USERS.includes(user_role || "") && (
              <Button
                type="primary"
                onClick={showDrawer}
                icon={<PlusOutlined />}
              >
                Inserir valor
              </Button>
            )}
          </div>
        </div>
      </div>
      <Drawer
        title="Inserir valor no caixa:"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              onClick={inserirValorAntesDoDiaAtualPorPermissao}
              type="primary"
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />}
                />
              ) : (
                "Enviar"
              )}
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Selecione a loja"
                label="Selecione a loja"
                rules={[{ required: true, message: "Selecione a loja" }]}
              >
                <SelectBtn_lojas
                  loja={selectedLoja}
                  id={selectedIdLoja}
                  onChange={handleLojaChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Selecione a operação"
                label="Selecione a operação"
                rules={[{ required: true, message: "Selecione a operação" }]}
              >
                <Select_Tipo_Operacao
                  TipoOperacao={tipoOperacao}
                  onChange={handleTipoOperacaoChange}
                  resetTrigger={resetTrigger}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Selecione a data"
                label="Selecione a data"
                rules={[{ required: true, message: "Selecione a data" }]}
              >
                <Select_date data={selectedDate} onChange={handleDateChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Digite o valor"
                label="Digite o valor"
                rules={[{ required: true, message: "Digite o valor" }]}
              >
                <Select_valor
                  valor={selectedValor}
                  onChange={handleValueChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Selecione o tipo"
                label="Selecione o tipo"
                rules={[{ required: true, message: "Selecione o tipo" }]}
              >
                <Select_Tipo
                  Tipo={tipo}
                  onChange={handleTipoChange}
                  resetTrigger={resetTrigger}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <div>
                <span>Digite o número do documento</span>
                <div className="my-2">
                  <Select_input_text
                    title="Digite o número do documento"
                    text={numeroDoc}
                    onChange={(value) => {
                      const truncatedValue = value.slice(0, 10);
                      setNumeroDoc(truncatedValue);
                      if (value.length > 10) {
                        setAlert(
                          "O número do documento não pode ter mais de 10 caracteres."
                        );
                      } else {
                        setAlert("");
                      }
                    }}
                    resetTrigger={resetTrigger}
                  />
                </div>
                {alert && <div className="text-orange-300">{alert}</div>}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Digite a origem"
                label="Digite a origem"
                rules={[
                  {
                    required: true,
                    message: "Digite a origem",
                  },
                ]}
              >
                <Select_input_text
                  title="Digite a origem"
                  text={origem}
                  onChange={(value) => {
                    const truncatedValue = value.slice(0, 100);
                    setOrigem(truncatedValue);
                    if (value.length > 100) {
                      setAlertField(
                        "O campo de origem não pode ter mais de 100 caracteres."
                      );
                    } else {
                      setAlertField("");
                    }
                  }}
                  resetTrigger={resetTrigger}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {error && (
          <div className="">
            {<Alert_sucess type="error" mensagem="Error" description={error} />}
          </div>
        )}
        {sucess && (
          <div className="">
            {
              <Alert_sucess
                type="success"
                mensagem="Sucesso"
                description={sucess}
              />
            }
          </div>
        )}
        {alertField && (
          <div className="">
            {
              <Alert_sucess
                type="warning"
                mensagem="Atenção"
                description={alertField}
              />
            }
          </div>
        )}
      </Drawer>
    </div>
  );
}
