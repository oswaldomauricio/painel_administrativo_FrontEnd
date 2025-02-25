"use client";
import React from "react";
import { DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from 'dayjs';

interface DataProps {
  data: string;
  placeholder?: string;
  onChange: (value: string | string[]) => void;
}

const dateFormat = "DD/MM/YYYY";

export default function SelectDate({ data, placeholder, onChange }: DataProps) {
  const handleDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    onChange(dateString);
  };

  return (
    <Space direction="vertical" size={20}>
      <DatePicker
        placeholder={placeholder || "Selecione a Data"}
        format={dateFormat}
        onChange={handleDateChange}
        value={data ? dayjs(data, dateFormat) : null}
        className="w-[200px]"
      />
    </Space>
  );
}