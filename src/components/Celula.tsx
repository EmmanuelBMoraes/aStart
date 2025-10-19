import React from "react";
import { CUSTO_TERRENO } from "../core/Constantes";
import type { Node } from "../core/Node";

interface CelulaProps {
  node: Node;
  isPath: boolean;
}

const TERRAIN_COLORS: { [key: number]: string } = {
  [CUSTO_TERRENO.TERRA]: "bg-amber-800",
  [CUSTO_TERRENO.ESTRADA]: "bg-slate-400",
  [CUSTO_TERRENO.LAMA]: "bg-stone-700",
  [CUSTO_TERRENO.BARREIRA]: "bg-gray-900",
};

export const Celula: React.FC<CelulaProps> = ({ node, isPath }) => {
  const terrainClass = TERRAIN_COLORS[node.custoTerreno] || "bg-white";
  const pathClass = isPath
    ? "bg-yellow-400 scale-110 shadow-lg rounded-md"
    : "";

  const cellClasses = `
    w-12 h-12 
    border border-slate-600 
    transition-all duration-300
    flex items-center justify-center
    ${pathClass || terrainClass}
  `;

  return <div className={cellClasses}>{node.g}</div>;
};
