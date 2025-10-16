import { CUSTO_TERRENO } from "./Constantes.ts";
import type { Grid } from "./types.ts";
import { Node } from "./Node.ts";

export function criarTabuleiro(
  rng: () => number,
  inicio: Node,
  fim: Node
): Grid {
  const tabuleiro: Grid = [];
  const tamanhoTabuleiro = 8;
  for (let y = 0; y < tamanhoTabuleiro; y++) {
    const linha: Node[] = [];
    for (let x = 0; x < tamanhoTabuleiro; x++) {
      const custoRng = rng();
      let custo = CUSTO_TERRENO.TERRA;
      if (
        custoRng < 0.05 &&
        !(inicio.x === 0 && inicio.y === 0) &&
        !(fim.x === 7 && fim.y === 7)
      ) {
        custo = CUSTO_TERRENO.BARREIRA;
      } else if (custoRng < 0.2) {
        custo = CUSTO_TERRENO.LAMA;
      } else if (custoRng < 0.5) {
        custo = CUSTO_TERRENO.ESTRADA;
      }
      linha.push(new Node(x, y, custo));
    }
    tabuleiro.push(linha);
  }
  return tabuleiro;
}
