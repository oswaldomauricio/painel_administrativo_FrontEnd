import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { CaixaItem } from "../../types/CaixaTypes"; // Importa a interface existente

interface RelatorioCaixaTableProps {
  data: (CaixaItem & { key: number })[]; // Adiciona a propriedade `key` aos dados
}

const columns: TableColumnsType<CaixaItem & { key: number }> = [
  {
    title: "Data",
    dataIndex: "data",
    align: "center",
  },
  {
    title: "Número Documento",
    dataIndex: "num_doc",
    align: "center",
    render: (text: string) => {
      return <span className="flex justify-center">{text}</span>;
    },
  },
  {
    title: "Tipo Operação",
    dataIndex: "tipo_operacao",
    align: "center",
    filters: [
      {
        text: "ENTRADA",
        value: "ENTRADA",
      },
      {
        text: "SAIDA",
        value: "SAIDA",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) =>
      record.tipo_operacao.startsWith(value as string),
    width: "30%",
    render: (text: string) => {
      // Define o estilo de fundo com base no tipo de operação
      const backgroundColor = text === "ENTRADA" ? "#C0F2A0" : "#F2ADA0";
      return (
        <span
          style={{
            backgroundColor,
            fontWeight: "bold",
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
            width: `100px`,
          }}
        >
          {text}
        </span>
      );
    },
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

export default function RelatorioCaixaTable({
  data,
}: RelatorioCaixaTableProps) {
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
