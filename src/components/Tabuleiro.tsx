import React from "react";
import type { Grid, Position } from "../core/types";
import { Celula } from "./Celula";

interface TabuleiroProps {
  grid: Grid;
  revealedPath: Position[];
  startPos: Position;
  endPos: Position;
  currentHorsePosition: Position | null;
  closedList: Position[];
}

export const Tabuleiro: React.FC<TabuleiroProps> = ({
  grid,
  revealedPath,
  startPos,
  endPos,
  currentHorsePosition,
  closedList,
}) => {
  return (
    <div className="relative">
      <div className="grid grid-cols-8 border-2 border-gray-700 bg-gray-700 shadow-lg">
        {grid.map((linha, y) =>
          linha.map((node, x) => {
            const isPath = revealedPath.some(
              (pathNode) => pathNode.x === x && pathNode.y === y
            );
            const isStart = node.x === startPos.x && node.y === startPos.y;
            const isEnd = node.x === endPos.x && node.y === endPos.y;
            const isClosed = closedList.some(
              (closedNode) => closedNode.x === x && closedNode.y === y
            );

            return (
              <Celula
                key={`${y}-${x}`}
                node={node}
                isPath={isPath}
                isStart={isStart}
                isEnd={isEnd}
                isClosed={isClosed}
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
            className="w-full h-full z-auto"
          />
        </div>
      )}
    </div>
  );
};
