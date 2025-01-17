import { Alert } from "antd";

interface AlertProps {
    mensagem: string;
    description: string;
    type: "warning" | "error" | "success" | "info" | undefined
}

export function Alert_sucess({mensagem, description, type}: AlertProps){
    return (
        <Alert
        message={mensagem}
        description={description}
        type={type}
        showIcon
      />
    )
}