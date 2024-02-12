import { drawPath } from "./drawPath";

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 640, 512);

  gradient.addColorStop(0, "rgb(0, 0, 50)");
  gradient.addColorStop(0.5, "rgb(50, 0, 50)");
  gradient.addColorStop(1, "rgb(50, 0, 0)");

  ctx.fillStyle = gradient;
  drawPath(ctx, [
    [0, 0],
    [640, 0],
    [640, 512],
    [0, 512],
  ]);
};
