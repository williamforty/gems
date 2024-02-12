import { drawPath } from "./drawPath";
import { gridSize, squareSize } from "./game";
import { setrgb } from "./setrgb";

export const drawTiles = (
  ctx: CanvasRenderingContext2D,
  x: number[],
  y: number[]
) => {
  for (let n = 1; n <= gridSize * gridSize; n++) {
    const px = x[n] * squareSize + y[n] * squareSize;
    const py = (y[n] * squareSize) / 2 - (x[n] * squareSize) / 2;

    ctx.fillStyle =
      (x[n] + y[n]) % 2 === 0 ? setrgb(100, 70, 50) : setrgb(100, 100, 100);
    drawPath(ctx, [
      [px - squareSize, 256 + py],
      [px + squareSize, 256 + py],
      [px, 256 + py - squareSize / 2],
    ]);
    drawPath(ctx, [
      [px - squareSize, 256 + py],
      [px + squareSize, 256 + py],
      [px, 256 + py + squareSize / 2],
    ]);
  }
};
