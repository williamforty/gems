const width = 640;
const height = 512;
const midX = width / 2;
const midY = height / 2;
const gridSize = 9;
const squareSize = 320 / (gridSize + 1);
const boardThickness = 10;
const cursorX = 0;
const cursorY = 0;
const targetCursorX = 0;
const targetCursorY = 0;
const c = 0;

// Game number
const game = 510256994;

const x: number[] = [];
const y: number[] = [];
const z: number[] = [];

const drawPath = (
  ctx: CanvasRenderingContext2D,
  coords: number[],
  fill: boolean = true
) => {
  ctx.beginPath();
  let x = coords.shift() || 0;
  let y = coords.shift() || 0;
  ctx.moveTo(x, y);
  while (coords.length) {
    x = coords.shift() || 0;
    y = coords.shift() || 0;
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  if (fill) ctx.fill();
};

const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 640, 512);

  gradient.addColorStop(0, "rgb(0, 0, 50)");
  gradient.addColorStop(0.5, "rgb(50, 0, 50)");
  gradient.addColorStop(1, "rgb(50, 0, 0)");

  ctx.fillStyle = gradient;
  drawPath(ctx, [0, 0, 640, 0, 640, 512, 0, 512]);
};

const drawTileEdge = (
  ctx: CanvasRenderingContext2D,
  fillStyle: string,
  posX: number,
  posY: number,
  dx: number
) => {
  ctx.fillStyle = fillStyle;
  const dy = (gridSize * squareSize) / 2;
  drawPath(ctx, [
    posX - dx,
    posY,
    posX - dx,
    posY + boardThickness,
    midX,
    midY + boardThickness + dy,
    midX,
    midY + dy,
  ]);
};

const generateBoard = () => {
  for (let n = 1; n <= gridSize ** 2; n++) {
    x[n] = -(((n - 1) % gridSize) + 1) + gridSize + 1;
    y[n] = Math.floor((gridSize - 1 + n) / gridSize);
    z[n] = Math.floor((game / n) % 15);
    if (z[n] >= 12) {
      z[n] = 1;
    } else if (z[n] > 5 || z[n] === 0) {
      z[n] = 10;
    }
  }
};

const setrgb = (r: number, g: number, b: number) => `rgb(${r}, ${g}, ${b})`;

