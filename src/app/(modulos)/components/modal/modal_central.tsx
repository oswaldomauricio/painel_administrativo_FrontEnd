import { Button, Modal, Space, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { RelatorioResponse } from "../../types/CaixaTypes";

interface ModalCentralProps {
    id: number;
    role: string;
  }
  
  export function Modal_Central({ id, role }: ModalCentralProps) {
    const { confirm } = Modal;
  
    const handleSubmit = async () => {
      const payload = { id, role }; // Use o ID recebido aqui
  
      try {
        const response = await fetch("/api/relatorio", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        const data: RelatorioResponse = await response.json();
        if (response.ok && data.status === 200) {
          console.log(response);
          message.success("Registro excluído com sucesso!");
        } else if (response.status == 403) {
          console.log("Não é possivel excluir registros antigos, solicite a exclusão para quem faz a conferência do seu caixa!", response.status);
          message.error(
            "Não é possivel excluir registros antigos, solicite a exclusão para quem faz a conferência do seu caixa!"
          );
        } else{
          console.log("Erro ao excluir, tente novamente ou entre em contato com o T.I.", response.status);
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
        title: "Você tem certeza que deseja deletar o valor?",
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
  
