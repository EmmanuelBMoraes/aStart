import React from "react";
import { CUSTO_TERRENO } from "../core/Constantes";
import type { Node } from "../core/Node";

interface CelulaProps {
  node: Node;
  isPath: boolean;
  isStart: boolean;
  isEnd: boolean;
}

const TERRAIN_COLORS: { [key: number]: string } = {
  [CUSTO_TERRENO.TERRA]: "bg-amber-800",
  [CUSTO_TERRENO.ESTRADA]: "bg-slate-400",
  [CUSTO_TERRENO.LAMA]: "bg-stone-700",
  [CUSTO_TERRENO.BARREIRA]: "bg-gray-900",
};

export const Celula: React.FC<CelulaProps> = ({
  node,
  isPath,
  isStart,
  isEnd,
}) => {
  let visualClass = TERRAIN_COLORS[node.custoTerreno] || "bg-white";

  if (isPath) {
    visualClass = "bg-yellow-400 scale-110 shadow-lg rounded-md";
  }

  if (isStart) {
    visualClass = "bg-green-500 ring-2 ring-green-300 rounded-md";
  }
  if (isEnd) {
    visualClass = "bg-red-600 ring-2 ring-red-300 rounded-md";
  }

  const cellClasses = `
    w-12 h-12 
    border border-slate-600 
    transition-all duration-300
    flex items-center justify-center text-white font-bold
    ${visualClass}
  `;

  return (
    <div className={cellClasses}>
      {isStart}
      {node.g}
      {isEnd}
    </div>
  );
};
