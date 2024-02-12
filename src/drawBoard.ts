import { drawPath } from "./drawPath";
import { gridSize, squareSize } from "./game";

const width = 640;
const height = 512;
const midX = width / 2;
const midY = height / 2;
const boardThickness = 10;

export const drawBoard = (ctx: CanvasRenderingContext2D) => {
  // Set RGB color for vertex 1 of the first triangle
  const dx = gridSize * squareSize;
  drawTileEdge(ctx, "rgb(50, 40, 0)", midX, midY, dx);
  drawTileEdge(ctx, "rgb(70, 50, 0)", midX, midY, -dx);
};

const drawTileEdge = (
  ctx: CanvasRenderingContext2D,
  fillStyle: string,
  posX: number,
  posY: number,
  dx: number
) => {
  ctx.fillStyle = fillStyle;
  const dy = (gridSize * squareSize) / 2;
  drawPath(ctx, [
    [posX - dx, posY],
    [posX - dx, posY + boardThickness],
    [midX, midY + boardThickness + dy],
    [midX, midY + dy],
  ]);
};
