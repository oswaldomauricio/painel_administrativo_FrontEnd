"use client";
import React, { useEffect, useState } from "react";
import { Select } from "antd";

interface TipoOperacaoProps {
  TipoOperacao: string;
  onChange: (value: string) => void;
  resetTrigger?: number;
}

export default function Select_Tipo_Operacao({
  TipoOperacao,
  onChange,
  resetTrigger,
}: TipoOperacaoProps) {
  const [tipoOperacaoSelected, setTipoOperacaoSelected] =
    useState<string>(TipoOperacao);

  const handleChange = (value: string) => {
    setTipoOperacaoSelected(value);
    onChange(value);
  };

  useEffect(() => {
    setTipoOperacaoSelected("");
  }, [resetTrigger]);

  return (
    <div>
      <Select
        value={tipoOperacaoSelected}
        placeholder="Tipo de operação"
        className="w-64"
        optionFilterProp="label"
        onChange={handleChange}
        options={[
          {
            value: "ENTRADA",
            label: "ENTRADA",
          },
          {
            value: "SAIDA",
            label: "SAIDA",
          },
        ]}
      />
    </div>
  );
}
