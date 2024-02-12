import { drawBlock } from "./drawBlock";
import { drawCursorBack, drawCursorFront } from "./drawCursor";
import { drawGem } from "./drawGem";
import { gridSize, squareSize } from "./game";

export const drawStuff = (
  ctx: CanvasRenderingContext2D,
  cursorX: number,
  cursorY: number,
  targetCursorX: number,
  targetCursorY: number,
  x: number[],
  y: number[],
  z: number[]
) => {
  // Drawing the items
  for (let n = 1; n <= gridSize * gridSize; n++) {
    let i;

    const c = 16384;

    if ((c & 16384) === 16384 && x[n] === cursorX && y[n] === cursorY) {
      drawCursorBack(ctx, cursorX, cursorY);
      i = 1.3;
    } else if (n === cursorY * gridSize - cursorX + 1) {
      // drawCursorBack(ctx);
      i = 1.3;
    } else {
      i = 1;
    }

    const px = (x[n] + y[n]) * squareSize;
    const py = ((y[n] - x[n]) * squareSize) / 2;

    if (z[n] === 10) {
      drawBlock(ctx, px, py, i);
    } else if (z[n] !== 0) {
      drawGem(ctx, z, n, py, px, i);
    }

    if (
      (c & 16384) === 16384 &&
      n === targetCursorY * gridSize - targetCursorX + 1
    ) {
      // drawing_target_cursors_front();
    }

    if (x[n] === cursorX && y[n] === cursorY) {
      drawCursorFront(ctx, cursorX, cursorY);
    }
  }
};
