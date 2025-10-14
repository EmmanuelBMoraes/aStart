import type { Agente } from "./Interfaces";
import type { Grid } from "./types";
import type { Node } from "./Node";

export class Cavalo implements Agente {
  public getVizinhos(node: Node, tabuleiro: Grid): Node[] {
    const vizinhos: Node[] = [];
    const { x, y } = node;
    const tamanhoTabuleiro = tabuleiro.length;
    const movimentos = [
      { dx: 1, dy: 2 },
      { dx: 1, dy: -2 },
      { dx: -1, dy: 2 },
      { dx: -1, dy: -2 },
      { dx: 2, dy: 1 },
      { dx: 2, dy: -1 },
      { dx: -2, dy: 1 },
      { dx: -2, dy: -1 },
    ];

    for (const movimento of movimentos) {
      const novoX = x + movimento.dx;
      const novoY = y + movimento.dy;

      if (
        novoX >= 0 &&
        novoX < tamanhoTabuleiro &&
        novoY >= 0 &&
        novoY < tamanhoTabuleiro
      ) {
        const vizinho = tabuleiro[novoY][novoX];
        if (vizinho.custoTerreno !== Infinity) {
          vizinhos.push(vizinho);
        }
      }
    }
    return vizinhos;
  }
}
