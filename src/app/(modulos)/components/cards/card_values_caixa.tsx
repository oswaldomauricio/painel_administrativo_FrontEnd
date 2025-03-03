import { type ComponentType } from 'react';

interface CardValuesProps {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>; 
  color: string; 
}


export function Card_values_caixa({ title, value, icon: Icon, color }: CardValuesProps) {
  return (
    <div className="bg-sidebar_main rounded-[35px] p-8 w-[300px] shadow-lg">
      <div className="flex flex-row items-center justify-center">
        <div className="bg-sidebar_main rounded-lg p-3 w-fit shadow-xl">
          <Icon className="text-white text-3xl" />
        </div>
        <div className={`${color}`}>
          <p className="text-2xl mb-2">{title}</p>
          <p className="text-4xl font-semibold">
            <span className="text-3xl">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(value)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}