const drawStuff = (ctx: CanvasRenderingContext2D) => {
  for (let n = 1; n <= gridSize * gridSize; n++) {
    const px = x[n] * squareSize + y[n] * squareSize;
    const py = (y[n] * squareSize) / 2 - (x[n] * squareSize) / 2;

    ctx.fillStyle =
      (x[n] + y[n]) % 2 === 0 ? setrgb(100, 70, 50) : setrgb(100, 100, 100);
    drawPath(ctx, [
      px - squareSize,
      256 + py,
      px + squareSize,
      256 + py,
      px,
      256 + py - squareSize / 2,
    ]);
    drawPath(ctx, [
      px - squareSize,
      256 + py,
      px + squareSize,
      256 + py,
      px,
      256 + py + squareSize / 2,
    ]);
  }

  // Drawing the items
  for (let n = 1; n <= gridSize * gridSize; n++) {
    let i;

    if (
      (c & 16384) === 16384 &&
      n === targetCursorY * gridSize - targetCursorX + 1
    ) {
      // drawing_target_cursors_back();
      i = 1.3;
    } else if (n === cursorY * gridSize - cursorX + 1) {
      // drawing_cursors_back();
      i = 1.3;
    } else {
      i = 1;
    }

    const px = x[n] * squareSize + y[n] * squareSize;
    const py = (y[n] * squareSize) / 2 - (x[n] * squareSize) / 2;

    if (z[n] === 10) {
      ctx.fillStyle = setrgb(80 * i, 80 * i, 80 * i);
      drawPath(ctx, [
        px - squareSize,
        256 + py - squareSize * 0.5,
        px,
        256 + py,
        px + squareSize,
        256 + py - squareSize * 0.5,
        px,
        256 + py - squareSize,
      ]);
      ctx.fillStyle = setrgb(50 * i, 50 * i, 50 * i);
      drawPath(ctx, [
        px,
        256 + py + squareSize * 0.5,
        px - squareSize,
        256 + py,
        px - squareSize,
        256 + py - squareSize * 0.5,
        px,
        256 + py,
      ]);
      ctx.fillStyle = setrgb(60 * i, 60 * i, 60 * i);
      drawPath(ctx, [
        px,
        256 + py + squareSize * 0.5,
        px + squareSize,
        256 + py,
        px + squareSize,
        256 + py - squareSize * 0.5,
        px,
        256 + py,
      ]);
    } else if (z[n] !== 0) {
      let r = 0,
        g = 0,
        b = 0,
        ri = 0,
        gi = 0,
        bi = 0;

      if (z[n] === 1) {
        r = 5;
        g = 5;
        b = 5;
        ri = 2.2;
        gi = 2.2;
        bi = 2.2;
      } else if (z[n] === 2) {
        r = 20;
        g = 4;
        b = 4;
        ri = 1;
        gi = 2.2;
        bi = 2.2;
      } else if (z[n] === 3) {
        r = 5;
        g = 20;
        b = 4;
        ri = 2.2;
        gi = 1;
        bi = 2.2;
      } else if (z[n] === 4) {
        r = 4;
        g = 4;
        b = 20;
        ri = 2.2;
        gi = 2.2;
        bi = 1;
      } else if (z[n] === 5) {
        r = 20;
        g = 20;
        b = 4;
        ri = 1;
        gi = 1;
        bi = 2.2;
      }

      ctx.fillStyle = setrgb(r * 7 * i, g * 7 * i, b * 7 * i);
      drawPath(ctx, [
        px - squareSize * 0.4,
        256 + py - squareSize * 0.8,
        px,
        256 + py - squareSize * 0.6,
        px + squareSize * 0.4,
        256 + py - squareSize * 0.8,
        px,
        256 + py - squareSize * 1,
      ]);

      ctx.fillStyle = setrgb(r * 6 * i, g * 6 * i, b * 6 * i);
      drawPath(ctx, [
        px,
        256 + py,
        px + squareSize * 0.6,
        256 + py - squareSize * 0.6,
        px,
        256 + py - squareSize * 0.3,
      ]);

      ctx.fillStyle = setrgb(r * 4 * i, g * 4 * i, b * 4 * i);
      drawPath(ctx, [
        px - squareSize * 0.6,
        256 + py - squareSize * 0.6,
        px,
        256 + py,
        px,
        256 + py - squareSize * 0.3,
      ]);

      ctx.fillStyle = setrgb(r * ri * 8 * i, g * gi * 8 * i, b * bi * 8 * i);
      drawPath(ctx, [
        px,
        256 + py - squareSize * 0.3,
        px + squareSize * 0.6,
        256 + py - squareSize * 0.6,
        px + squareSize * 0.4,
        256 + py - squareSize * 0.8,
        px,
        256 + py - squareSize * 0.6,
      ]);

      ctx.fillStyle = setrgb(r * 6 * i, g * 6 * i, b * 6 * i);
      drawPath(ctx, [
        px,
        256 + py - squareSize * 0.3,
        px - squareSize * 0.6,
        256 + py - squareSize * 0.6,
        px - squareSize * 0.4,
        256 + py - squareSize * 0.8,
        px,
        256 + py - squareSize * 0.6,
      ]);
    }

    /*
    if (
      (c & 16384) === 16384 &&
      n === targetCursorY * gridSize - targetCursorX + 1
    ) {
      drawing_target_cursors_front();
    }

    if (n === cursor_y * gridSize - cursor_x + 1) {
      drawing_cursors_front();
    }
    */
  }
};

export function gemsGame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  let cursorX = 1;
  let cursorY = 1;

  canvas.addEventListener("mousemove", handleMouseMove);

  function handleMouseMove(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    cursorX = event.clientX - rect.left;
    cursorY = event.clientY - rect.top;

    console.log(cursorX, cursorY);
  }

  canvas.addEventListener("mouseleave", handleMouseLeave);

  function handleMouseLeave() {
    cursorX = 0;
    cursorY = 0;
  }

  drawBackground(ctx);
  generateBoard();
  drawStuff(ctx);

  // Draw the point at cursor position
  ctx.fillStyle = "red";
  ctx.fillRect(cursorX, cursorY, squareSize, squareSize);

  // Set RGB color for vertex 1 of the first triangle
  const dx = gridSize * squareSize;
  drawTileEdge(ctx, "rgb(50, 40, 0)", midX, midY, dx);
  drawTileEdge(ctx, "rgb(70, 50, 0)", midX, midY, -dx);
}
