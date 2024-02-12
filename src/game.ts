const width = 640;
const height = 512;
const midX = width / 2;
const midY = height / 2;
const gridSize = 9;
const squareSize = 320 / (gridSize + 1);
const boardThickness = 10;
let cursorX = 1;
let cursorY = 4;
const targetCursorX = 0;
const targetCursorY = 0;
let c = 0;

// Game number
const game = 510256994;

const x: number[] = [];
const y: number[] = [];
const z: number[] = [];

const drawPath = (
  ctx: CanvasRenderingContext2D,
  coords: [number, number][],
  fill: boolean = true
) => {
  ctx.beginPath();
  let [x, y] = coords.shift() || [0, 0];
  ctx.moveTo(x, y);
  while (coords.length) {
    [x, y] = coords.shift() || [0, 0];
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  fill ? ctx.fill() : ctx.stroke();
};

const drawBackground = (ctx: CanvasRenderingContext2D) => {
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
    [posX - dx, posY],
    [posX - dx, posY + boardThickness],
    [midX, midY + boardThickness + dy],
    [midX, midY + dy],
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

function drawCursorBack(ctx: CanvasRenderingContext2D) {
  // Drawing back of the cursor

  const px = cursorX * squareSize + cursorY * squareSize;
  const py = 256 + (cursorY * squareSize) / 2 - (cursorX * squareSize) / 2;

  ctx.fillStyle =
    (cursorX + cursorY) % 2 ? setrgb(0, 0, 160) : setrgb(160, 160, 160);

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

  ctx.fillStyle = setrgb(255, 255, 255);
  drawPath(
    ctx,
    [
      [px - squareSize, py],
      [px, py - 0.5 * squareSize],
    ],
    false
  );
  drawPath(ctx, [
    [px + squareSize, py],
    [px, py - 0.5 * squareSize],
  ]),
    false;
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
  drawPath(
    ctx,
    [
      [px, py - squareSize * 0.5],
      [px, py - squareSize * 1.9],
    ],
    false
  );
}

function drawCursorFront(ctx: CanvasRenderingContext2D) {
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
  /*
  drawPath(
    ctx,
    [px + squareSize, py, px + squareSize, py - squareSize * 1.4],
    false
  );
  */
  /*
   */
  drawPath(
    ctx,
    [[px - squareSize, py], [px - squareSize], [py - squareSize * 1.4]],
    false
  );
  drawPath(
    ctx,
    [
      [px - squareSize, py - squareSize * 1.4],
      [px, py - 1.9 * squareSize],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px + squareSize, py],
      [px + squareSize, py - squareSize * 1.4],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px - squareSize, py],
      [px - squareSize, py - squareSize * 1.4],
    ],
    false
  ),
    drawPath(
      ctx,
      [
        [px - squareSize, py - squareSize * 1.4],
        [px, py - 1.9 * squareSize],
      ],
      false
    );
  drawPath(
    ctx,
    [
      [px - squareSize, py - squareSize * 1.4],
      [px, py - 0.9 * squareSize],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px - squareSize, py],
      [px, py + squareSize * 0.5],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px + squareSize, py - squareSize * 1.4],
      [px, py - 1.9 * squareSize],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px + squareSize, py - squareSize * 1.4],
      [px, py - 0.9 * squareSize],
    ],
    false
  );
  drawPath(
    ctx,
    [
      [px + squareSize, py],
      [px, py + squareSize * 0.5],
    ],
    false
  );
}

const drawStuff = (ctx: CanvasRenderingContext2D) => {
  for (let n = 1; n <= gridSize * gridSize; n++) {
    const px = x[n] * squareSize + y[n] * squareSize;
    const py = (y[n] * squareSize) / 2 - (x[n] * squareSize) / 2;

    ctx.fillStyle =
      (x[n] + y[n]) % 2 === 0 ? setrgb(100, 70, 50) : setrgb(100, 100, 100);
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

  // Drawing the items
  for (let n = 1; n <= gridSize * gridSize; n++) {
    let i;

    c = 16384;

    if (
      (c & 16384) === 16384 &&
      n === targetCursorY * gridSize - targetCursorX + 1
    ) {
      drawCursorBack(ctx);
      i = 1.3;
    } else if (n === cursorY * gridSize - cursorX + 1) {
      // drawing_cursors_back();
      i = 1.3;
    } else {
      i = 1;
    }

    const px = (x[n] + y[n]) * squareSize;
    const py = ((y[n] - x[n]) * squareSize) / 2;

    if (z[n] === 10) {
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
        [px - squareSize * 0.4, 256 + py - squareSize * 0.8],
        [px, 256 + py - squareSize * 0.6],
        [px + squareSize * 0.4, 256 + py - squareSize * 0.8],
        [px, 256 + py - squareSize * 1],
      ]);

      ctx.fillStyle = setrgb(r * 6 * i, g * 6 * i, b * 6 * i);
      drawPath(ctx, [
        [px, 256 + py],
        [px + squareSize * 0.6, 256 + py - squareSize * 0.6],
        [px, 256 + py - squareSize * 0.3],
      ]);

      ctx.fillStyle = setrgb(r * 4 * i, g * 4 * i, b * 4 * i);
      drawPath(ctx, [
        [px - squareSize * 0.6, 256 + py - squareSize * 0.6],
        [px, 256 + py],
        [px, 256 + py - squareSize * 0.3],
      ]);

      ctx.fillStyle = setrgb(r * ri * 8 * i, g * gi * 8 * i, b * bi * 8 * i);
      drawPath(ctx, [
        [px, 256 + py - squareSize * 0.3],
        [px + squareSize * 0.6, 256 + py - squareSize * 0.6],
        [px + squareSize * 0.4, 256 + py - squareSize * 0.8],
        [px, 256 + py - squareSize * 0.6],
      ]);

      ctx.fillStyle = setrgb(r * 6 * i, g * 6 * i, b * 6 * i);
      drawPath(ctx, [
        [px, 256 + py - squareSize * 0.3],
        [px - squareSize * 0.6, 256 + py - squareSize * 0.6],
        [px - squareSize * 0.4, 256 + py - squareSize * 0.8],
        [px, 256 + py - squareSize * 0.6],
      ]);
    }

    if (
      (c & 16384) === 16384 &&
      n === targetCursorY * gridSize - targetCursorX + 1
    ) {
      // drawing_target_cursors_front();
    }

    if (n === cursorY * gridSize - cursorX + 1) {
      drawCursorFront(ctx);
    }
  }
};

export function gemsGame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  canvas.addEventListener("mousemove", handleMouseMove);

  function handleMouseMove(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top - 256 + 10;

    cursorX = -Math.floor((2 * mouseY - mouseX) / (2 * squareSize));
    cursorY = Math.floor((2 * mouseY + mouseX) / (2 * squareSize));
  }

  canvas.addEventListener("mouseleave", handleMouseLeave);

  function handleMouseLeave() {
    mouseX = 0;
    mouseY = 0;
  }

  let mouseX = 1;
  let mouseY = 1;

  function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game elements
    drawBackground(ctx);
    generateBoard();
    drawStuff(ctx);

    // Set RGB color for vertex 1 of the first triangle
    const dx = gridSize * squareSize;
    drawTileEdge(ctx, "rgb(50, 40, 0)", midX, midY, dx);
    drawTileEdge(ctx, "rgb(70, 50, 0)", midX, midY, -dx);

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
}
