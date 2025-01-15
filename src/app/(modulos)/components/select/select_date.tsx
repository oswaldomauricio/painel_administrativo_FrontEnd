"use client";
import React from "react";
import { DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from 'dayjs';

interface DataProps {
  data: string;
  onChange: (value: string | string[]) => void; // Ajustado para aceitar string ou string[]
}

const dateFormat = "DD/MM/YYYY";

export default function SelectDate({ data, onChange }: DataProps) {
  const handleDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    onChange(dateString);
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        placeholder="Selecione a Data"
        format={dateFormat}
        onChange={handleDateChange}
        value={data ? dayjs(data, dateFormat) : null}
      />
    </Space>
  );
}