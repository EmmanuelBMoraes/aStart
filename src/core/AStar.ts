import type { Grid } from "./types";
import type { Node } from "./Node";
import { CUSTO_TERRENO } from "./Constantes.ts";
import type { Agente } from "./Interfaces";

export class AStar {
  private grid: Grid;
  constructor(grid: Grid) {
    this.grid = grid;
  }

  private heuristica(nodeA: Node, nodeB: Node): number {
    const dx = Math.abs(nodeA.x - nodeB.x);
    const dy = Math.abs(nodeA.y - nodeB.y);
    const custoMinimo = CUSTO_TERRENO.ESTRADA;

    return (Math.max(dx, dy) / 3) * custoMinimo;
  }

  public encontrarCaminho(
    inicio: Node,
    fim: Node,
    objetivo: Agente
  ): Node[] | null {
    for (const linha of this.grid) {
      for (const no of linha) {
        no.g = 0;
        no.h = 0;
        no.f = 0;
        no.pai = null;
      }
    }
    const listaAberta: Node[] = [];
    const listaFechada: Set<String> = new Set();

    inicio.h = this.heuristica(inicio, fim);
    inicio.f = inicio.h;
    listaAberta.push(inicio);

    while (listaAberta.length > 0) {
      listaAberta.sort((a, b) => a.f - b.f);
      let noAtual = listaAberta.shift()!;
      if (noAtual.iguais(fim)) {
        let atual: Node | null = noAtual;
        const caminho: Node[] = [];
        while (atual !== null) {
          caminho.push(atual);
          atual = atual.pai;
        }
        return caminho.reverse();
      }
      listaFechada.add(`${noAtual.x},${noAtual.y}`);
      const vizinhos = objetivo.getVizinhos(noAtual, this.grid);
      for (const vizinho of vizinhos) {
        if (listaFechada.has(`${vizinho.x},${vizinho.y}`)) {
          continue;
        }

        const pontuacaoG = noAtual.g + vizinho.custoTerreno;
        const naListaAberta = listaAberta.find((n) => n.iguais(vizinho));

        if (pontuacaoG < vizinho.g || !naListaAberta) {
          vizinho.pai = noAtual;
          vizinho.g = pontuacaoG;
          vizinho.h = this.heuristica(vizinho, fim);
          vizinho.f = vizinho.g + vizinho.h;

          if (!naListaAberta) {
            listaAberta.push(vizinho);
          }
        }
      }
    }
    return null;
  }
}
