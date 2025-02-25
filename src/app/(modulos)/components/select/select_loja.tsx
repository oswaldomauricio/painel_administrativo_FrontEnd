"use client";
import React, { useState, useEffect } from "react";
import { Select, message } from "antd";

interface Store {
  id: number;
  id_users: number;
  loja: number;
}

interface ApiResponse {
  stores: Store[];
  user: {
    id: number;
    name: string;
    password: string;
    role: string;
  };
}

interface LojaProps {
  loja: string;
  id: string;
  onChange: (loja: string, id: string) => void;
}

const SelectBtn_lojas = ({ onChange }: LojaProps) => {
  const [options, setOptions] = useState<
    { value: number; label: number; id: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchLojas = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-lojas", {
        method: "POST",
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao buscar lojas");
      }

      const data: ApiResponse = await response.json();
      const lojas = data.stores
        .map((store) => ({
          value: store.loja, // Valor exibido no dropdown
          label: store.loja, // Rótulo exibido no dropdown
          id: store.id, // ID da loja
        }))
        .sort((a, b) => a.label - b.label);

      setOptions(lojas);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLojas();
  }, []);

  const handleChange = (value: number) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      onChange(String(selectedOption.label), String(selectedOption.id)); 
    }
  };

  return (
    <div>
      <Select
        className="w-64"
        placeholder={loading ? "Carregando lojas..." : "Selecione uma loja"}
        optionFilterProp="label"
        onChange={handleChange}
        loading={loading}
        options={options.map(({ value, label }) => ({ value, label }))}
      />
    </div>
  );
};

export default SelectBtn_lojas;
