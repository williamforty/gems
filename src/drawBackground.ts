import { drawPath } from "./drawPath";

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 640, 512);

  gradient.addColorStop(0, "rgb(100, 100, 250)");
  gradient.addColorStop(0.5, "rgb(250, 100, 250)");
  gradient.addColorStop(1, "rgb(250, 100, 100)");

  ctx.fillStyle = gradient;
  drawPath(ctx, [
    [0, 0],
    [640, 0],
    [640, 512],
    [0, 512],
  ]);
};
