"use client";
import React, { useEffect, useState } from "react";
import { Input } from "antd";

interface SelectInputTextProps {
  wSize?: string;
  title?: string; 
  text: string;
  onChange: (value: string) => void;
  resetTrigger?: number; 
}

const { TextArea } = Input;

export default function Select_input_text({
  title = "Texto",
  text,
  onChange,
  resetTrigger,
}: SelectInputTextProps) {
  const [value, setValue] = useState<string>(text);

  useEffect(() => {
    setValue(""); 
  }, [resetTrigger]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <TextArea
        style={{ maxWidth: "800px" }}
        placeholder={title}
        autoSize={{ minRows: 1, maxRows: 2 }}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
