import type { Grid } from "./types";
import type { Node } from "./Node";

export interface Agente {
  getVizinhos(node: Node, grid: Grid): Node[];
}
