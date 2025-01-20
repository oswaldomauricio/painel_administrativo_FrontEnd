import { Button, Modal, Space, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { RelatorioResponse } from "../../types/CaixaTypes";

interface ModalCentralProps {
    id: number;
  }
  
  export function Modal_Central({ id }: ModalCentralProps) {
    const { confirm } = Modal;
  
    const handleSubmit = async () => {
      const payload = { id }; // Use o ID recebido aqui
  
      try {
        const response = await fetch("/api/relatorio", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        const data: RelatorioResponse = await response.json();
        if (response.ok && data.status === 200) {
          console.log("Excluído com sucesso");
          message.success("Registro excluído com sucesso!");
        } else {
          console.log("Erro ao excluir, tente novamente ou entre em contato com o T.I.");
          message.error(
            "Erro ao excluir, tente novamente ou entre em contato com o T.I."
          );
        }
      } catch (error) {
        console.error("Erro ao excluir:", error);
        message.error("Erro desconhecido, tente novamente."); 
      }
    };
  
    const showDeleteConfirm = () => {
      confirm({
        title: "Você tem certeza que deseja cancelar o valor?",
        icon: <ExclamationCircleFilled />,
        content: "Clique em deletar caso sim!",
        okText: "Deletar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          handleSubmit();
        },
        onCancel() {
          console.log("Cancelado");
        },
      });
    };
  
    return (
      <Space wrap>
        <Button
          onClick={showDeleteConfirm}
          type="default"
          style={{ backgroundColor: "red", color: "white" }}
        >
          <DeleteOutlined />
        </Button>
      </Space>
    );
  }
  
