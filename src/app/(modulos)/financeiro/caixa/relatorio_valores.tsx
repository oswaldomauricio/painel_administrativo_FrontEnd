'use client'
import { useState } from "react";
import { Col, Row, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SelectBtn_lojas from "../../components/select/select_loja";
import Select_date from "../../components/select/select_date";
import RelatorioCaixaTable from "../../components/table/RelatorioCaixaTable";
import { RelatorioResponse, CaixaItem, Saldo } from "../../types/CaixaTypes";
import { Card_values_caixa } from "../../components/cards/card_values_caixa";
import { WalletOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Alert_sucess } from "../../components/alert/alert";

export default function Relatorio_valores() {
  const [selectedLoja, setSelectedLoja] = useState("");
  const [selectedIdLoja, setSelectedIdLoja] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [tableData, setTableData] = useState<(CaixaItem & { key: number })[]>(
    []
  );
  const [saldoData, setSaldoData] = useState<Saldo | null>(null);


  const handleSubmit = async () => {
    if (!selectedIdLoja || !selectedDate) {
      setAlert("Preencha todos os campos obrigatórios!");
      return;
    }
    setAlert("");

    const payload = {
      loja: parseInt(selectedLoja),
      data: selectedDate,
    };

    try {
      const response = await fetch("/api/relatorio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: RelatorioResponse = await response.json();

      if (response.ok && data.status === 200) {
        setTableData(
          data.Caixa.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
        setSaldoData(data.Saldo)

      } else {
        setTableData([])
        setSaldoData(null)
        setAlert("Sem dados no relatorio com a data inserida!");
      }
    } catch (error) {
      if (error instanceof Error) {
        setAlert(`Erro ao enviar dados: ${error.message}`);
      } else {
        setAlert("Erro desconhecido ao enviar dados.");
      }
    }
  };

  const handleDateChange = (value: string | string[]) => {
    setSelectedDate(typeof value === "string" ? value : value[0] || "");
  };

  const handleLojaChange = (loja: string, id: string) => {
    setSelectedLoja(loja);
    setSelectedIdLoja(id);
  };

  return (
    <div className="w-100%">
      <Row className="min-w-full items-center justify-between py-8 gap-6">
        <Col span={6} className="flex justify-center">
          <Card_values_caixa
            title="Entrada"
            value={saldoData?.entrada || 0}
            icon={RiseOutlined}
            color="text-bg-entrada"
          />
        </Col>
        <Col span={6} className="flex justify-center">
          <Card_values_caixa
            title="Saida"
            value={saldoData?.saida || 0}
            icon={FallOutlined}
            color="text-bg-saida"
          />
        </Col>
        <Col span={6} className="flex justify-center">
          <Card_values_caixa
            title="Saldo Total"
            value={saldoData?.["Saldo total"] || 0}
            icon={WalletOutlined}
            color="text-bg-saldo"
          />
        </Col>
      </Row>
      <Row className="py-6 flex justify-between">
        <Col span={6}>
          <Select_date data={selectedDate} onChange={handleDateChange} />
        </Col>
        <Col span={6}>
          <SelectBtn_lojas
            loja={selectedLoja}
            id={selectedIdLoja}
            onChange={handleLojaChange}
          />
        </Col>
        <Col span={12}>
          <Button
            icon={<SearchOutlined />}
            onClick={handleSubmit}
            type="primary"
          >
            Relatório
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="py-6">
          {alert && <div className="p-2">{<Alert_sucess type="warning" mensagem="Atenção" description={alert} />}</div>}
          <RelatorioCaixaTable data={tableData} />
        </Col>
      </Row>
    </div>
  );
}