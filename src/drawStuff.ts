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
  z: number[]
) => {
  for (let y = 1; y <= gridSize; y++) {
    for (let x = gridSize; x >= 1; x--) {
      const NNNNNNN = (y - 1) * gridSize + x;
      let i;
      const c = 16384;

      i = 1;
      if ((c & 16384) === 16384 && x === cursorX && y === cursorY) {
        drawCursorBack(ctx, cursorX, cursorY);
        i = 1.3;
      }

      const px = (x + y) * squareSize;
      const py = ((y - x) * squareSize) / 2;

      if (z[NNNNNNN] === 10) {
        drawBlock(ctx, px, py, i);
      } else if (z[NNNNNNN] !== 0) {
        drawGem(ctx, z, NNNNNNN, py, px, i);
      }

      if ((c & 16384) === 16384 && x === targetCursorX && y === targetCursorY) {
        // drawing_target_cursors_front();
      }

      if (x === cursorX && y === cursorY) {
        drawCursorFront(ctx, cursorX, cursorY);
      }
    }
  }
};
