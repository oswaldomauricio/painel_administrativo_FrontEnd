import { Breadcrumb } from "antd";

// Breadcrumb mapping
const breadcrumbMap: Record<string, string[]> = {
  financeiro: ["Financeiro"],
  caixa: ["Financeiro", "Caixa"],
  caixa2: ["Financeiro", "Caixa 2"],
};

// Define a props interface
interface HeaderComponentProps {
  current: string; // Current menu key to determine breadcrumbs
}

export default function BreadcrumbComponents({ current }: HeaderComponentProps) {
  return (
    <Breadcrumb style={{ margin: "12px 0" }}>
      {breadcrumbMap[current]?.map((breadcrumb, index) => (
        <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
