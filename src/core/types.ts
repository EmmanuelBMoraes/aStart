import type { Node } from "./Node";
export type Grid = Node[][];
export type Position = {
  x: number;
  y: number;
};
export type ResultadoAStar = {
  caminho: Node[] | null;
  nosExpandidos: number;
  closedList?: Position[];
};
