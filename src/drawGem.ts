import { drawPath } from "./drawPath";
import { squareSize } from "./game";
import { setrgb } from "./setrgb";

export const drawGem = (
  ctx: CanvasRenderingContext2D,
  z: number[],
  n: number,
  py: number,
  px: number,
  i: number
) => {
  const gemColors = [
    { r: 0, g: 0, b: 0, ri: 0, gi: 0, bi: 0 },
    { r: 5, g: 5, b: 5, ri: 2.2, gi: 2.2, bi: 2.2 },
    { r: 20, g: 4, b: 4, ri: 1, gi: 2.2, bi: 2.2 },
    { r: 5, g: 20, b: 4, ri: 2.2, gi: 1, bi: 2.2 },
    { r: 4, g: 4, b: 20, ri: 2.2, gi: 2.2, bi: 1 },
    { r: 20, g: 20, b: 4, ri: 1, gi: 1, bi: 2.2 },
  ];

  const gem = gemColors[z[n]];

  ctx.fillStyle = setrgb(gem.r * 7 * i, gem.g * 7 * i, gem.b * 7 * i);
  drawPath(ctx, [
    [px - squareSize * 0.4, 256 + py - squareSize * 0.8],
    [px, 256 + py - squareSize * 0.6],
    [px + squareSize * 0.4, 256 + py - squareSize * 0.8],
    [px, 256 + py - squareSize * 1],
  ]);

  ctx.fillStyle = setrgb(gem.r * 6 * i, gem.g * 6 * i, gem.b * 6 * i);
  drawPath(ctx, [
    [px, 256 + py],
    [px + squareSize * 0.6, 256 + py - squareSize * 0.6],
    [px, 256 + py - squareSize * 0.3],
  ]);

  ctx.fillStyle = setrgb(gem.r * 4 * i, gem.g * 4 * i, gem.b * 4 * i);
  drawPath(ctx, [
    [px - squareSize * 0.6, 256 + py - squareSize * 0.6],
    [px, 256 + py],
    [px, 256 + py - squareSize * 0.3],
  ]);

  ctx.fillStyle = setrgb(
    gem.r * gem.ri * 8 * i,
    gem.g * gem.gi * 8 * i,
    gem.b * gem.bi * 8 * i
  );
  drawPath(ctx, [
    [px, 256 + py - squareSize * 0.3],
    [px + squareSize * 0.6, 256 + py - squareSize * 0.6],
    [px + squareSize * 0.4, 256 + py - squareSize * 0.8],
    [px, 256 + py - squareSize * 0.6],
  ]);

  ctx.fillStyle = setrgb(gem.r * 6 * i, gem.g * 6 * i, gem.b * 6 * i);
  drawPath(ctx, [
    [px, 256 + py - squareSize * 0.3],
    [px - squareSize * 0.6, 256 + py - squareSize * 0.6],
    [px - squareSize * 0.4, 256 + py - squareSize * 0.8],
    [px, 256 + py - squareSize * 0.6],
  ]);
};
