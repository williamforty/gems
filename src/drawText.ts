export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
) => {
  // Draw text
  ctx.fillStyle = "#ffffff";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
};
