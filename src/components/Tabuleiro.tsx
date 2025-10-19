import React, { useState, useEffect } from "react";
import seedrandom from "seedrandom";

import { criarTabuleiro } from "../core/Tabuleiro";
import type { Grid } from "../core/types";
import { Node } from "../core/Node";
import { AStar } from "../core/AStar";
import { Cavalo } from "../core/Cavalo";
import { Celula } from "./Celula";

export const Tabuleiro: React.FC = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const [seed, setSeed] = useState<number>(Date.now());
  const [revealedPath, setRevealedPath] = useState<Node[]>([]);
  const [currentHorsePosition, setCurrentHorsePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationPath, setAnimationPath] = useState<Node[] | null>(null);

  const handleGenerateBoard = () => {
    const newSeed = Date.now();
    setSeed(newSeed);
    setRevealedPath([]);
    setCurrentHorsePosition(null);
    setIsAnimating(false);
    setAnimationPath(null);
    const rng = seedrandom(newSeed.toString());
    const inicio = new Node(0, 0, 0);
    const fim = new Node(7, 7, 0);
    const newGrid = criarTabuleiro(rng, inicio, fim);
    setGrid(newGrid);
  };

  const handleFindPath = () => {
    if (!grid.length || isAnimating) return;

    const inicio = grid[0][0];
    const fim = grid[7][7];
    const cavalo = new Cavalo();
    const aStar = new AStar(grid);
    const resultado = aStar.encontrarCaminho(inicio, fim, cavalo);

    console.log(`Busca finalizada. Nós expandidos: ${resultado.nosExpandidos}`);
    setRevealedPath([]);

    if (resultado.caminho && resultado.caminho.length > 0) {
      setAnimationPath(resultado.caminho);
    } else {
      setCurrentHorsePosition(null);
    }
  };

  useEffect(() => {
    handleGenerateBoard();
  }, []);

  useEffect(() => {
    if (!animationPath || animationPath.length === 0) return;

    setIsAnimating(true);
    let currentIndex = 0;
    const intervalTime = 400;

    const moveHorse = () => {
      if (currentIndex >= animationPath.length) {
        setIsAnimating(false);
        clearInterval(intervalId);
        return;
      }
      const nextNode = animationPath[currentIndex];
      setCurrentHorsePosition({ x: nextNode.x, y: nextNode.y });
      setRevealedPath((prev) => [...prev, nextNode]);
      currentIndex++;
    };

    const intervalId = setInterval(moveHorse, intervalTime);

    return () => clearInterval(intervalId);
  }, [animationPath]);

  return (
    <div className="flex flex-col items-center gap-y-5 p-4">
      <div className="flex items-center gap-x-4 p-2 bg-gray-100 rounded-lg shadow">
        <button
          onClick={handleGenerateBoard}
          disabled={isAnimating}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          Gerar Novo Tabuleiro
        </button>
        <button
          onClick={handleFindPath}
          disabled={isAnimating}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
        >
          Encontrar Caminho
        </button>
        <p className="font-mono text-sm bg-gray-200 text-gray-800 p-2 rounded-md">
          Seed: {seed}
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-8 border-2 border-gray-700 bg-gray-700 shadow-lg">
          {grid.map((linha, y) =>
            linha.map((node, x) => {
              const isPath = revealedPath.some(
                (pathNode) => pathNode.x === x && pathNode.y === y
              );
              return (
                <Celula
                  key={`${y}-${x}`}
                  node={node}
                  isPath={isPath || false}
                />
              );
            })
          )}
        </div>
        {currentHorsePosition && (
          <div
            className="absolute top-0 left-0 transition-transform duration-300 ease-linear pointer-events-none"
            style={{
              transform: `translate(calc(${currentHorsePosition.x} * 100%), calc(${currentHorsePosition.y} * 100%))`,
              width: "48px",
              height: "48px",
            }}
          >
            <img
              src="/cavalo.png"
              alt="Peça de Cavalo"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};
