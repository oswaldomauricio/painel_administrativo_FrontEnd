"use client";
import React, { useEffect, useState } from "react";
import { Select } from "antd";

interface TipoProps {
  Tipo: string;
  onChange: (value: string) => void;
  resetTrigger?: number;
}

export default function Select_Tipo({
    Tipo,
  onChange,
  resetTrigger,
}: TipoProps) {
  const [TipoSelected, setTipoSelected] =
    useState<string>(Tipo);

  const handleChange = (value: string) => {
    setTipoSelected(value);
    onChange(value);
  };

  useEffect(() => {
    setTipoSelected("");
  }, [resetTrigger]);

  return (
    <div>
      <Select
        value={TipoSelected}
        placeholder="Tipo do documento"
        className="w-64"
        optionFilterProp="label"
        onChange={handleChange}
        options={[
          {
            value: "RECIBO",
            label: "RECIBO",
          },
          {
            value: "CF / NF",
            label: "CF / NF",
          },
          {
            value: "CTE",
            label: "CTE",
          },
          {
            value: "TN",
            label: "TN",
          },
          {
            label: "DEVOLUCAO",
            value: "DEVOLUCAO",
          },
        ]}
      />
    </div>
  );
}
