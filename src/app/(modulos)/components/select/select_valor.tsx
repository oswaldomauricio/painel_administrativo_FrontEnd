"use client";
import React from "react";
import type { InputNumberProps } from 'antd';
import { InputNumber } from "antd";

interface ValorCaixaProps {
  valor: number;
  onChange: (value: number) => void;
}

export default function SelectValor({ valor, onChange }: ValorCaixaProps) {
  const handleValueChange: InputNumberProps["onChange"] = (value) => {
    if (value !== null) {
      onChange(value as number);
    }
  };

  return (
    <div className="w-[300px]">
      <InputNumber<number>
        value={valor}
        formatter={(value) =>
          `R$ ${value}`
            .replace(/\./g, ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }
        parser={(value) =>
          value?.replace(/[R$\s.]/g, '')
            .replace(',', '.') as unknown as number
        }
        onChange={handleValueChange}
      />
    </div>
  );
}