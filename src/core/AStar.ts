import type { Grid, Position, ResultadoAStar } from "./types";
import type { Node } from "./Node";
import { CUSTO_TERRENO } from "./Constantes";
import type { Agente } from "./Interfaces";

export class AStar {
  private grid: Grid;
  private heuristicaEscolhida: (nodeA: Node, nodeB: Node) => number;
  constructor(grid: Grid, heuristica: "hA" | "hB" = "hA") {
    this.grid = grid;
    this.heuristicaEscolhida =
      heuristica === "hA" ? this.heuristicaA : this.heuristicaB;
  }

  private heuristicaA(nodeA: Node, nodeB: Node): number {
    const dx = Math.abs(nodeA.x - nodeB.x);
    const dy = Math.abs(nodeA.y - nodeB.y);
    const custoMinimo = CUSTO_TERRENO.ESTRADA;

    return (Math.max(dx, dy) / 3) * custoMinimo;
  }

  //será a heuristica B, mais forte
  private heuristicaB(nodeA: Node, nodeB: Node): number {
    const dx = Math.abs(nodeA.x - nodeB.x);
    const dy = Math.abs(nodeA.y - nodeB.y);

    const est1 = Math.ceil(dx / 2);
    const est2 = Math.ceil(dy / 2);
    const est3 = Math.ceil((dx + dy) / 3);
    const movimentosMinimos = Math.max(est1, est2, est3);

    const custoMinimo = CUSTO_TERRENO.ESTRADA;

    return movimentosMinimos * custoMinimo;
  }
  public encontrarCaminho(
    inicio: Node,
    fim: Node,
    peca: Agente
  ): ResultadoAStar {
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

    inicio.h = this.heuristicaEscolhida(inicio, fim);
    inicio.f = inicio.h;
    listaAberta.push(inicio);
    let nosExpandidos = 0;

    while (listaAberta.length > 0) {
      listaAberta.sort((a, b) => a.f - b.f);
      let noAtual = listaAberta.shift()!;
      nosExpandidos++;
      if (noAtual.iguais(fim)) {
        let atual: Node | null = noAtual;
        const caminho: Node[] = [];
        while (atual !== null) {
          caminho.push(atual);
          atual = atual.pai;
        }
        const closedListArray: Position[] = Array.from(listaFechada).map(
          (s) => {
            const [x, y] = s.split(",");
            return { x: parseInt(x), y: parseInt(y) };
          }
        );
        return {
          caminho: caminho.reverse(),
          nosExpandidos,
          closedList: closedListArray,
        };
      }
      listaFechada.add(`${noAtual.x},${noAtual.y}`);
      const vizinhos = peca.getVizinhos(noAtual, this.grid);
      for (const vizinho of vizinhos) {
        if (listaFechada.has(`${vizinho.x},${vizinho.y}`)) {
          continue;
        }

        const pontuacaoG = noAtual.g + vizinho.custoTerreno;
        const naListaAberta = listaAberta.find((n) => n.iguais(vizinho));

        if (pontuacaoG < vizinho.g || !naListaAberta) {
          vizinho.pai = noAtual;
          vizinho.g = pontuacaoG;
          vizinho.h = this.heuristicaEscolhida(vizinho, fim);
          vizinho.f = vizinho.g + vizinho.h;

          if (!naListaAberta) {
            listaAberta.push(vizinho);
          }
        }
      }
    }
    const closedListArray: Position[] = Array.from(listaFechada).map((s) => {
      const [x, y] = s.split(",");
      return { x: parseInt(x), y: parseInt(y) };
    });
    return { caminho: null, nosExpandidos, closedList: closedListArray };
  }
}
