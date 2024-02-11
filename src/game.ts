const width = 640;
const height = 512;
const midX = width / 2;
const midY = height / 2;
const gridSize = 10;
const squareSize = 20;
const boardThickness = 10;

// Game number
const game = 510256994;

const x: number[] = [];
const y: number[] = [];
const z: number[] = [];

const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 640, 512);

  gradient.addColorStop(0, "rgb(0, 0, 50)");
  gradient.addColorStop(0.5, "rgb(50, 0, 50)");
  gradient.addColorStop(1, "rgb(50, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(640, 0);
  ctx.lineTo(640, 512);
  ctx.lineTo(0, 512);
  ctx.closePath();
  ctx.fill();
};

const drawTileEdge = (
  ctx: CanvasRenderingContext2D,
  fillStyle: string,
  posX: number,
  posY: number,
  dx: number
) => {
  const dy = (gridSize * squareSize) / 2;
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(posX - dx, posY);
  ctx.lineTo(posX - dx, posY + boardThickness);
  ctx.lineTo(midX, midY + boardThickness + dy);
  ctx.lineTo(midX, midY + dy);
  ctx.closePath();
  ctx.fill();
};

const generateBoard = () => {
  for (let n = 1; n <= gridSize ** 2; n++) {
    x[n] = -(n - (1 % gridSize) + 1) + gridSize + 1;
    y[n] = Math.floor((gridSize - 1 + n) / gridSize);
    z[n] = Math.floor((game / n) % 15);
    if (z[n] >= 12) {
      z[n] = 1;
    } else if (z[n] > 5 || z[n] === 0) {
      z[n] = 10;
    }
  }
};

export function gemsGame(ctx: CanvasRenderingContext2D) {
  let cursorX = 1;
  let cursorY = 1;

  drawBackground(ctx);
  generateBoard();

  // Set RGB color for vertex 1 of the first triangle
  const dx = gridSize * squareSize;
  drawTileEdge(ctx, "rgb(50, 40, 0)", midX, midY, dx);
  drawTileEdge(ctx, "rgb(70, 50, 0)", midX, midY, -dx);
}
