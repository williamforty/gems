import { drawPath } from "./drawPath";
import { squareSize } from "./game";
import { setrgb } from "./setrgb";

export const drawCursorBack = (
  ctx: CanvasRenderingContext2D,
  cursorX: number,
  cursorY: number
) => {
  // Drawing back of the cursor

  const px = cursorX * squareSize + cursorY * squareSize;
  const py = 256 + (cursorY * squareSize) / 2 - (cursorX * squareSize) / 2;

  ctx.fillStyle =
    (cursorX + cursorY) % 2 ? setrgb(160, 160, 160) : setrgb(160, 112, 80);

  drawPath(ctx, [
    [px - squareSize, py],
    [px, py - 0.5 * squareSize],
    [px + squareSize, py],
  ]);
  drawPath(ctx, [
    [px - squareSize, py],
    [px, py + 0.5 * squareSize],
    [px + squareSize, py],
  ]);

  ctx.strokeStyle = setrgb(0, 255, 255);
  drawPath(
    ctx,
    [
      [px - squareSize, py],
      [px, py - 0.5 * squareSize],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px, py - squareSize * 0.5],
      [px, py - squareSize * 1.9],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px + squareSize, py],
      [px, py - 0.5 * squareSize],
    ],
    false
  );
};

export const drawCursorFront = (
  ctx: CanvasRenderingContext2D,
  cursorX: number,
  cursorY: number
) => {
  const px = cursorX * squareSize + cursorY * squareSize;
  const py = 256 + (cursorY * squareSize) / 2 - (cursorX * squareSize) / 2;

  ctx.strokeStyle = setrgb(255, 255, 255);
  drawPath(
    ctx,
    [
      [px, py + squareSize * 0.5],
      [px, py - squareSize * 0.9],
    ],
    false
  );
  const left = px - squareSize;
  const right = px + squareSize;
  const top = py - squareSize * 1.4;
  const sqhalf = squareSize * 0.5;

  ctx.strokeStyle = setrgb(255, 255, 255);
  drawPath(
    ctx,
    [
      [px, py + sqhalf],
      [left, py],
      [left, top],
      [px, top - sqhalf],
      [right, top],
      [right, py],
      [px, py + sqhalf],
      [px, top + sqhalf],
      [right, top],
      [px, top + sqhalf],
      [left, top],
      [px, top + sqhalf],
    ],
    false
  );
};
