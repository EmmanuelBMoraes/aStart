import React, { useState, useEffect } from "react";
import seedrandom from "seedrandom";
import { Tabuleiro } from "./components/Tabuleiro";

import { criarTabuleiro } from "./core/Tabuleiro";
import { AStar } from "./core/AStar";
import { Cavalo } from "./core/Cavalo";
import { Node } from "./core/Node";
import { CUSTO_TERRENO } from "./core/Constantes";
import type { Grid, Position, ResultadoAStar } from "./core/types";
import { Legenda } from "./components/Lengenda";

const App: React.FC = () => {
  const [seed, setSeed] = useState<number>(Date.now());
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState<Position>({ x: 7, y: 7 });
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [grid1, setGrid1] = useState<Grid>([]);
  const [revealedPath1, setRevealedPath1] = useState<Position[]>([]);
  const [currentHorsePosition1, setCurrentHorsePosition1] =
    useState<Position | null>(null);
  const [animationPath1, setAnimationPath1] = useState<Node[] | null>(null);
  const [closedList1, setClosedList1] = useState<Position[]>([]);
  const [searchResult1, setSearchResult1] = useState<ResultadoAStar | null>(
    null
  );

  const [grid2, setGrid2] = useState<Grid>([]);
  const [revealedPath2, setRevealedPath2] = useState<Position[]>([]);
  const [currentHorsePosition2, setCurrentHorsePosition2] =
    useState<Position | null>(null);
  const [animationPath2, setAnimationPath2] = useState<Node[] | null>(null);
  const [closedList2, setClosedList2] = useState<Position[]>([]);
  const [searchResult2, setSearchResult2] = useState<ResultadoAStar | null>(
    null
  );

  const [resultado1, setResultado1] = useState<number>(0);
  const [resultado2, setResultado2] = useState<number>(0);

  const handleGenerateBoard = () => {
    const newSeed = Date.now();
    setSeed(newSeed);
    setRevealedPath1([]);
    setCurrentHorsePosition1(null);
    setAnimationPath1(null);
    setRevealedPath2([]);
    setCurrentHorsePosition2(null);
    setAnimationPath2(null);
    setIsAnimating(false);
    setResultado1(0);
    setResultado2(0);
    setClosedList1([]);
    setClosedList2([]);
    setSearchResult1(null);
    setSearchResult2(null);

    const rng1 = seedrandom(newSeed.toString());
    const rng2 = seedrandom(newSeed.toString());

    const inicioNode = new Node(startPos.x, startPos.y, 1);
    const fimNode = new Node(endPos.x, endPos.y, 1);

    setGrid1(criarTabuleiro(rng1, inicioNode, fimNode));
    setGrid2(criarTabuleiro(rng2, inicioNode, fimNode));
  };

  const handleFindPath = () => {
    setResultado1(0);
    setResultado2(0);
    setIsAnimating(true);
    if (!grid1.length || !grid2.length || isAnimating) return;

    const inicio1 = grid1[startPos.y][startPos.x];
    const fim1 = grid1[endPos.y][endPos.x];
    if (
      inicio1.custoTerreno === CUSTO_TERRENO.BARREIRA ||
      fim1.custoTerreno === CUSTO_TERRENO.BARREIRA
    ) {
      alert("O ponto de início ou fim não pode ser uma barreira!");
      setIsAnimating(false);
      return;
    }

    const cavalo = new Cavalo();
    setRevealedPath1([]);
    setRevealedPath2([]);
    setClosedList1([]);
    setClosedList2([]);

    const aStar1 = new AStar(grid1);
    const resultado1: ResultadoAStar = aStar1.encontrarCaminho(
      inicio1,
      fim1,
      cavalo
    );
    setResultado1(resultado1.nosExpandidos);
    setSearchResult1(resultado1);
    if (resultado1.caminho) setAnimationPath1(resultado1.caminho);

    const inicio2 = grid2[startPos.y][startPos.x];
    const fim2 = grid2[endPos.y][endPos.x];
    const aStar2 = new AStar(grid2, "hB");
    const resultado2: ResultadoAStar = aStar2.encontrarCaminho(
      inicio2,
      fim2,
      cavalo
    );
    setResultado2(resultado2.nosExpandidos);
    setSearchResult2(resultado2);
    if (resultado2.caminho) setAnimationPath2(resultado2.caminho);
  };

  const handlePosChange = (
    posType: "start" | "end",
    axis: "x" | "y",
    value: string
  ) => {
    let val = parseInt(value, 10);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 7) val = 7;
    const setter = posType === "start" ? setStartPos : setEndPos;
    setter((prev) => ({ ...prev, [axis]: val }));
  };

  useEffect(() => {
    handleGenerateBoard();
  }, []);

  const runAnimation = (
    path: Node[] | null,
    setHorsePos: Function,
    setRevealed: Function,
    onComplete: () => void
  ) => {
    if (!path) {
      setIsAnimating(false);
      onComplete();
      return;
    }

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= path.length) {
        clearInterval(intervalId);
        setIsAnimating(false);
        onComplete();
        return;
      }
      const nextNode = path[i];
      setHorsePos({ x: nextNode.x, y: nextNode.y });
      setRevealed((prev: Position[]) => [...prev, nextNode]);
      i++;
    }, 400);
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    return runAnimation(
      animationPath1,
      setCurrentHorsePosition1,
      setRevealedPath1,
      () => {
        if (searchResult1) {
          setClosedList1(searchResult1.closedList ?? []);
        }
      }
    );
  }, [animationPath1]);

  useEffect(() => {
    return runAnimation(
      animationPath2,
      setCurrentHorsePosition2,
      setRevealedPath2,
      () => {
        if (searchResult2) {
          setClosedList2(searchResult2.closedList ?? []);
        }
      }
    );
  }, [animationPath2]);

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center text-white p-4 pt-5">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Comparador de Heurísticas A*</h1>
      </header>

      <div className="flex items-center justify-center gap-x-4 p-2 bg-gray-100 rounded-lg shadow w-full max-w-5xl flex-wrap mb-5">
        <button
          onClick={handleGenerateBoard}
          disabled={isAnimating}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-gray-400"
        >
          Gerar Tabuleiros
        </button>
        <button
          onClick={handleFindPath}
          disabled={isAnimating}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-gray-400"
        >
          Encontrar Caminhos
        </button>
        <p className="font-mono text-sm bg-gray-200 text-gray-800 p-2 rounded-md">
          Seed: {seed}
        </p>
        <div className="flex gap-x-3 items-center">
          <label className="text-sm font-medium text-gray-700">Início:</label>
          <input
            type="number"
            value={startPos.x}
            onChange={(e) => handlePosChange("start", "x", e.target.value)}
            className="w-14 p-1 text-center border rounded-md text-gray-900 disabled:bg-gray-200"
            disabled={isAnimating}
          />
          <input
            type="number"
            value={startPos.y}
            onChange={(e) => handlePosChange("start", "y", e.target.value)}
            className="w-14 p-1 text-center border rounded-md text-gray-900 disabled:bg-gray-200"
            disabled={isAnimating}
          />
        </div>
        <div className="flex gap-x-3 items-center">
          <label className="text-sm font-medium text-gray-700">Fim:</label>
          <input
            type="number"
            value={endPos.x}
            onChange={(e) => handlePosChange("end", "x", e.target.value)}
            className="w-14 p-1 text-center border rounded-md text-gray-900 disabled:bg-gray-200"
            disabled={isAnimating}
          />
          <input
            type="number"
            value={endPos.y}
            onChange={(e) => handlePosChange("end", "y", e.target.value)}
            className="w-14 p-1 text-center border rounded-md text-gray-900 disabled:bg-gray-200"
            disabled={isAnimating}
          />
        </div>
      </div>
      <Legenda />
      <main className="flex flex-row items-start gap-x-10">
        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-2xl font-semibold">Heurística Fraca</h2>
          {resultado1 !== 0 && !isAnimating && (
            <p className="mb-2">
              Nós expandidos: {resultado1} e custo total:{" "}
              {animationPath1
                ? animationPath1[animationPath1?.length - 1].g.toFixed(1)
                : 0}
            </p>
          )}
          <Tabuleiro
            grid={grid1}
            revealedPath={revealedPath1}
            startPos={startPos}
            endPos={endPos}
            currentHorsePosition={currentHorsePosition1}
            closedList={closedList1}
          />
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-2xl font-semibold">Heurística Forte</h2>
          {resultado1 !== 0 && !isAnimating && (
            <p className="mb-2">
              Nós expandidos: {resultado2} e custo total:{" "}
              {animationPath2
                ? animationPath2[animationPath2?.length - 1].g.toFixed(1)
                : 0}
            </p>
          )}
          <Tabuleiro
            grid={grid2}
            revealedPath={revealedPath2}
            startPos={startPos}
            endPos={endPos}
            currentHorsePosition={currentHorsePosition2}
            closedList={closedList2}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
