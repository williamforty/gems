import { drawPath } from "./drawPath";
import { squareSize } from "./game";
import { setrgb } from "./setrgb";

export const drawBlock = (
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  i: number
) => {
  ctx.fillStyle = setrgb(80 * i, 80 * i, 80 * i);
  drawPath(ctx, [
    [px - squareSize, 256 + py - squareSize * 0.5],
    [px, 256 + py],
    [px + squareSize, 256 + py - squareSize * 0.5],
    [px, 256 + py - squareSize],
  ]);
  ctx.fillStyle = setrgb(50 * i, 50 * i, 50 * i);
  drawPath(ctx, [
    [px, 256 + py + squareSize * 0.5],
    [px - squareSize, 256 + py],
    [px - squareSize, 256 + py - squareSize * 0.5],
    [px, 256 + py],
  ]);
  ctx.fillStyle = setrgb(60 * i, 60 * i, 60 * i);
  drawPath(ctx, [
    [px, 256 + py + squareSize * 0.5],
    [px + squareSize, 256 + py],
    [px + squareSize, 256 + py - squareSize * 0.5],
    [px, 256 + py],
  ]);
};
