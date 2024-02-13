import { drawPath } from "./drawPath";
import { gridSize, squareSize } from "./game";
import { setrgb } from "./setrgb";

export const drawTiles = (ctx: CanvasRenderingContext2D) => {
  for (let x = 1; x <= gridSize; x++) {
    for (let y = 1; y <= gridSize; y++) {
      const px = x * squareSize + y * squareSize;
      const py = (y * squareSize) / 2 - (x * squareSize) / 2;

      ctx.fillStyle =
        (x + y) % 2 === 0 ? setrgb(100, 70, 50) : setrgb(100, 100, 100);
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
  }
};
