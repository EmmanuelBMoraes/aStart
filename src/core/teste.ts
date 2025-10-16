import { CUSTO_TERRENO } from "./Constantes.ts";
import type { Grid } from "./types.ts";
import { Node } from "./Node.ts";
import { AStar } from "./AStar.ts";
import { Cavalo } from "./Cavalo.ts";
import seedrandom from "seedrandom";

const seed = Date.now();
console.log(`Seed: ${seed}`);
const rng = seedrandom(seed.toString());

function criarTabuleiro(rng: () => number): Grid {
  const tabuleiro: Grid = [];
  const tamanhoTabuleiro = 8;
  for (let y = 0; y < tamanhoTabuleiro; y++) {
    const linha: Node[] = [];
    for (let x = 0; x < tamanhoTabuleiro; x++) {
      const custoRng = rng();
      let custo = CUSTO_TERRENO.TERRA;
      if (custoRng < 0.05 && !(x === 0 && y === 0) && !(x === 7 && y === 7)) {
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

const tabuleiro = criarTabuleiro(rng);
const inicio = tabuleiro[0][0]; //passar como parametro
const fim = tabuleiro[7][7]; //passar como parametro
const cavalo = new Cavalo();
const aStar = new AStar(tabuleiro);
const aStar2 = new AStar(tabuleiro, "hB");

console.log("iniciando A* teste para o cavalo");
const { caminho, nosExpandidos } = aStar.encontrarCaminho(inicio, fim, cavalo);
const { caminho: caminho2, nosExpandidos: nosExpandidos2 } =
  aStar2.encontrarCaminho(inicio, fim, cavalo);

if (caminho) {
  console.log("Caminho encontrado:");
  const custoTotal = caminho[caminho.length - 1].g;
  console.log(`Custo total: ${custoTotal}, nós expandidos: ${nosExpandidos}`);
  const coordenadas = caminho.map((no) => `(${no.x}, ${no.y})`).join(" -> ");
  console.log(coordenadas);
} else {
  console.log("Caminho não encontrado.");
}
if (caminho2) {
  console.log("Caminho encontrado:");
  const custoTotal2 = caminho2[caminho2.length - 1].g;
  console.log(`Custo total: ${custoTotal2}, nós expandidos: ${nosExpandidos2}`);
  const coordenadas2 = caminho2.map((no) => `(${no.x}, ${no.y})`).join(" -> ");
  console.log(coordenadas2);
} else {
  console.log("Caminho não encontrado.");
}
