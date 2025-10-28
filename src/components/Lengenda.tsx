import React from "react";
import { CUSTO_TERRENO } from "../core/Constantes";

const LegendItem: React.FC<{
  label: string;
  colorClass: string;
  children?: React.ReactNode;
}> = ({ label, colorClass, children }) => (
  <div className="flex items-center gap-x-2">
    <div
      className={`w-6 h-6 border border-gray-400 flex items-center justify-center ${colorClass}`}
    >
      {children}
    </div>
    <span className="text-sm text-gray-200">{label}</span>
  </div>
);

export const Legenda: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-x-6 gap-y-2 p-3 rounded-lg bg-gray-900 bg-opacity-50 w-full max-w-5xl mb-5">
      <LegendItem
        label="Início"
        colorClass="bg-green-500 ring-2 ring-green-300 rounded-md"
      />
      <LegendItem
        label="Fim"
        colorClass="bg-red-600 ring-2 ring-red-300 rounded-md"
      />
      <LegendItem label="Caminho" colorClass="bg-yellow-400 rounded-md" />

      <LegendItem label="Estrada" colorClass="bg-slate-400 text-black">
        {CUSTO_TERRENO.ESTRADA}
      </LegendItem>
      <LegendItem label="Terra" colorClass="bg-amber-800">
        {CUSTO_TERRENO.TERRA}
      </LegendItem>
      <LegendItem label="Lama" colorClass="bg-stone-700">
        {CUSTO_TERRENO.LAMA}
      </LegendItem>
      <LegendItem label="Barreira" colorClass="bg-gray-900">
        {CUSTO_TERRENO.BARREIRA === Infinity ? "∞" : CUSTO_TERRENO.BARREIRA}
      </LegendItem>
    </div>
  );
};
