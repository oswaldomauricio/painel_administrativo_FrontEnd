"use client";

import { Table, Empty, Spin } from "antd";
import type { TableColumnsType } from "antd";
import { CaixaItem } from "../../types/CaixaTypes";
import { Modal_Central } from "../modal/modal_central";
import { useSession } from "next-auth/react";

interface RelatorioCaixaTableProps {
  data: (CaixaItem & { key: number })[];
  loading: boolean;
}

export default function RelatorioCaixaTable({
  data, loading
}: RelatorioCaixaTableProps) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role || "";

  if (status === "loading") {
    return (
      <div className="items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const columns: TableColumnsType<CaixaItem & { key: number }> = [
    {
      title: "Ações",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (_, record) => <Modal_Central id={record.id} role={userRole} />,
    },
    {
      title: "Data",
      dataIndex: "data",
      align: "center",
    },
    {
      title: "Número Documento",
      dataIndex: "num_doc",
      align: "center",
      render: (text: string) => (
        <span className="flex justify-center">{text}</span>
      ),
    },
    {
      title: "Tipo Operação",
      dataIndex: "tipo_operacao",
      align: "center",
      filters: [
        { text: "ENTRADA", value: "ENTRADA" },
        { text: "SAIDA", value: "SAIDA" },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        record.tipo_operacao.startsWith(value as string),
      width: "30%",
      render: (text: string) => {
        const backgroundColor = text === "ENTRADA" ? "#C0F2A0" : "#F2ADA0";
        return (
          <span
            style={{
              backgroundColor,
              fontWeight: "bold",
              padding: "4px 8px",
              borderRadius: "4px",
              display: "inline-block",
              width: "100px",
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Tipo do documento",
      dataIndex: "tipo",
      align: "center",
      filters: [
        { text: "RECIBO", value: "RECIBO" },
        { text: "CF / NF", value: "CF / NF" },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        !!record.tipo && record.tipo.startsWith(value as string),
      width: "20%",
      render: (text: string) => (
        <span
          style={{
            fontWeight: "bold",
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Valor",
      dataIndex: "valor",
      align: "center",
      render: (text: string) => {
        const formattedValue = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(parseFloat(text));

        return (
          <span className="flex justify-center font-semibold">
            {formattedValue}
          </span>
        );
      },
      sorter: {
        compare: (a, b) => parseFloat(a.valor) - parseFloat(b.valor),
        multiple: 5,
      },
    },
    {
      title: "Origem",
      dataIndex: "origem",
      width: 500,
      align: "center",
      render: (text: string) => (
        <div className="truncate max-w-[450px]" title={text}>
          {text}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={loading}
      locale={{
        emptyText: loading ? <Spin size="large" /> : <Empty description="Não há dados!" />,
      }}
    />
  );
}
